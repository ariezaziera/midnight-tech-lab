import { expect, test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { cameraBounds, cameraPresets, hotspotIds, hotspots, transitionPose, type CameraPresetId } from "../src/lib/scene/interaction-config";

test.use({ viewport: { width: 1440, height: 900 } });
const evidence = "docs/04-delivery/evidence/m4";
type MotionSample = { position: number[]; target: number[] };
type Diagnostics = {
  position: number[]; target: number[]; fov: number; near: number; far: number; clearance: number;
  picks: Record<string, { x: number; y: number; depth: number }>;
  corners: number[][]; targetInView: number[]; nearestHotspot: string | null;
};

async function settled(page: Page, preset: CameraPresetId) {
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true", { timeout: 20000 });
  const canvas = page.locator("canvas");
  await expect(canvas).toHaveAttribute("data-camera-preset", preset);
  await expect(canvas).toHaveAttribute("data-camera-moving", "false");
  const value = JSON.parse((await canvas.getAttribute("data-camera-diagnostics"))!) as Diagnostics;
  value.position.forEach((coordinate, axis) => expect(coordinate).toBeCloseTo(cameraPresets[preset].position[axis], 5));
  expect(value.fov).toBe(cameraPresets[preset].fov);
  expect(value.near).toBe(0.1);
  expect(value.far).toBe(60);
  expect(value.clearance).toBeGreaterThan(0.3);
  expect(Math.abs(value.targetInView[0])).toBeLessThan(0.01);
  expect(Math.abs(value.targetInView[1])).toBeLessThan(0.01);
  for (const corner of value.corners) {
    expect(Math.abs(corner[0])).toBeLessThan(1);
    expect(Math.abs(corner[1])).toBeLessThan(1);
    expect(corner[2]).toBeGreaterThan(-1);
    expect(corner[2]).toBeLessThan(1);
  }
  if (preset !== "overview") expect(value.nearestHotspot).toBe(preset);
  return value;
}

const focusButton = (page: Page, id: typeof hotspotIds[number]) => page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: hotspots[id].title });

async function captureStudio(page: Page, filename: string) {
  await page.locator("#studio-preview-heading").evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 30));
  await page.screenshot({ path: `${evidence}/${filename}.png` });
}

test("all configured and interrupted exterior paths remain inside camera bounds", () => {
  const violations: unknown[] = [];
  for (const from of Object.values(cameraPresets)) for (const to of Object.values(cameraPresets)) {
    for (let step = 0; step <= 40; step++) {
      const pose = transitionPose(from, to, step / 40);
      if (pose.position.some((v, axis) => v < cameraBounds.min[axis] || v > cameraBounds.max[axis])) violations.push(pose);
      // The entire route is above the tallest blockout object, with near-plane clearance.
      if (pose.position[1] - pose.near <= 2.7) violations.push(pose);
      const interrupted = transitionPose(pose, cameraPresets.overview, 0.25);
      if (interrupted.position[1] - interrupted.near <= 2.7) violations.push(interrupted);
    }
  }
  expect(violations).toEqual([]);
});

for (const id of hotspotIds) {
  test(`pointer selects ${id}, route action and overview recovery`, async ({ page }) => {
    await page.goto("/");
    const overview = await settled(page, "overview");
    const canvas = page.locator("canvas");
    const box = (await canvas.boundingBox())!;
    const pick = overview.picks[id];
    await page.mouse.click(box.x + pick.x * box.width, box.y + pick.y * box.height);
    await expect(focusButton(page, id)).toBeFocused();
    await expect(focusButton(page, id)).toHaveAttribute("aria-pressed", "true");
    await settled(page, id);
    await captureStudio(page, `desktop-selected-${id}`);
    if (id !== "workstation") {
      await page.getByTestId("studio-actions").getByRole("link", { name: hotspots[id].action }).click();
      await expect(page).toHaveURL(id === "creator" ? "/about" : "/projects");
      await page.getByRole("link", { name: "Return to studio" }).click();
      await settled(page, id);
      await expect(page.locator("#studio-preview-heading")).toBeFocused();
    }
    await page.getByRole("button", { name: "Back to overview" }).click();
    await settled(page, "overview");
    await expect(focusButton(page, id)).toBeFocused();
  });
}

test("keyboard Enter/Space, Escape and Reset maintain focus and stable state", async ({ page }) => {
  await page.goto("/");
  await settled(page, "overview");
  const creator = focusButton(page, "creator");
  await creator.focus();
  await page.keyboard.press("Enter");
  await settled(page, "creator");
  expect(await creator.evaluate(el => getComputedStyle(el).outlineStyle)).toBe("solid");
  await page.keyboard.press("Escape");
  await settled(page, "overview");
  await expect(creator).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(focusButton(page, "projects")).toBeFocused();
  await page.keyboard.press("Space");
  await settled(page, "projects");
  await page.getByRole("button", { name: "Reset view" }).click();
  await settled(page, "overview");
  await page.reload();
  await settled(page, "overview");
});

