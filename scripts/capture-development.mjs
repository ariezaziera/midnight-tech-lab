import { chromium, firefox, webkit } from "@playwright/test";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const phase = process.argv[2];
if (!["before", "after"].includes(phase)) throw new Error("Use before or after");
const root = `docs/04-delivery/evidence/m6a2/${phase}`;
mkdirSync(`${root}/quality`, { recursive: true });
const browser = await chromium.launch();
const entries = [], idle = [], responsive = [], journeys = [];
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
    Array.from(directory.querySelectorAll("button")).find(b => /^Enter Development/.test(b.textContent)).click();
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
      if (!run) { await rest(page,mode,"development"); await capture(page,`${mode.toLowerCase()}-development`); if (phase === "after") { await page.getByRole("button", {name:"Focus Savvyra",exact:true}).click(); await page.waitForFunction(()=>document.querySelector("canvas")?.dataset.cameraPreset === "development-exhibit" && document.querySelector("canvas")?.dataset.cameraMoving === "false"); await rest(page,mode,"development-exhibit"); await capture(page,`${mode.toLowerCase()}-focus`); } }
      await page.getByRole("button",{name:"Back to Central Hub"}).click(); await ready(page,"hub");
      const warm = await enter(page); await page.waitForTimeout(200);
      const sameCanvas = await page.locator("canvas").getAttribute("data-capture-identity") === "original";
      entries.push({ mode, run, first, warm, bay, sameCanvas, additional, additionalJsBytes:additional.filter(r=>r.path.endsWith(".js")).reduce((sum,r)=>sum+r.bytes,0), errors });
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
  if (phase === "after") {
    const page = await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});
    await page.goto("http://127.0.0.1:3000/"); await ready(page,"hub");
    const history = await page.evaluate(()=>window.history.length);
    await page.getByRole("button",{name:"Enter Development Lab",exact:true}).focus(); await page.keyboard.press("Enter"); await ready(page,"development");
    const focus = page.getByRole("button",{name:"Focus Savvyra",exact:true});
    await focus.focus(); await page.keyboard.press("Enter");
    await page.waitForFunction(()=>document.querySelector("canvas")?.dataset.cameraPreset==="development-exhibit"&&document.querySelector("canvas")?.dataset.cameraMoving==="false");
    journeys.push({method:"keyboard",focused:await focus.evaluate(el=>document.activeElement===el),unchangedHistory:history===await page.evaluate(()=>window.history.length),metrics:await readMetrics(page)});
    await capture(page,"keyboard-focus"); await page.screenshot({path:`${root}/quality/keyboard-journey.png`,fullPage:true});
    await page.locator("summary").filter({hasText:"About Savvyra"}).focus(); await page.keyboard.press("Enter");
    await page.screenshot({path:`${root}/quality/approved-explanation.png`,fullPage:true});
    await page.getByRole("link",{name:"Read Savvyra case study",exact:true}).click();
    await page.screenshot({path:`${root}/quality/case-study.png`,fullPage:true});
    const detail = new URL(page.url()).pathname;
    await page.goBack(); await ready(page,"development");
    await page.waitForFunction(()=>document.querySelector("canvas")?.dataset.cameraPreset==="development"&&document.querySelector("canvas")?.dataset.cameraMoving==="false");
    journeys.push({method:"route",detail,returnedScene:await page.locator("canvas").getAttribute("data-active-scene"),pose:await page.locator("canvas").getAttribute("data-camera-preset")});
    await page.locator("canvas").scrollIntoViewIfNeeded();
    const pick=(await readMetrics(page)).camera.exhibitPick, box=await page.locator("canvas").boundingBox();
    await page.mouse.click(box.x+box.width*pick.x,box.y+box.height*pick.y);
    await page.waitForFunction(()=>document.querySelector("canvas")?.dataset.cameraPreset==="development-exhibit"&&document.querySelector("canvas")?.dataset.cameraMoving==="false");
    journeys.push({method:"pointer",focused:await focus.evaluate(el=>document.activeElement===el),metrics:await readMetrics(page)});
    await capture(page,"pointer-focus"); await page.close();
    const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const mobile=await context.newPage(); await mobile.goto("http://127.0.0.1:3000/");
    await mobile.screenshot({path:`${root}/quality/no-js-mobile.png`,fullPage:true});
    await mobile.locator("summary").filter({hasText:"About Savvyra"}).click();
    await mobile.screenshot({path:`${root}/quality/no-js-mobile-expanded.png`,fullPage:true});
    await mobile.getByRole("link",{name:"Read Savvyra case study",exact:true}).click();
    journeys.push({method:"no-js-mobile",detail:new URL(mobile.url()).pathname,canvas:await mobile.locator("canvas").count()});
    await context.close();
  }
  writeFileSync(`${root}/review-bay-measurements.json`,JSON.stringify({browser:browser.version(),environment:"Windows; local production build; Chromium headless; no throttling; fresh context per first entry; 1440x900 deviceScaleFactor2; reduced-motion snap for preset inspection; five first/warm entries per quality; idle 500ms settle +2s +10s; input-to-ready includes DOM event through completed draw/ready UI commit; separate normal-motion keyboard/pointer journey captures",entries,idle,responsive,journeys,browsers:[chromium,firefox,webkit].map(type=>({name:type.name(),installed:existsSync(type.executablePath())}))},null,2));
  console.log(JSON.stringify({entrySamples:entries.length,idleSamples:idle.length,allIdleStable:idle.every(r=>r.unchanged),sameCanvas:entries.every(r=>r.sameCanvas),errors:entries.flatMap(r=>r.errors),responsive},null,2));
} finally {await browser.close();}
