import { expect, test, type Page } from "@playwright/test";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const evidence = "docs/04-delivery/evidence/m6a1/after";
const sceneKey = "midnight-tech-lab:stable-scene:v1";
test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const entry = (page: Page) => page.getByRole("button", { name: "Enter Development Review Bay" });
const directory = (page: Page) => page.getByTestId("studio-directory");
const canvas = (page: Page) => page.locator("canvas");
async function metrics(page: Page) { return JSON.parse((await canvas(page).getAttribute("data-render-metrics"))!); }
async function ready(page: Page, id = "hub") {
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true", { timeout: 20000 });
  await expect(directory(page)).toHaveAttribute("data-phase", "ready");
  await expect(canvas(page)).toHaveAttribute("data-active-scene", id);
  await expect(canvas(page)).toHaveCount(1);
  expect((await metrics(page)).graphs).toEqual([id]);
}
function bayChunk() {
  const root = join(process.cwd(), ".next/static/chunks");
  const file = readdirSync(root, { recursive: true }).map(String).find(file => file.endsWith(".js") && readFileSync(join(root, file), "utf8").includes("DevelopmentTechnicalReviewBay"));
  if (!file) throw new Error("Development lazy chunk missing");
  return `**/_next/static/chunks/${file.replaceAll("\\", "/")}`;
}
async function screenshot(page: Page, name: string) {
  await page.locator("#studio-preview-heading").evaluate(el => scrollTo(0, el.getBoundingClientRect().top + scrollY - 30));
  await page.screenshot({ path: `${evidence}/${name}.png` });
}

test("lazy bay uses one existing Canvas, keyboard focus and original hub restoration", async ({ page }) => {
  let requests = 0;
  await page.route(bayChunk(), route => { requests++; return route.continue(); });
  await page.goto("/"); await ready(page);
  expect(requests).toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: "Creator ID" }).click();
  await expect(canvas(page)).toHaveAttribute("data-camera-preset", "creator");
  await expect(canvas(page)).toHaveAttribute("data-camera-moving", "false");
  await canvas(page).evaluate(c => c.setAttribute("data-original-canvas", "true"));
  const history = await page.evaluate(() => window.history.length);
  await entry(page).focus(); await page.keyboard.press("Enter"); await ready(page, "development");
  expect(requests).toBe(1);
  await expect(page.getByRole("heading", { name: "Development Lab — Technical Review Placeholder", exact: true })).toBeFocused();
  await expect(canvas(page)).toHaveAttribute("data-original-canvas", "true");
  expect(await page.evaluate(() => window.history.length)).toBe(history);
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("group", { name: "Studio focus controls" })).toHaveCount(0);
  await screenshot(page, "development-keyboard");
  await page.getByRole("button", { name: "Back to Central Hub" }).click(); await ready(page);
  await expect(entry(page)).toBeFocused();
  await expect(canvas(page)).toHaveAttribute("data-camera-preset", "creator");
  await expect(canvas(page)).toHaveAttribute("data-original-canvas", "true");
  await entry(page).click(); await ready(page, "development");
  await page.getByRole("button", { name: "Reset view" }).click(); await ready(page);
  await expect(canvas(page)).toHaveAttribute("data-camera-preset", "overview");
  expect(await page.evaluate(key => sessionStorage.getItem(key), sceneKey)).toBe("hub");
  await entry(page).click(); await ready(page, "development");
  const resetStoredScene = await page.evaluate(key => {
    Array.from(document.querySelectorAll("button")).find(button => button.textContent === "Reset view")!.click();
    const value = sessionStorage.getItem(key);
    (document.querySelector('nav[aria-label="Main navigation"] a[href="/about"]') as HTMLAnchorElement).click();
    return value;
  }, sceneKey);
  expect(resetStoredScene).toBeNull();
  await expect(page).toHaveURL("/about"); await page.getByRole("link", { name: "Return to studio" }).click();
  await ready(page); await expect(canvas(page)).toHaveAttribute("data-camera-preset", "overview");
});

test("cancelled and rapid stale loads cannot replace the restored hub", async ({ page }) => {
  let release = () => {};
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route(bayChunk(), async route => { await pending; await route.continue().catch(() => {}); });
  try {
    await page.goto("/"); await ready(page);
    await entry(page).click(); await expect(directory(page)).toHaveAttribute("data-phase", "loading");
    await screenshot(page, "development-loading");
    await entry(page).focus(); await page.keyboard.press("Escape"); await ready(page);
    await expect(page.getByTestId("scene-notice")).toContainText("cancelled");
    await expect(entry(page)).toBeFocused();
    await entry(page).click(); await expect(directory(page)).toHaveAttribute("data-phase", "loading");
    await page.evaluate(() => {
      for (let i = 0; i < 6; i++) (document.querySelector('[data-testid="studio-directory"] button') as HTMLButtonElement).click();
      Array.from(document.querySelectorAll("button")).find(button => button.textContent === "Back to Central Hub")!.click();
    });
    await ready(page); release(); await page.waitForTimeout(700);
    await ready(page); expect(await page.evaluate(key => sessionStorage.getItem(key), sceneKey)).toBe("hub");
    await screenshot(page, "development-cancelled");
    await entry(page).click(); await ready(page, "development");
  } finally { release(); }
});

