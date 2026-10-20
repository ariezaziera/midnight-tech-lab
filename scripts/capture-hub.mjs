import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Same protocol for each accepted milestone baseline and its authorized refinement.
const phase = process.argv[2];
if (!["before", "after"].includes(phase)) throw new Error("Use before or after");
const milestone = process.argv[3] ?? "m5a";
if (!["m5a", "m5b", "m5c", "m6a1", "m6a2"].includes(milestone)) throw new Error("Use m5a, m5b, m5c, m6a1 or m6a2");
const evidenceRoot = join("docs/04-delivery/evidence", milestone);
const output = join(evidenceRoot, phase);
mkdirSync(output, { recursive: true });
const browser = await chromium.launch();
const observations = [];
try {
  for (let run = 0; run < (["m6a1", "m6a2"].includes(milestone) ? 5 : 3); run++) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: ["m5c", "m6a1", "m6a2"].includes(milestone) ? 2 : 1 });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("http://127.0.0.1:3000/");
    await page.getByTestId("scene-viewport").filter({ has: page.locator("canvas") }).waitFor();
    await page.waitForFunction(() => document.querySelector('[data-scene-ready="true"]'));
    await page.waitForTimeout(500);
    const start = await page.locator("canvas").getAttribute("data-render-count");
    await page.waitForTimeout(750);
    const end = await page.locator("canvas").getAttribute("data-render-count");
    const metrics = JSON.parse(await page.getByTestId("scene-viewport").getAttribute("data-scene-metrics"));
    const resources = await page.evaluate(() => performance.getEntriesByType("resource").map(item => ({ path: new URL(item.name).pathname, transferBytes: item.transferSize, durationMs: Math.round(item.duration) })));
    const camera = {};
    for (const [preset, name] of [["overview", null], ["creator", "Creator ID"], ["projects", "Project Display"], ["workstation", "Workstation"]]) {
      if (name) await page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name }).click();
      await page.waitForFunction(preset => { const c = document.querySelector("canvas"); return c?.dataset.cameraPreset === preset && c.dataset.cameraMoving === "false"; }, preset);
      camera[preset] = JSON.parse(await page.locator("canvas").getAttribute("data-camera-diagnostics"));
      if (run === 0) {
        await page.locator("#studio-preview-heading").evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 30));
        await page.screenshot({ path: join(output, `preset-${preset}.png`) });
      }
    }
    const raster = await page.locator("canvas").evaluate(c => ({ width: c.width, height: c.height, cssWidth: c.clientWidth, cssHeight: c.clientHeight, deviceDpr: devicePixelRatio, actualDpr: c.width / c.clientWidth }));
    observations.push({ raster, metrics, idle: { start, end, unchanged: start === end }, javascriptTransferBytes: resources.filter(r => r.path.endsWith(".js")).reduce((sum, r) => sum + r.transferBytes, 0), resources, camera, errors });
    await context.close();
  }
  writeFileSync(join(output, "measurements.json"), JSON.stringify({ phase, browser: browser.version(), viewport: "1440x900", environment: "Windows; local production build; Chromium headless; fresh browser context per run; no network throttling; two idle samples 750ms apart; same capture protocol and viewport; device scale factor 2 for m5c/m6a1/m6a2 (1 otherwise), actual raster DPR recorded separately; scene/rendering changes documented per phase", observations }, null, 2));
  console.log(JSON.stringify({ phase, observations: observations.map(({ metrics, idle, javascriptTransferBytes, errors }) => ({ metrics, idle, javascriptTransferBytes, errors })) }, null, 2));
  if (phase === "after" && !["m5c", "m6a1", "m6a2"].includes(milestone)) {
    const review = await browser.newPage({ viewport: { width: 1800, height: 1000 } });
    await review.goto(pathToFileURL(resolve(evidenceRoot, "comparison.html")).href);
    const loaded = await review.locator("img").evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0));
    if (!loaded) throw new Error("Missing comparison image");
    await review.screenshot({ path: join(evidenceRoot, "comparison.png"), fullPage: true });
  }
} finally { await browser.close(); }
