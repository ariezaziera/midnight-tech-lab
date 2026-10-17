import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
const root="docs/04-delivery/evidence/m6a1";
const read=file=>JSON.parse(readFileSync(`${root}/${file}`,"utf8"));
const stats=values=>({median:[...values].sort((a,b)=>a-b)[Math.floor(values.length/2)],min:Math.min(...values),max:Math.max(...values)});
const phases=Object.fromEntries(["before","after"].map(phase=>{
 const samples=read(`${phase}/measurements.json`).observations;
 return [phase,{readinessMs:stats(samples.map(s=>s.metrics.readyMs)),javascriptBytes:stats(samples.map(s=>s.javascriptTransferBytes)),metrics:samples[0].metrics,idleStable:samples.every(s=>s.idle.unchanged),errors:samples.flatMap(s=>s.errors)}];
}));
const bay=read("review-bay-measurements.json"),cycles=read("after/resource-cycles.json");
const modes=Object.fromEntries(["Low","Medium","High"].map(mode=>{
 const samples=bay.entries.filter(s=>s.mode===mode);
 return [mode,{firstMs:stats(samples.map(s=>s.first.activationToDrawMs)),warmMs:stats(samples.map(s=>s.warm.activationToDrawMs)),additionalJsBytes:stats(samples.map(s=>s.additionalJsBytes)),metrics:samples[0].bay.render,camera:samples[0].bay.camera,sameCanvas:samples.every(s=>s.sameCanvas)}];
}));
const target=Math.max(1000,phases.before.readinessMs.median*1.2);
const hubOk=m=>m.calls===30&&m.triangles===1680&&m.geometries===30&&m.materials===15&&m.textures===1;
const bayOk=m=>m.calls>0&&m.calls<=35&&m.triangles<=3000&&m.geometries<=35&&m.materials<=16&&m.textures<=1&&m.lightCount<=4&&m.pointLightCount<=1&&!m.shadows;
const gates={hubStartup:phases.after.readinessMs.median<=target,initialJs:phases.after.javascriptBytes.max-phases.before.javascriptBytes.median<=12*1024,lazyJs:bay.entries.every(s=>s.additionalJsBytes<=20*1024),firstEntry:Object.values(modes).every(m=>m.firstMs.median<=1500),warmEntry:Object.values(modes).every(m=>m.warmMs.median<=750),bayResources:bay.entries.every(s=>bayOk(s.bay.render)),hubResources:cycles.samples.every(s=>hubOk(s.hub)),cycles:cycles.samples.length===20&&cycles.samples.every(s=>bayOk(s.bay)&&hubOk(s.hub)),idle:bay.idle.every(s=>s.unchanged),singleCanvas:bay.entries.every(s=>s.sameCanvas),singleGraph:bay.idle.every(s=>s.render.graphs.length===1),errors:bay.entries.every(s=>s.errors.length===0)&&phases.after.errors.length===0,responsive:bay.responsive.every(s=>!s.overflow)};
writeFileSync(`${root}/performance-comparison.json`,JSON.stringify({phases,modes,hubStartupTargetMs:target,initialJsGrowthBytes:phases.after.javascriptBytes.median-phases.before.javascriptBytes.median,gates,idleSamples:bay.idle.length,cycles:cycles.samples.length,responsive:bay.responsive,browsers:bay.browsers},null,2));
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><title>M6-A1 review</title><style>body{margin:24px;background:#0b1024;color:#eee;font:18px system-ui}section{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}section.pair{grid-template-columns:1fr 1fr}figure{margin:0}img{width:100%;display:block}figcaption{padding:10px}p{max-width:1200px}</style><h1>M6-A1 — One-scene host / technical review bay</h1><p>Original procedural placeholders only. Same 440px panel and desktop shell. Successful switching retains one Canvas; no portfolio/project/skill claims. Quality changes density only. No FPS or physical GPU claim.</p><h2>Matched hub overview, Low / device scale factor 2</h2><section class="pair">${["before","after"].map(p=>`<figure><img src="${p}/preset-overview.png" alt="${p} hub"><figcaption>${p}</figcaption></figure>`).join("")}</section><h2>Development technical review bay</h2><section>${["low","medium","high"].map(q=>`<figure><img src="quality/${q}-development.png" alt="${q} review bay"><figcaption>${q} · same camera/geometry/light setup</figcaption></figure>`).join("")}</section><h2>Preserved hub presets</h2>${["creator","projects","workstation"].map(p=>`<h3>${p}</h3><section>${["low","medium","high"].map(q=>`<figure><img src="quality/${q}-${p}.png" alt="${q} ${p}"><figcaption>${q}</figcaption></figure>`).join("")}</section>`).join("")}</html>`;
writeFileSync(`${root}/comparison.html`,html);
const browser=await chromium.launch();
try{const page=await browser.newPage({viewport:{width:1800,height:1000}});await page.goto(pathToFileURL(resolve(root,"comparison.html")).href);await page.locator("img").evaluateAll(images=>Promise.all(images.map(img=>img.decode())));await page.screenshot({path:`${root}/comparison.png`,fullPage:true});}finally{await browser.close();}
console.log(JSON.stringify({phases,modes,hubStartupTargetMs:target,gates},null,2));
if(Object.values(gates).some(value=>!value))process.exitCode=1;
