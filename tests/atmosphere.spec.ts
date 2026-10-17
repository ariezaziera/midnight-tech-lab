import { expect, test } from "@playwright/test";

const evidence = "docs/04-delivery/evidence/m6a1/after";

test("static atmosphere preserves input, fixed light budget and idle rendering cost", async ({ page }) => {
  const errors: string[] = [];
  const externalAssets: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("request", request => { if (/^(image|media|font)$/.test(request.resourceType()) && !request.url().startsWith("http://127.0.0.1:3000")) externalAssets.push(request.url()); });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const viewport = page.getByTestId("scene-viewport");
  await expect(viewport).toHaveAttribute("data-scene-ready", "true", { timeout: 20000 });
  const metrics = JSON.parse((await viewport.getAttribute("data-scene-metrics"))!);
  expect(metrics.lightCount).toBe(4);
  expect(metrics.pointLightCount).toBe(1);
  expect(metrics.shadows).toBe(false);
  expect(metrics.alpha).toBe(true);
  expect(metrics.calls).toBe(30);
  expect(metrics.triangles).toBe(1680);
  expect(metrics.geometries).toBe(30);
  expect(metrics.textures).toBe(1);
  const styles = await viewport.evaluate(el => ({
    background: getComputedStyle(el).backgroundImage,
    layers: ["::before", "::after"].map(pseudo => { const style = getComputedStyle(el, pseudo); return { pointerEvents: style.pointerEvents, animation: style.animationName, filter: style.filter }; }),
  }));
  expect(styles.background).toContain("radial-gradient");
  expect(styles.background).toContain("linear-gradient");
  for (const layer of styles.layers) expect(layer).toEqual({ pointerEvents: "none", animation: "none", filter: "none" });
  const canvas = page.locator("canvas");
  // A real pointer still reaches the workstation through the decorative CSS layers.
  const diagnostics = JSON.parse((await canvas.getAttribute("data-camera-diagnostics"))!);
  const bounds = (await canvas.boundingBox())!;
  await page.mouse.click(bounds.x + diagnostics.picks.workstation.x * bounds.width, bounds.y + diagnostics.picks.workstation.y * bounds.height);
  await expect(page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: "Workstation" })).toHaveAttribute("aria-pressed", "true");
  await expect(canvas).toHaveAttribute("data-camera-preset", "workstation");
  await expect(canvas).toHaveAttribute("data-camera-moving", "false", { timeout: 10000 });
  await page.waitForTimeout(500);
  const frames = await canvas.getAttribute("data-render-count");
  await page.waitForTimeout(750);
  expect(await canvas.getAttribute("data-render-count")).toBe(frames);
  expect(externalAssets).toEqual([]);
  expect(errors).toEqual([]);
});

test("atmosphere remains static with reduced motion and mobile keeps its 2D presentation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true", { timeout: 20000 });
  expect(await page.getByTestId("scene-viewport").evaluate(el => getComputedStyle(el, "::before").animationName)).toBe("none");
  await page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: "Creator ID" }).click();
  await expect(page.locator("canvas")).toHaveAttribute("data-camera-preset", "creator");
  await expect(page.locator("canvas")).toHaveAttribute("data-camera-moving", "false");
  await page.locator("#studio-preview-heading").evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 30));
  await page.screenshot({ path: `${evidence}/reduced-motion-atmosphere.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("scene-2d")).toBeVisible();
  await expect(page.locator("canvas, .cosmic-stage")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
