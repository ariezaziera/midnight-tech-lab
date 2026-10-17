import { chromium, firefox, webkit } from "@playwright/test";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const root = "docs/04-delivery/evidence/m6a1";
mkdirSync(`${root}/quality`, { recursive: true });
const browser = await chromium.launch();
const entries = [], idle = [], responsive = [];
const readMetrics = page => page.locator("canvas").evaluate(c => ({ render: JSON.parse(c.dataset.renderMetrics), camera: JSON.parse(c.dataset.cameraDiagnostics), frames: c.dataset.renderCount }));
async function ready(page, id) {
  await page.waitForFunction(id => document.querySelector('[data-testid="studio-directory"]')?.dataset.phase === "ready" && document.querySelector("canvas")?.dataset.activeScene === id, id);
}
async function enter(page) {
  return page.evaluate(() => new Promise((resolve, reject) => {
    const directory = document.querySelector('[data-testid="studio-directory"]');
    const start = performance.now();
    const observer = new MutationObserver(() => {
      if (directory.dataset.phase === "ready" && directory.dataset.scene === "development") {
        observer.disconnect(); clearTimeout(timer);
        resolve({ activationToDrawMs: Math.round(performance.now() - start), hostReadyMs: Number(directory.dataset.readyMs) });
      }
    });
    const timer = setTimeout(() => { observer.disconnect(); reject(new Error("Review bay did not become ready")); }, 20000);
    observer.observe(directory, { attributes: true });
    Array.from(directory.querySelectorAll("button")).find(b => b.textContent === "Enter Development Review Bay").click();
  }));
}
async function capture(page, filename) {
  await page.locator("#studio-preview-heading").evaluate(el => scrollTo(0, el.getBoundingClientRect().top + scrollY - 30));
  await page.screenshot({ path: `${root}/quality/${filename}.png` });
}
async function rest(page, mode, preset) {
  await page.waitForTimeout(500);
  const before = await readMetrics(page);
  await page.waitForTimeout(2000); const two = await page.locator("canvas").getAttribute("data-render-count");
  await page.waitForTimeout(10000); const ten = await page.locator("canvas").getAttribute("data-render-count");
  idle.push({ mode, preset, ...before, after2s:two, afterFurther10s:ten, unchanged: before.frames === two && two === ten });
}
try {
  for (const mode of ["Low", "Medium", "High"]) {
    for (let run = 0; run < 5; run++) {
      const context = await browser.newContext({ viewport: { width:1440, height:900 }, deviceScaleFactor:2, reducedMotion:"reduce" });
      const page = await context.newPage(), errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto("http://127.0.0.1:3000/"); await ready(page,"hub");
      await page.getByRole("radio", { name: mode, exact:true }).check(); await page.waitForTimeout(500);
      const resourcesBefore = await page.evaluate(() => performance.getEntriesByType("resource").map(r => ({ path:new URL(r.name).pathname, bytes:r.transferSize })));
      await page.locator("canvas").evaluate(c => c.setAttribute("data-capture-identity", "original"));
      const first = await enter(page); await page.waitForTimeout(500);
      const bay = await readMetrics(page);
      const additional = await page.evaluate(paths => performance.getEntriesByType("resource").filter(r => !paths.includes(new URL(r.name).pathname)).map(r => ({ path:new URL(r.name).pathname, bytes:r.transferSize, durationMs:Math.round(r.duration) })), resourcesBefore.map(r=>r.path));
      if (!run) { await rest(page,mode,"development"); await capture(page,`${mode.toLowerCase()}-development`); }
      await page.getByRole("button",{name:"Back to Central Hub"}).click(); await ready(page,"hub");
      const warm = await enter(page); await page.waitForTimeout(200);
      const sameCanvas = await page.locator("canvas").getAttribute("data-capture-identity") === "original";
      entries.push({ mode, run, first, warm, bay, sameCanvas, additional, additionalJsBytes:additional.filter(r=>r.path.endsWith(".js")).reduce((sum,r)=>sum+r.bytes,0), errors });
      if (!run) {
        await page.getByRole("button",{name:"Back to Central Hub"}).click(); await ready(page,"hub");
        for (const [preset,label] of [["overview",null],["creator","Creator ID"],["projects","Project Display"],["workstation","Workstation"]]) {
          if(label) await page.getByRole("group",{name:"Studio focus controls"}).getByRole("button",{name:label}).click();
          await page.waitForFunction(id=>{const c=document.querySelector("canvas");return c?.dataset.cameraPreset===id&&c.dataset.cameraMoving==="false";},preset);
          await rest(page,mode,preset); await capture(page,`${mode.toLowerCase()}-${preset}`);
        }
      }
      await context.close();
    }
    console.log(`Captured ${mode}: five first/warm entries, all preset idle windows and screenshots`);
  }
  for (const width of [320,390,768,1024,1440]) {
    const page=await browser.newPage({viewport:{width,height:width===390?844:900}});
    await page.goto("http://127.0.0.1:3000/");
    if(width>=768) {await ready(page,"hub");await enter(page);await ready(page,"development");}
    await page.screenshot({path:`${root}/quality/responsive-${width}.png`,fullPage:width<768});
    responsive.push({width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),canvas:await page.locator("canvas").count()});
    await page.close();
  }
  writeFileSync(`${root}/review-bay-measurements.json`,JSON.stringify({browser:browser.version(),environment:"Windows; local production build; Chromium headless; no throttling; fresh context per first entry; 1440x900 deviceScaleFactor2; reduced-motion snap for preset inspection; five first/warm entries per quality; idle 500ms settle +2s +10s; input-to-ready includes DOM event through completed draw/ready UI commit",entries,idle,responsive,browsers:[chromium,firefox,webkit].map(type=>({name:type.name(),installed:existsSync(type.executablePath())}))},null,2));
  console.log(JSON.stringify({entrySamples:entries.length,idleSamples:idle.length,allIdleStable:idle.every(r=>r.unchanged),sameCanvas:entries.every(r=>r.sameCanvas),errors:entries.flatMap(r=>r.errors),responsive},null,2));
} finally {await browser.close();}
