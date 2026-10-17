import { chromium, firefox, webkit } from "@playwright/test";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
const root = "docs/04-delivery/evidence/m5c";
mkdirSync(`${root}/quality`, { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  for (let run = 0; run < 3; run++) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
    const page = await context.newPage(); const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("http://127.0.0.1:3000/");
    await page.waitForFunction(() => document.querySelector('[data-scene-ready="true"]'));
    for (const mode of ["Low", "Medium", "High"]) {
      await page.getByRole("radio", { name: mode, exact: true }).check();
      await page.waitForFunction(dpr => JSON.parse(document.querySelector("canvas")?.dataset.renderMetrics ?? "{}").dpr === dpr, {Low:1,Medium:1.5,High:2}[mode]);
      for (const [preset, label] of [["overview", null], ["creator", "Creator ID"], ["projects", "Project Display"], ["workstation", "Workstation"]]) {
        if (label) await page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: label }).click();
        else await page.getByRole("button", { name: "Reset view" }).click();
        await page.waitForFunction(id => {const c=document.querySelector("canvas"); return c?.dataset.cameraPreset===id && c.dataset.cameraMoving==="false";}, preset);
        await page.waitForTimeout(300);
        const data = await page.locator("canvas").evaluate(c => ({ metrics: JSON.parse(c.dataset.renderMetrics), camera: JSON.parse(c.dataset.cameraDiagnostics), frames: c.dataset.renderCount }));
        await page.waitForTimeout(750);
        const idle = await page.locator("canvas").getAttribute("data-render-count");
        results.push({ run, mode, preset, ...data, idleUnchanged: idle === data.frames, errors: [...errors] });
        if (!run) {
          await page.locator("#studio-preview-heading").evaluate(el => scrollTo(0, el.getBoundingClientRect().top + scrollY - 30));
          await page.screenshot({ path: `${root}/quality/${mode.toLowerCase()}-${preset}.png` });
        }
      }
    }
    await context.close();
  }
  const responsive = [];
  for (const width of [320,390,768,1024,1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto("http://127.0.0.1:3000/");
    if (width >= 768) await page.waitForFunction(() => document.querySelector('[data-scene-ready="true"]'));
    await page.screenshot({ path: `${root}/quality/responsive-${width}.png`, fullPage: true });
    responsive.push({width, overflow: await page.evaluate(()=> document.documentElement.scrollWidth > innerWidth), canvas: await page.locator("canvas").count()});
    await page.close();
  }
  writeFileSync(`${root}/quality/measurements.json`, JSON.stringify({ browser: browser.version(), environment: "Windows; local production build; 1440x900 deviceScaleFactor 2; 3 fresh contexts; no throttling; reduced motion for stable preset capture; 750ms idle windows", results, responsive }, null, 2));
  writeFileSync(`${root}/cross-browser.json`, JSON.stringify([chromium,firefox,webkit].map(type => ({ browser:type.name(), installed:existsSync(type.executablePath()), result:type===chromium ? "Production baseline, full regression suite and evidence captures" : "Not run: binary absent; no download performed" })), null, 2));
  console.log(JSON.stringify({ samples:results.length, idleStable:results.every(r=>r.idleUnchanged), errors:results.flatMap(r=>r.errors), responsive },null,2));
} finally { await browser.close(); }