test("rapid repeated requests and Escape during travel always settle to the latest choice", async ({ page }) => {
  await page.goto("/");
  await settled(page, "overview");
  await page.getByRole("group", { name: "Studio focus controls" }).evaluate(group => {
    const buttons = group.querySelectorAll("button");
    for (const index of [0, 1, 2, 2]) buttons[index].click();
  });
  await settled(page, "workstation");
  // Observe and interrupt inside the browser: a delayed automation round-trip
  // can miss the entire transition on this machine. Real Escape input is tested above.
  await focusButton(page, "creator").evaluate(button => new Promise<void>((resolve, reject) => {
    const canvas = document.querySelector("canvas");
    if (!canvas) { reject(new Error("Missing scene")); return; }
    const timeout = setTimeout(() => { observer.disconnect(); reject(new Error("No moving frame observed")); }, 15000);
    const observer = new MutationObserver(() => {
      if (canvas.dataset.cameraMoving !== "true") return;
      observer.disconnect();
      clearTimeout(timeout);
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      resolve();
    });
    observer.observe(canvas, { attributes: true, attributeFilter: ["data-camera-moving"] });
    (button as HTMLButtonElement).click();
  }));
  await settled(page, "overview");
  await expect(focusButton(page, "creator")).toBeFocused();
});

test("reduced motion snaps and preference changes interrupt travel", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await settled(page, "overview");
  for (const id of hotspotIds) {
    const frames = Number(await page.locator("canvas").getAttribute("data-render-count"));
    await focusButton(page, id).click();
    await settled(page, id);
    expect(Number(await page.locator("canvas").getAttribute("data-render-count")) - frames).toBeLessThanOrEqual(4);
  }
  await captureStudio(page, "desktop-reduced-motion-selected");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await focusButton(page, "creator").evaluate(button => (button as HTMLButtonElement).click());
  await expect(page.locator("canvas")).toHaveAttribute("data-camera-moving", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await settled(page, "creator");
});

test("browser Back restores only the last stable preset, including navigation during travel", async ({ page }) => {
  await page.goto("/");
  await settled(page, "overview");
  await focusButton(page, "creator").click();
  await settled(page, "creator");
  // Use immediate DOM actions for this timing test: normal pointer actionability
  // waits can consume the entire one-second transition before navigation begins.
  const departedPreset = await page.evaluate(() => new Promise<string | null>((resolve, reject) => {
    const button = Array.from(document.querySelectorAll<HTMLButtonElement>('[aria-label="Studio focus controls"] button')).find(item => item.textContent?.startsWith("Project Display"));
    const link = document.querySelector<HTMLAnchorElement>('nav[aria-label="Main navigation"] a[href="/about"]');
    if (!button || !link) { reject(new Error("Missing journey controls")); return; }
    const timeout = setTimeout(() => reject(new Error("No moving frame observed")), 5000);
    button.click();
    const navigateDuringFrame = () => {
      const canvas = document.querySelector("canvas");
      if (canvas?.dataset.cameraPreset === "projects" && canvas.dataset.cameraMoving === "true") {
        clearTimeout(timeout);
        const stable = sessionStorage.getItem("midnight-tech-lab:stable-preset:v1");
        link.click();
        resolve(stable);
      } else requestAnimationFrame(navigateDuringFrame);
    };
    requestAnimationFrame(navigateDuringFrame);
  }));
  expect(departedPreset).toBe("creator");
  await expect(page).toHaveURL("/about");
  await page.goBack();
  await settled(page, "creator");
});

test("console and globe remain inert; only the three approved focus controls exist", async ({ page }) => {
  const { PerspectiveCamera, Vector3 } = await import("three");
  await page.goto("/");
  const view = await settled(page, "overview");
  await expect(page.getByRole("group", { name: "Studio focus controls" }).getByRole("button")).toHaveCount(3);
  const box = (await page.locator("canvas").boundingBox())!;
  const camera = new PerspectiveCamera(view.fov, box.width / box.height, view.near, view.far);
  camera.position.set(view.position[0], view.position[1], view.position[2]);
  camera.lookAt(view.target[0], view.target[1], view.target[2]);
  camera.updateMatrixWorld();
  for (const point of [[2.55, 1.3, 0.4], [2.4, 1.26, -1.65]]) {
    const p = new Vector3(point[0], point[1], point[2]).project(camera);
    await page.mouse.click(box.x + (p.x + 1) * box.width / 2, box.y + (1 - p.y) * box.height / 2);
    await settled(page, "overview");
  }
});

