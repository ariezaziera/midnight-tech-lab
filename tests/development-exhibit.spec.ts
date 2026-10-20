import { expect, test, type Page } from "@playwright/test";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { content } from "../src/content/editorial";
import { developmentExhibit } from "../src/lib/scene/zone-content";
import { developmentPoses } from "../src/lib/scene/development-config";
import { StudioPreview } from "../src/components/studio/studio-preview";

const canvas = (page: Page) => page.locator("canvas");
async function settled(page: Page, pose = "development") {
  await expect(canvas(page)).toHaveAttribute("data-camera-preset", pose);
  await expect(canvas(page)).toHaveAttribute("data-camera-moving", "false");
}
async function enter(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true", { timeout: 20000 });
  await page.getByRole("button", { name: "Enter Development Lab", exact: true }).click();
  await expect(page.getByTestId("studio-directory")).toHaveAttribute("data-phase", "ready");
  await settled(page);
}

test("only eligible approved Development text crosses the scene boundary", () => {
  const record = content.projects.find(project => project.slug === "savvyra")!;
  const exhibit = developmentExhibit(content)!;
  expect(exhibit.summary).toBe(record.summary);
  expect(exhibit.contribution).toBe(record.caseStudy.contribution);
  expect(exhibit.approach).toBe(record.caseStudy.process![0]);
  expect(Object.keys(exhibit).sort()).toEqual(["approach", "contribution", "href", "id", "summary", "title"]);
  for (const recordOverride of [
    { ...record, status: "draft" as const }, { ...record, status: "placeholder" as const },
    { ...record, approval: undefined }, { ...record, approval: { ...record.approval!, source: "" } },
    { ...record, role: undefined }, { ...record, caseStudy: { ...record.caseStudy, overview: "" } },
    { ...record, categoryIds: [] }, { ...record, caseStudy: {} }, { ...record, slug: "other" },
  ]) expect(developmentExhibit({ ...content, projects: [recordOverride] })).toBeNull();
  expect(developmentExhibit({ ...content, projects: [] })).toBeNull();
  const fallback = renderToStaticMarkup(createElement(StudioPreview, { exhibit: null }));
  expect(fallback).toContain("Technical review placeholder only");
  expect(fallback).not.toContain("/projects/savvyra");
});

test("pointer marker and keyboard controls select the same bounded exhibit", async ({ page }) => {
  await enter(page);
  const history = await page.evaluate(() => window.history.length);
  await canvas(page).evaluate(c => c.setAttribute("data-test-canvas", "original"));
  await canvas(page).evaluate(c => {
    const samples: { position: number[]; clearance: number }[] = [];
    (window as unknown as { developmentSamples: typeof samples }).developmentSamples = samples;
    new MutationObserver(() => {
      const info = JSON.parse((c as HTMLCanvasElement).dataset.cameraDiagnostics!);
      samples.push({ position: info.position, clearance: info.clearance });
    }).observe(c, { attributes: true, attributeFilter: ["data-camera-diagnostics"] });
  });
  await canvas(page).scrollIntoViewIfNeeded();
  const pick = JSON.parse((await canvas(page).getAttribute("data-camera-diagnostics"))!).exhibitPick;
  const rect = (await canvas(page).boundingBox())!;
  await page.mouse.click(rect.x + rect.width * pick.x, rect.y + rect.height * pick.y);
  await settled(page, "development-exhibit");
  const focus = page.getByRole("button", { name: "Focus Savvyra", exact: true });
  await expect(focus).toHaveAttribute("aria-pressed", "true");
  await expect(focus).toBeFocused();
  // Pointer selection restores focus; the focus-visible ring is a keyboard affordance.
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(focus).toBeFocused();
  expect(await focus.evaluate(el => getComputedStyle(el).outlineStyle)).toBe("solid");
  const diagnostics = JSON.parse((await canvas(page).getAttribute("data-camera-diagnostics"))!);
  expect(diagnostics.position).toEqual(developmentPoses.exhibit.position);
  expect(diagnostics.clearance).toBeGreaterThan(1);
  for (const [x,y,z] of diagnostics.corners) { expect(Math.abs(x)).toBeLessThan(1); expect(Math.abs(y)).toBeLessThan(1); expect(z).toBeGreaterThan(-1); expect(z).toBeLessThan(1); }
  await page.keyboard.press("Escape"); await settled(page);
  await expect(focus).toBeFocused();
  await page.keyboard.press("Enter"); await settled(page, "development-exhibit");
  await page.getByRole("button", { name: "Back to Development overview", exact: true }).click(); await settled(page);
  await expect(focus).toBeFocused();
  const samples = await page.evaluate(() => (window as unknown as { developmentSamples: { position: number[]; clearance: number }[] }).developmentSamples);
  expect(samples.length).toBeGreaterThan(2);
  const outside = samples.filter(sample => sample.position.some((value, axis) => value < [2.7,2.6,4.2][axis] - .0001 || value > [5.6,4.6,6.8][axis] + .0001));
  expect(outside).toEqual([]);
  expect(Math.min(...samples.map(sample => sample.clearance))).toBeGreaterThan(1);
  expect(await page.evaluate(() => window.history.length)).toBe(history);
  await expect(canvas(page)).toHaveAttribute("data-test-canvas", "original");
  await page.keyboard.press("Escape");
  await expect(canvas(page)).toHaveAttribute("data-active-scene", "hub");
  await expect(page.getByRole("button", { name: "Enter Development Lab", exact: true })).toBeFocused();
});

