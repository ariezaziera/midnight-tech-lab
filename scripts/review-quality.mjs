import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
const root = "docs/04-delivery/evidence/m5c";
const read = path => JSON.parse(readFileSync(`${root}/${path}`, "utf8"));
const stats = values => ({ median: [...values].sort((a,b)=>a-b)[Math.floor(values.length/2)], min: Math.min(...values), max:Math.max(...values) });
const phases = Object.fromEntries(["before","after"].map(phase => {
  const samples=read(`${phase}/measurements.json`).observations;
  return [phase,{readinessMs:stats(samples.map(r=>r.metrics.readyMs)),javascriptBytes:stats(samples.map(r=>r.javascriptTransferBytes)),raster:samples[0].raster,metrics:samples[0].metrics,idleStable:samples.every(r=>r.idle.unchanged),errors:samples.flatMap(r=>r.errors)}];
}));
const quality=read("quality/measurements.json");
const modes=Object.fromEntries(["Low","Medium","High"].map(mode=>{
  const samples=quality.results.filter(r=>r.mode===mode);
  const overview=samples.filter(r=>r.preset==="overview");
  return [mode,{overview:overview[0].metrics,pixels:overview[0].metrics.width*overview[0].metrics.height,idleStable:samples.every(r=>r.idleUnchanged),samples:samples.length,errors:samples.flatMap(r=>r.errors)}];
}));
writeFileSync(`${root}/performance-comparison.json`,JSON.stringify({phases,modes,responsive:quality.responsive},null,2));
const presets=["overview","creator","projects","workstation"];
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><title>M5-C quality review</title><style>body{margin:24px;background:#0b1024;color:#eee;font:18px system-ui}section{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}figure{margin:0}img{width:100%;display:block}figcaption{padding:10px}p{max-width:1100px}</style><h1>M5-C — Density comparison</h1><p>Matching 1440×900 Chromium captures, device scale factor 2. Low / Medium / High cap DPR at 1 / 1.5 / 2. Geometry, lighting, colors and camera poses are identical. Differences are primarily pixel density. Low is the conservative default. No FPS or physical GPU compatibility claim.</p>${presets.map(p=>`<h2>${p}</h2><section>${["low","medium","high"].map(q=>`<figure><img src="quality/${q}-${p}.png" alt="${q} quality, ${p} camera"><figcaption>${q} · ${p}</figcaption></figure>`).join("")}</section>`).join("")}</html>`;
writeFileSync(`${root}/comparison.html`,html);
const browser=await chromium.launch();
try {
 const page=await browser.newPage({viewport:{width:1800,height:1000}});
 await page.goto(pathToFileURL(resolve(root,"comparison.html")).href);
 await page.locator("img").evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
 await page.screenshot({path:`${root}/comparison.png`,fullPage:true});
} finally {await browser.close();}
console.log(JSON.stringify({phases,modes,responsive:quality.responsive},null,2));