test("failed Development download has understandable retry without broken HTML", async ({ page }) => {
  const pattern = bayChunk();
  await page.route(pattern, route => route.abort("failed"));
  await page.goto("/"); await ready(page);
  await entry(page).click(); await expect(directory(page)).toHaveAttribute("data-phase", "failed");
  await expect(page.getByTestId("scene-notice")).toContainText("could not initialize or download");
  await screenshot(page, "development-download-failure");
  await expect(page.getByTestId("studio-actions").getByRole("link", { name: "Browse projects" })).toHaveAttribute("href", "/projects");
  await page.unroute(pattern); await page.getByRole("button", { name: "Retry review bay" }).click(); await ready(page, "development");
});

test("per-scene watchdog rejects late completion and remains cancellable", async ({ page }) => {
  test.setTimeout(45000);
  let release = () => {}; const pending = new Promise<void>(resolve => { release = resolve; });
  const pattern = bayChunk();
  await page.route(pattern, async route => { await pending; await route.continue().catch(() => {}); });
  try {
    await page.goto("/"); await ready(page); await entry(page).click();
    await expect(directory(page)).toHaveAttribute("data-phase", "failed", { timeout: 20000 });
    await expect(page.getByTestId("scene-notice")).toContainText("took too long");
    release(); await page.waitForTimeout(500);
    await expect(directory(page)).toHaveAttribute("data-phase", "failed");
    await page.getByRole("button", { name: "Back to Central Hub" }).click(); await ready(page);
    await entry(page).click(); await ready(page, "development");
  } finally { release(); }
});

test("scene allocation exception is isolated and retry recovers", async ({ page }) => {
  await page.addInitScript(() => {
    const Original = Float32Array;
    window.Float32Array = new Proxy(Original, { construct(target, args) {
      if (document.querySelector('[data-studio-scene="development"]') && !document.documentElement.hasAttribute("data-allow-review-allocation")) throw new Error("Injected review geometry allocation failure");
      return Reflect.construct(target, args);
    } });
  });
  await page.goto("/"); await ready(page); await entry(page).click();
  await expect(directory(page)).toHaveAttribute("data-phase", "failed");
  await screenshot(page, "development-initialization-failure");
  await page.evaluate(() => document.documentElement.setAttribute("data-allow-review-allocation", "true"));
  await page.getByRole("button", { name: "Retry review bay" }).click(); await ready(page, "development");
});

test("validated bay restores after reload; leaving a pending load keeps the previous stable hub", async ({ page, browser }) => {
  await page.goto("/"); await ready(page); await entry(page).click(); await ready(page, "development");
  await page.reload(); await ready(page, "development");
  await expect(page.locator("#studio-preview-heading")).toHaveText("Development Lab — Technical Review Placeholder");
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const pendingPage = await context.newPage();
  let release = () => {}; const pending = new Promise<void>(resolve => { release = resolve; });
  await pendingPage.route(bayChunk(), async route => { await pending; await route.continue().catch(() => {}); });
  try {
    await pendingPage.goto("http://127.0.0.1:3000/"); await ready(pendingPage);
    await pendingPage.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: "Creator ID" }).click();
    await expect(canvas(pendingPage)).toHaveAttribute("data-camera-preset", "creator");
    await entry(pendingPage).click(); await expect(directory(pendingPage)).toHaveAttribute("data-phase", "loading");
    await pendingPage.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About", exact: true }).click();
    release(); await pendingPage.waitForTimeout(300);
    await pendingPage.getByRole("link", { name: "Return to studio" }).click(); await ready(pendingPage);
    await expect(canvas(pendingPage)).toHaveAttribute("data-camera-preset", "creator");
    expect(await pendingPage.evaluate(key => sessionStorage.getItem(key), sceneKey)).toBe("hub");
  } finally { release(); await context.close(); }
});

