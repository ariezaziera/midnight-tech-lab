import { expect, test, type Page } from "@playwright/test";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const evidence = "docs/04-delivery/evidence/m5b/after";
test.use({ viewport: { width: 1440, height: 900 } });

// Locate the built lazy chunk by an authored scene-node identifier, not a hash.
function sceneChunkPattern() {
  const root = join(process.cwd(), ".next/static/chunks");
  const file = readdirSync(root, { recursive: true }).map(String).find(name => name.endsWith(".js") && readFileSync(join(root, name), "utf8").includes("CH_001_Platform"));
  if (!file) throw new Error("Built scene chunk not found");
  return `**/_next/static/chunks/${file.replaceAll("\\", "/")}`;
}

async function ready(page: Page) {
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true", { timeout: 20000 });
  await expect(page.locator("canvas")).toBeVisible();
}

async function navStillWorks(page: Page) {
  await page.getByRole("navigation").getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Work, with context.");
}

test("desktop overview remains idle until selection and records initial measurements", async ({ page, browser }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await ready(page);
  const viewport = page.getByTestId("scene-viewport");
  const metrics = JSON.parse((await viewport.getAttribute("data-scene-metrics"))!);
  expect(metrics.calls).toBeGreaterThan(0);
  expect(metrics.calls).toBeLessThan(120);
  expect(metrics.triangles).toBeLessThan(12000);
  const canvas = page.locator("canvas");
  // Let startup invalidations settle, then verify no continuous rendering.
  await page.waitForTimeout(500);
  const frames = await canvas.getAttribute("data-render-count");
  await page.waitForTimeout(500);
  expect(await canvas.getAttribute("data-render-count")).toBe(frames);
  await page.mouse.wheel(0, 100);
  expect(await canvas.getAttribute("data-render-count")).toBe(frames);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${evidence}/desktop-rendered.png` });
  const resources = await page.evaluate(() => performance.getEntriesByType("resource").map(item => {
    const r = item as PerformanceResourceTiming;
    return { name: new URL(r.name).pathname, durationMs: Math.round(r.duration), transferBytes: r.transferSize, encodedBodyBytes: r.encodedBodySize };
  }));
  const measurement = JSON.stringify({ browser: browser.version(), viewport: "1440x900", host: "Windows, local production server; no network throttling", metrics, idleFrames: frames, resources }, null, 2);
  writeFileSync(`${evidence}/initial-scene-measurements.json`, measurement);
  await testInfo.attach("initial-scene-measurements", { body: measurement, contentType: "application/json" });
  console.log("M3_SCENE_MEASUREMENTS", JSON.stringify({ metrics, idleFrames: frames, javascriptTransferBytes: resources.filter(r => r.name.endsWith(".js")).reduce((sum, r) => sum + r.transferBytes, 0) }));
  expect(errors).toEqual([]);
  await navStillWorks(page);
});

test("mobile uses HTML only and never downloads the scene chunk", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let chunkRequests = 0;
  await page.route(sceneChunkPattern(), route => { chunkRequests++; return route.continue(); });
  await page.goto("/");
  await expect(page.getByTestId("scene-2d")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(chunkRequests).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `${evidence}/mobile-2d.png`, fullPage: true });
  await navStillWorks(page);
});

test("unsupported WebGL has an understandable fallback and can retry", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).includes("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.getByTestId("scene-fallback")).toContainText("WebGL 2 is unavailable");
  await page.screenshot({ path: `${evidence}/desktop-unsupported-webgl.png` });
  await page.getByRole("button", { name: "Retry 3D preview" }).click();
  await expect(page.getByTestId("scene-fallback")).toContainText("WebGL 2 is unavailable");
  await navStillWorks(page);
});

test("renderer initialization exception is contained", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).includes("webgl") && this.isConnected) throw new Error("Simulated renderer initialization failure");
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.getByTestId("scene-fallback")).toContainText("renderer could not initialize", { timeout: 20000 });
  await page.screenshot({ path: `${evidence}/desktop-initialization-failure.png` });
  await navStillWorks(page);
});

test("failed scene download recovers on retry", async ({ page }) => {
  const pattern = sceneChunkPattern();
  await page.route(pattern, route => route.abort("failed"));
  await page.goto("/");
  await expect(page.getByTestId("scene-fallback")).toContainText("could not start or download", { timeout: 20000 });
  await page.screenshot({ path: `${evidence}/desktop-download-failure.png` });
  await page.unroute(pattern);
  await page.getByRole("button", { name: "Retry 3D preview" }).click();
  await ready(page);
  await navStillWorks(page);
});

test("slow scene download times out while HTML remains usable", async ({ page }) => {
  test.setTimeout(45000);
  let release: () => void = () => {};
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route(sceneChunkPattern(), async route => { await pending; await route.continue().catch(() => {}); });
  await page.goto("/");
  await expect(page.getByTestId("scene-viewport").getByRole("status")).toContainText("Loading the Central Hub blockout");
  await page.screenshot({ path: `${evidence}/desktop-loading.png` });
  await expect(page.getByTestId("scene-fallback")).toContainText("took too long", { timeout: 20000 });
  release();
  await page.getByRole("button", { name: "Retry 3D preview" }).click();
  await ready(page);
  await navStillWorks(page);
});

test("actual WebGL context loss falls back and creates a fresh scene on retry", async ({ page }) => {
  await page.goto("/");
  await ready(page);
  const canLose = await page.locator("canvas").evaluate(canvas => {
    const context = (canvas as HTMLCanvasElement).getContext("webgl2");
    const extension = context?.getExtension("WEBGL_lose_context");
    extension?.loseContext();
    return Boolean(extension);
  });
  expect(canLose).toBe(true);
  await expect(page.getByTestId("scene-fallback")).toContainText("graphics context was lost");
  await page.screenshot({ path: `${evidence}/desktop-context-lost.png` });
  await page.getByRole("button", { name: "Retry 3D preview" }).click();
  await ready(page);
  await navStillWorks(page);
});

test("reduced motion remains static, and resize can switch to 2D and back", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await ready(page);
  const canvas = page.locator("canvas");
  await page.waitForTimeout(500);
  const frames = await canvas.getAttribute("data-render-count");
  await page.waitForTimeout(500);
  expect(await canvas.getAttribute("data-render-count")).toBe(frames);
  await page.screenshot({ path: `${evidence}/desktop-reduced-motion.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("scene-2d")).toBeVisible();
  await expect(canvas).toHaveCount(0);
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
});
