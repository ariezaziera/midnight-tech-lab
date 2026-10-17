import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const canvas = (page: Page) => page.locator("canvas");
async function ready(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true", { timeout: 20000 });
}
async function metrics(page: Page) { return JSON.parse((await canvas(page).getAttribute("data-render-metrics"))!); }
async function quality(page: Page, label: string, dpr: number) {
  await page.getByRole("radio", { name: label, exact: true }).check();
  await expect.poll(async () => (await metrics(page)).dpr).toBe(dpr);
}

test("conservative default and native keyboard quality controls preserve canvas, camera and idle", async ({ page }) => {
  await ready(page);
  await expect(page.getByRole("group", { name: "Graphics quality" })).toBeVisible();
  await expect(page.getByRole("radio", { name: "Low", exact: true })).toBeChecked();
  expect((await metrics(page)).dpr).toBe(1);
  await canvas(page).evaluate(el => el.setAttribute("data-original-canvas", "true"));
  const low = page.getByRole("radio", { name: "Low", exact: true });
  await low.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Medium", exact: true })).toBeChecked();
  await expect(page.getByRole("radio", { name: "Medium", exact: true })).toBeFocused();
  await expect.poll(async () => (await metrics(page)).dpr).toBe(1.5);
  const pixels: number[] = [];
  for (const [label, dpr] of [["Low", 1], ["Medium", 1.5], ["High", 2]] as const) {
    await quality(page, label, dpr);
    await expect(canvas(page)).toHaveAttribute("data-original-canvas", "true");
    await expect(canvas(page)).toHaveAttribute("data-camera-preset", "overview");
    const m = await metrics(page); pixels.push(m.width * m.height);
    expect(m.calls).toBe(30); expect(m.geometries).toBe(30);
    await page.waitForTimeout(400);
    const frame = await canvas(page).getAttribute("data-render-count");
    await page.waitForTimeout(500);
    expect(await canvas(page).getAttribute("data-render-count")).toBe(frame);
  }
  expect(pixels[0]).toBeLessThan(pixels[1]); expect(pixels[1]).toBeLessThan(pixels[2]);
});

test("quality changes during travel preserve bounded camera and Escape Back Reset", async ({ page }) => {
  await ready(page);
  // Change inside the browser on the first moving frame, avoiding remote-driver timing races.
  await page.evaluate(() => {
    const c = document.querySelector("canvas")!;
    const observer = new MutationObserver(() => {
      if (c.dataset.cameraMoving === "true") {
        (document.querySelector('input[value="high"]') as HTMLInputElement).click(); observer.disconnect();
      }
    });
    observer.observe(c, { attributes: true, attributeFilter: ["data-camera-moving"] });
  });
  await page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: "Creator ID" }).click();
  await expect(canvas(page)).toHaveAttribute("data-camera-preset", "creator");
  await expect(canvas(page)).toHaveAttribute("data-camera-moving", "false");
  await expect.poll(async () => (await metrics(page)).dpr).toBe(2);
  const diagnostic = JSON.parse((await canvas(page).getAttribute("data-camera-diagnostics"))!);
  expect(diagnostic.clearance).toBeGreaterThan(.3);
  expect(diagnostic.nearestHotspot).toBe("creator");
  await page.getByRole("radio", { name: "High", exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(canvas(page)).toHaveAttribute("data-camera-preset", "overview");
  await page.getByRole("button", { name: "Workstation", exact: true }).click();
  await page.getByRole("button", { name: "Back to overview" }).click();
  await page.getByRole("button", { name: "Reset view" }).click();
  await expect(canvas(page)).toHaveAttribute("data-camera-preset", "overview");
  await expect(canvas(page)).toHaveAttribute("data-camera-moving", "false");
  await expect(page.getByRole("radio", { name: "High", exact: true })).toBeChecked();
});

test("repeated selections release resources and quality survives context recovery and resize", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page);
  const initial = await metrics(page);
  for (let repeat = 0; repeat < 4; repeat++) {
    for (const label of ["Creator ID", "Project Display", "Workstation"]) {
      await page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: label }).click();
      await expect(canvas(page)).toHaveAttribute("data-camera-moving", "false");
    }
    await quality(page, repeat % 2 ? "High" : "Medium", repeat % 2 ? 2 : 1.5);
    await page.getByRole("button", { name: "Back to overview" }).click();
    await expect(canvas(page)).toHaveAttribute("data-camera-preset", "overview");
    await expect.poll(async () => (await metrics(page)).geometries).toBe(initial.geometries);
    const m = await metrics(page);
    expect(m.materials).toBe(initial.materials); expect(m.textures).toBe(initial.textures);
  }
  await canvas(page).evaluate(c => (c as HTMLCanvasElement).getContext("webgl2")!.getExtension("WEBGL_lose_context")!.loseContext());
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await page.getByRole("button", { name: "Retry 3D preview" }).click();
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true");
  await expect.poll(async () => (await metrics(page)).dpr).toBe(2);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("scene-2d")).toBeVisible();
  await expect(page.getByRole("radio")).toHaveCount(0);
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true");
  await expect.poll(async () => (await metrics(page)).dpr).toBe(2);
});

test("device DPR bounds avoid artificial upscaling at standard density", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1024, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await ready(page);
  for (const label of ["Low", "Medium", "High"]) await quality(page, label, 1);
  await context.close();
});