test("quality changes while loading and context recovery preserve validated scene", async ({ page }) => {
  let release = () => {}; const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route(bayChunk(), async route => { await pending; await route.continue().catch(() => {}); });
  try {
    await page.goto("/"); await ready(page);
    await canvas(page).evaluate(c => c.setAttribute("data-original-canvas", "true"));
    await entry(page).click(); await expect(directory(page)).toHaveAttribute("data-phase", "loading");
    await page.getByRole("radio", { name: "High", exact: true }).check(); release(); await ready(page, "development");
    expect((await metrics(page)).dpr).toBe(2);
    await expect(canvas(page)).toHaveAttribute("data-original-canvas", "true");
    await canvas(page).evaluate(c => (c as HTMLCanvasElement).getContext("webgl2")!.getExtension("WEBGL_lose_context")!.loseContext());
    await expect(page.getByTestId("scene-fallback")).toBeVisible();
    await screenshot(page, "development-context-lost");
    await page.getByRole("button", { name: "Retry 3D preview" }).click(); await ready(page, "development");
    expect((await metrics(page)).dpr).toBe(2);
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByTestId("scene-2d")).toBeVisible(); await expect(canvas(page)).toHaveCount(0);
    await page.setViewportSize({ width: 1024, height: 900 }); await ready(page, "development");
    expect((await metrics(page)).dpr).toBe(2);
    await entry(page).focus(); await page.keyboard.press("Escape"); await ready(page);
  } finally { release(); }
});

test("scene session rejects invalid IDs, tolerates denial and restores completed route journeys", async ({ page }) => {
  await page.addInitScript(key => sessionStorage.setItem(key, "media-unapproved"), sceneKey);
  await page.goto("/"); await ready(page);
  await page.addInitScript(() => { Storage.prototype.getItem = () => { throw new Error("denied"); }; Storage.prototype.setItem = () => { throw new Error("denied"); }; });
  await page.reload(); await ready(page); await entry(page).click(); await ready(page, "development");
  await page.getByTestId("studio-actions").getByRole("link", { name: "Browse projects" }).click();
  await expect(page).toHaveURL("/projects"); await page.getByRole("link", { name: "Return to studio" }).click();
  await ready(page, "development"); await expect(page.locator("#studio-preview-heading")).toBeFocused();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About", exact: true }).click();
  await page.goBack(); await ready(page, "development");
});

test("restored bay never loads on mobile/no-JS or blocks unsupported WebGL links", async ({ browser }) => {
  for (const javaScriptEnabled of [false, true]) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled });
    const page = await context.newPage(); let requests = 0;
    await page.addInitScript(key => sessionStorage.setItem(key, "development"), sceneKey);
    await page.route(bayChunk(), route => { requests++; return route.continue(); });
    await page.goto("http://127.0.0.1:3000/");
    await expect(page.getByTestId("scene-2d")).toBeVisible(); await expect(entry(page)).toHaveCount(0);
    await expect(canvas(page)).toHaveCount(0); expect(requests).toBe(0);
    await page.getByTestId("studio-directory").getByRole("link", { name: "Browse Projects", exact: true }).click();
    await expect(page).toHaveURL(/\/projects$/); await context.close();
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  await page.goto("http://127.0.0.1:3000/"); await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await entry(page).click();
  await page.getByTestId("studio-directory").getByRole("link", { name: "Browse Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/); await page.close();
});

test("twenty round trips retain bounded resources and idle rendering in every bay quality", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto("/"); await ready(page);
  const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  const samples = [];
  await canvas(page).evaluate(c => c.setAttribute("data-original-canvas", "true"));
  for (let cycle = 0; cycle < 20; cycle++) {
    await entry(page).click(); await ready(page, "development"); await page.waitForTimeout(500);
    const bay = await metrics(page);
    expect(bay.calls).toBeLessThanOrEqual(35); expect(bay.triangles).toBeLessThanOrEqual(3000);
    expect(bay.geometries).toBeLessThanOrEqual(35); expect(bay.materials).toBeLessThanOrEqual(16);
    expect(bay.textures).toBeLessThanOrEqual(1); expect(bay.lightCount).toBeLessThanOrEqual(4); expect(bay.pointLightCount).toBeLessThanOrEqual(1); expect(bay.shadows).toBe(false);
    await page.getByRole("button", { name: "Back to Central Hub" }).click(); await ready(page); await page.waitForTimeout(500);
    const hub = await metrics(page);
    expect(hub.calls).toBe(30); expect(hub.triangles).toBe(1680); expect(hub.geometries).toBe(30); expect(hub.materials).toBe(15); expect(hub.textures).toBe(1);
    samples.push({ cycle, bay, hub }); await expect(canvas(page)).toHaveAttribute("data-original-canvas", "true");
  }
  await entry(page).click(); await ready(page, "development");
  for (const label of ["Low", "Medium", "High"]) {
    await page.getByRole("radio", { name: label, exact: true }).check(); await page.waitForTimeout(500);
    const frame = await canvas(page).getAttribute("data-render-count"); await page.waitForTimeout(2000);
    expect(await canvas(page).getAttribute("data-render-count")).toBe(frame);
  }
  writeFileSync(`${evidence}/resource-cycles.json`, JSON.stringify({ samples, errors }, null, 2)); expect(errors).toEqual([]);
});
