import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const root = "docs/04-delivery/evidence/m6a2";
const read = file => JSON.parse(readFileSync(`${root}/${file}`, "utf8"));
const stats = values => ({ median: [...values].sort((a,b)=>a-b)[Math.floor(values.length/2)], min: Math.min(...values), max: Math.max(...values) });
const phases = Object.fromEntries(["before","after"].map(phase => {
  const hub = read(`${phase}/measurements.json`), bay = read(`${phase}/review-bay-measurements.json`);
  return [phase, { browser: hub.browser, startupSamples: hub.observations.length, errors: hub.observations.flatMap(s=>s.errors), startup: stats(hub.observations.map(s=>s.metrics.readyMs)), js: stats(hub.observations.map(s=>s.javascriptTransferBytes)), hub: hub.observations[0].metrics, idle: hub.observations.every(s=>s.idle.unchanged), modes: Object.fromEntries(["Low","Medium","High"].map(mode=>{
    const rows=bay.entries.filter(s=>s.mode===mode);
    return [mode,{count:rows.length,first:stats(rows.map(s=>s.first.activationToDrawMs)),warm:stats(rows.map(s=>s.warm.activationToDrawMs)),lazyJs:stats(rows.map(s=>s.additionalJsBytes)),render:rows[0].bay.render}];
  })), bay }];
}));
const after=phases.after, before=phases.before, cycles=read("after/resource-cycles.json");
const resourceOk=m=>m.calls<=45&&m.triangles<=7000&&m.geometries<=45&&m.materials<=20&&m.textures<=3&&m.lightCount<=4&&m.pointLightCount<=1&&!m.shadows;
const hubOk=m=>m.calls===30&&m.triangles===1680&&m.geometries===30&&m.materials===15&&m.textures===1;
const stableKeys=["calls","triangles","geometries","materials","textures"];
const target=Math.max(1000,before.startup.median*1.2);
const chunkRoot=".next/static/chunks";
const developmentChunk=readdirSync(chunkRoot,{recursive:true}).map(String).find(file=>file.endsWith(".js")&&readFileSync(`${chunkRoot}/${file}`,"utf8").includes("DevelopmentTechnicalReviewBay"));
const startupRows=read("after/measurements.json").observations;
const gates={startupSamples:after.startupSamples===5&&before.startupSamples===5,unvisitedScene:!!developmentChunk&&startupRows.every(s=>s.resources.every(r=>!r.path.endsWith(developmentChunk.replaceAll("\\","/")))),sameBrowser:after.browser===before.browser,hubReadiness:after.startup.median<=target,initialHomeJs:after.js.max<=393559+12*1024,lazyJs:after.bay.entries.every(s=>s.additionalJsBytes<=20*1024),entries:Object.values(after.modes).every(m=>m.count===5&&m.first.median<=1500&&m.warm.median<=750),idle:after.idle&&after.bay.idle.length===6&&after.bay.idle.every(s=>s.unchanged),singleCanvas:after.bay.entries.every(s=>s.sameCanvas),resources:after.bay.idle.every(s=>resourceOk(s.render)&&s.render.graphs.length===1&&s.render.graphs[0]==="development"),twentyCycles:cycles.samples.length===20&&cycles.samples.every(s=>hubOk(s.hub)&&resourceOk(s.bay)&&resourceOk(s.focus)&&stableKeys.every(key=>s.focus[key]===cycles.samples[0].focus[key]&&s.bay[key]===cycles.samples[0].bay[key])),responsive:after.bay.responsive.every(s=>!s.overflow&&s.canvas===(s.width<768?0:1)),journeys:after.bay.journeys.length===4&&after.bay.journeys.every(s=>s.method==="keyboard"?s.focused&&s.unchangedHistory:s.method==="pointer"?s.focused:s.method==="route"?s.detail==="/projects/savvyra"&&s.returnedScene==="development"&&s.pose==="development":s.method==="no-js-mobile"&&s.detail==="/projects/savvyra"&&s.canvas===0),errors:!after.errors.length&&after.bay.entries.every(s=>!s.errors.length)&&!cycles.errors.length};
writeFileSync(`${root}/performance-comparison.json`,JSON.stringify({phases,hubReadinessTargetMs:target,initialHomeJsCapBytes:405847,jsGrowthFromAcceptedBase:after.js.median-before.js.median,gates},null,2));
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><title>M6-A2 review</title><style>body{margin:24px;background:#080b1c;color:#eee;font:18px system-ui}section{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.pair{grid-template-columns:1fr 1fr}figure{margin:0}img{width:100%;display:block}figcaption{padding:10px}</style><h1>M6-A2 · Text-first Savvyra exhibit</h1><p>Original procedural marker only; no project imagery or imported artwork. Approved narrative remains HTML. One Canvas, original Hub and 440px panel retained. Baseline completed October 17; after capture follows resumed October 20 execution. Local Chromium results do not establish real-device GPU/FPS performance.</p><p>Startup median ${before.startup.median}→${after.startup.median} ms; initial JS ${before.js.median}→${after.js.median} bytes. Threshold ${target} ms; original F JS cap 405847 bytes.</p><h2>Hub before / after</h2><section class="pair">${["before","after"].map(p=>`<figure><img src="${p}/preset-overview.png" alt="${p} Hub overview"><figcaption>${p}</figcaption></figure>`).join("")}</section><h2>Development overview</h2><section>${["low","medium","high"].map(q=>`<figure><img src="after/quality/${q}-development.png" alt="${q} Development overview"><figcaption>${q}</figcaption></figure>`).join("")}</section><h2>Savvyra focus</h2><section>${["low","medium","high"].map(q=>`<figure><img src="after/quality/${q}-focus.png" alt="${q} exhibit focus"><figcaption>${q}</figcaption></figure>`).join("")}</section></html>`;
writeFileSync(`${root}/comparison.html`,html);
const browser=await chromium.launch();
try { const page=await browser.newPage({viewport:{width:1800,height:1000}});await page.goto(pathToFileURL(resolve(root,"comparison.html")).href);await page.locator("img").evaluateAll(images=>Promise.all(images.map(img=>img.decode())));await page.screenshot({path:`${root}/comparison.png`,fullPage:true}); } finally {await browser.close();}
console.log(JSON.stringify({startup:after.startup,modes:after.modes,jsGrowth:after.js.median-before.js.median,gates},null,2));
if(Object.values(gates).some(value=>!value))process.exitCode=1;