test("rapid exhibit requests settle to the latest choice without scene history or Canvas replacement", async ({ page }) => {
  await enter(page);
  const history = await page.evaluate(() => window.history.length);
  await canvas(page).evaluate(c => c.setAttribute("data-rapid-canvas", "original"));
  for (let i=0;i<6;i++) {
    await page.getByRole("button", {name:"Focus Savvyra",exact:true}).click();
    await page.getByRole("button", {name:"Back to Development overview",exact:true}).click();
  }
  await settled(page);
  await expect(page.getByRole("button", {name:"Focus Savvyra",exact:true})).toHaveAttribute("aria-pressed","false");
  await expect(canvas(page)).toHaveAttribute("data-rapid-canvas","original");
  expect(await page.evaluate(() => window.history.length)).toBe(history);
});

test("reduced motion snaps, quality is independent and Reset still means hub overview", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await enter(page);
  const before = Number(await canvas(page).getAttribute("data-render-count"));
  await page.getByRole("button", { name: "Focus Savvyra", exact: true }).click(); await settled(page, "development-exhibit");
  expect(Number(await canvas(page).getAttribute("data-render-count")) - before).toBeLessThanOrEqual(4);
  await page.getByRole("radio", {name:"High",exact:true}).check();
  await settled(page, "development-exhibit");
  await page.getByRole("button", {name:"Reset view",exact:true}).click();
  await expect(canvas(page)).toHaveAttribute("data-active-scene", "hub");
  await expect(canvas(page)).toHaveAttribute("data-camera-preset", "overview");
  await expect(page.getByRole("radio", {name:"High",exact:true})).toBeChecked();
});

test("case study and browser Back restore the stable Development scene safely", async ({ page }) => {
  await enter(page);
  await page.getByRole("button", {name:"Focus Savvyra",exact:true}).click(); await settled(page,"development-exhibit");
  await page.getByRole("link", {name:"Read Savvyra case study",exact:true}).click();
  await expect(page).toHaveURL(/\/projects\/savvyra$/);
  await expect(page.getByRole("heading", {level:1})).toHaveText("Savvyra");
  await page.goBack(); await settled(page);
  await expect(page.getByTestId("studio-directory")).toHaveAttribute("data-scene", "development");
  await expect(page.getByRole("button", {name:"Focus Savvyra",exact:true})).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", {name:"Focus Savvyra",exact:true}).click(); await settled(page,"development-exhibit");
  await canvas(page).evaluate(c => { const gl=(c as HTMLCanvasElement).getContext("webgl2")!;gl.getExtension("WEBGL_lose_context")!.loseContext(); });
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await expect(page.getByRole("link",{name:"Read Savvyra case study",exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Retry 3D preview",exact:true}).click();
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready","true",{timeout:20000});
  await settled(page,"development-exhibit");
});

test("changing motion preference interrupts an actually moving exhibit camera", async ({ page }) => {
  await enter(page);
  await page.exposeBinding("reduceExhibitMotion", () => page.emulateMedia({ reducedMotion: "reduce" }));
  const moving = await page.evaluate(() => new Promise<boolean>(resolve => {
    const c = document.querySelector("canvas")!;
    const observer = new MutationObserver(() => {
      if (c.dataset.cameraMoving !== "true") return;
      observer.disconnect();
      void (window as unknown as { reduceExhibitMotion: () => Promise<void> }).reduceExhibitMotion().then(() => resolve(true));
    });
    observer.observe(c, { attributes: true, attributeFilter: ["data-camera-moving"] });
    const button = Array.from(document.querySelectorAll("button")).find(b => b.textContent === "Focus Savvyra")!;
    button.click();
  }));
  expect(moving).toBe(true);
  await settled(page,"development-exhibit");
  const frame=await canvas(page).getAttribute("data-render-count"); await page.waitForTimeout(750);
  expect(await canvas(page).getAttribute("data-render-count")).toBe(frame);
});

for (const width of [1024,1440]) test(`both Development poses stay bounded and idle in every quality at ${width}px`, async ({page}) => {
  test.setTimeout(90000);
  await page.setViewportSize({width,height:900}); await enter(page);
  for(const quality of ["Low","Medium","High"]) {
    await page.getByRole("radio",{name:quality,exact:true}).check();
    for(const selected of [true,false]) {
      await page.getByRole("button",{name:selected?"Focus Savvyra":"Back to Development overview",exact:true}).click();
      await settled(page,selected?"development-exhibit":"development"); await page.waitForTimeout(500);
      const info=JSON.parse((await canvas(page).getAttribute("data-render-metrics"))!);
      expect(info.graphs).toEqual(["development"]); expect(info.calls).toBeLessThanOrEqual(45); expect(info.triangles).toBeLessThanOrEqual(7000); expect(info.geometries).toBeLessThanOrEqual(45); expect(info.materials).toBeLessThanOrEqual(20); expect(info.textures).toBeLessThanOrEqual(3);
      const frame=await canvas(page).getAttribute("data-render-count"); await page.waitForTimeout(2000);
      expect(await canvas(page).getAttribute("data-render-count")).toBe(frame);
      await expect(canvas(page)).toHaveCount(1);
    }
  }
});

test("mobile and no-JavaScript visitors have the same approved text and native case-study link", async ({browser}) => {
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage(); await page.goto("http://127.0.0.1:3000/");
  await expect(page.getByRole("link",{name:"Read Savvyra case study",exact:true})).toBeVisible();
  const disclosure=page.locator("summary").filter({hasText:"About Savvyra"});
  await disclosure.focus(); await page.keyboard.press("Enter");
  await expect(page.getByText(content.projects[1].summary,{exact:true})).toBeVisible();
  await expect(canvas(page)).toHaveCount(0); await expect(page.getByRole("button",{name:"Focus Savvyra",exact:true})).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.getByRole("link",{name:"Read Savvyra case study",exact:true}).click();
  await expect(page.getByRole("heading",{level:1})).toHaveText("Savvyra"); await context.close();
});