test("HTML target actions stay usable without WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      return String(args[0]).includes("webgl") ? null : original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.getByTestId("scene-fallback")).toBeVisible({ timeout: 15000 });
  await focusButton(page, "creator").click();
  await page.getByTestId("studio-actions").getByRole("link", { name: "About Arieza" }).click();
  await expect(page).toHaveURL("/about");
});

test("renderer recovery preserves the selected stable preset", async ({ page }) => {
  await page.goto("/");
  await settled(page, "overview");
  await focusButton(page, "projects").click();
  await settled(page, "projects");
  await page.locator("canvas").evaluate(canvas => (canvas as HTMLCanvasElement).getContext("webgl2")?.getExtension("WEBGL_lose_context")?.loseContext());
  await expect(page.getByTestId("scene-fallback")).toContainText("graphics context was lost");
  await captureStudio(page, "desktop-selected-context-loss");
  await page.getByRole("button", { name: "Retry 3D preview" }).click();
  await settled(page, "projects");
  await expect(focusButton(page, "projects")).toHaveAttribute("aria-pressed", "true");
});

test("invalid or denied session storage safely defaults to overview", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("midnight-tech-lab:stable-preset:v1", "unapproved-preset"));
  await page.goto("/");
  await settled(page, "overview");
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error("storage denied"); };
    Storage.prototype.setItem = () => { throw new Error("storage denied"); };
  });
  await page.reload();
  await settled(page, "overview");
  await focusButton(page, "workstation").click();
  await settled(page, "workstation");
});

for (const width of [1024, 1440]) {
  test(`preset visibility, clipping and idle behavior at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const measurements: Record<string, Diagnostics> = { overview: await settled(page, "overview") };
    const motion: Record<string, { elapsedMs: number; sawMoving: boolean; samples: MotionSample[] }> = {};
    const framesBefore = Number(await page.locator("canvas").getAttribute("data-render-count"));
    for (const id of hotspotIds) {
      motion[id] = await page.evaluate(({ id, title }) => new Promise<{ elapsedMs: number; sawMoving: boolean; samples: MotionSample[] }>((resolve, reject) => {
        const button = Array.from(document.querySelectorAll<HTMLButtonElement>('[aria-label="Studio focus controls"] button')).find(item => item.textContent?.startsWith(title));
        if (!button) { reject(new Error("Missing focus control")); return; }
        const start = performance.now();
        const samples: MotionSample[] = [];
        let sawMoving = false;
        const timeout = setTimeout(() => reject(new Error("Transition did not settle")), 5000);
        button.click();
        const sample = () => {
          const canvas = document.querySelector("canvas");
          if (canvas?.dataset.cameraPreset === id) {
            const raw = canvas.dataset.cameraPose;
            if (raw) samples.push(JSON.parse(raw));
            if (canvas.dataset.cameraMoving === "true") sawMoving = true;
            else { clearTimeout(timeout); resolve({ elapsedMs: Math.round(performance.now() - start), sawMoving, samples }); return; }
          }
          requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
      }), { id, title: hotspots[id].title });
      expect(motion[id].sawMoving).toBe(true);
      expect(motion[id].samples.every(sample => sample.position.every((value, axis) => value >= cameraBounds.min[axis] && value <= cameraBounds.max[axis]) && sample.position[1] - 0.1 > 2.7)).toBe(true);
      measurements[id] = await settled(page, id);
    }
    const framesAfter = Number(await page.locator("canvas").getAttribute("data-render-count"));
    await page.waitForTimeout(500);
    const idle = await page.locator("canvas").getAttribute("data-render-count");
    await page.waitForTimeout(500);
    expect(await page.locator("canvas").getAttribute("data-render-count")).toBe(idle);
    mkdirSync(evidence, { recursive: true });
    writeFileSync(`${evidence}/camera-measurements-${width}.json`, JSON.stringify({ viewport: `${width}x900`, transitionFrames: framesAfter - framesBefore, idleFrameCount: Number(idle), presets: measurements, motion }, null, 2));
  });
}

test("HTML route actions work without JavaScript and on touch mobile", async ({ browser }) => {
  for (const javaScriptEnabled of [false, true]) {
    const context = await browser.newContext({ javaScriptEnabled, hasTouch: true, viewport: { width: 390, height: 844 }, baseURL: "http://127.0.0.1:3000" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.getByRole("group", { name: "Studio focus controls" })).toHaveCount(0);
    await page.getByTestId("studio-actions").getByRole("link", { name: "About Arieza" }).tap();
    await expect(page).toHaveURL("/about");
    await page.getByRole("link", { name: "Return to studio" }).tap();
    await page.getByTestId("studio-actions").getByRole("link", { name: "Browse projects" }).tap();
    await expect(page).toHaveURL("/projects");
    await context.close();
  }
});
