# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: studio-zones.spec.ts >> scene session rejects invalid IDs, tolerates denial and restores completed route journeys
- Location: tests\studio-zones.spec.ts:178:5

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('scene-viewport')
Expected: "true"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" getByTestId('scene-viewport') with timeout 20000ms
  - waiting for getByTestId('scene-viewport')

```

```yaml
- link "Skip to content":
  - /url: "#main-content"
- text: Local preview · Placeholder content · Provisional design
- banner:
  - link "MIDNIGHT TECH LAB Arieza / Independent creative studio":
    - /url: /
  - navigation "Main navigation":
    - link "Home":
      - /url: /
    - link "Projects":
      - /url: /projects
    - link "Services":
      - /url: /services
    - link "About":
      - /url: /about
    - link "Contact":
      - /url: /contact
  - link "Return to studio":
    - /url: /#studio-preview-heading
- main:
  - paragraph: 01 / Projects
  - heading "Work, with context." [level=1]
  - paragraph: A library for approved work, its process and the contribution behind it.
  - navigation "Project filters":
    - link "All projects":
      - /url: /projects
    - link "Development":
      - /url: /projects?category=development
  - heading "Published work" [level=2]
  - article:
    - paragraph: Published project
    - heading "Savvyra" [level=3]
    - paragraph: A full-stack personal finance web application that brings salary planning, transactions, savings, commitments, debts, and investments into one connected experience.
    - list "Project categories":
      - listitem: Development
    - link "Read Savvyra":
      - /url: /projects/savvyra
  - region "Explore the template":
    - heading "Explore the template" [level=2]
    - paragraph: "Separate from the portfolio: this local demonstration contains no actual project claims."
    - article:
      - paragraph: Local placeholder · not real work
      - heading "Placeholder case study" [level=3]
      - paragraph: A local template preview, not real portfolio or client work.
      - list "Project categories":
        - listitem: Layout preview
      - link "View placeholder case study":
        - /url: /projects/placeholder
  - heading "Continue the conversation" [level=2]
  - paragraph: Explore the studio background or check the status of contact information.
  - link "About Arieza":
    - /url: /about
  - link "Contact information":
    - /url: /contact
- contentinfo:
  - paragraph: Midnight Tech Lab / Arieza
  - paragraph: Work in progress. Authentic content is being prepared.
- alert: Projects | Midnight Tech Lab
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | import { readdirSync, readFileSync, writeFileSync } from "node:fs";
  3   | import { join } from "node:path";
  4   |
  5   | const evidence = "docs/04-delivery/evidence/m6a2/after";
  6   | const sceneKey = "midnight-tech-lab:stable-scene:v1";
  7   | test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  8   | const entry = (page: Page) => page.getByRole("button", { name: "Enter Development Lab" });
  9   | const directory = (page: Page) => page.getByTestId("studio-directory");
  10  | const canvas = (page: Page) => page.locator("canvas");
  11  | async function metrics(page: Page) { return JSON.parse((await canvas(page).getAttribute("data-render-metrics"))!); }
  12  | async function ready(page: Page, id = "hub") {
> 13  |   await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true", { timeout: 20000 });
      |                                                    ^ Error: expect(locator).toHaveAttribute(expected) failed
  14  |   await expect(directory(page)).toHaveAttribute("data-phase", "ready");
  15  |   await expect(canvas(page)).toHaveAttribute("data-active-scene", id);
  16  |   await expect(canvas(page)).toHaveCount(1);
  17  |   expect((await metrics(page)).graphs).toEqual([id]);
  18  | }
  19  | function bayChunk() {
  20  |   const root = join(process.cwd(), ".next/static/chunks");
  21  |   const file = readdirSync(root, { recursive: true }).map(String).find(file => file.endsWith(".js") && readFileSync(join(root, file), "utf8").includes("DevelopmentTechnicalReviewBay"));
  22  |   if (!file) throw new Error("Development lazy chunk missing");
  23  |   return `**/_next/static/chunks/${file.replaceAll("\\", "/")}`;
  24  | }
  25  | async function screenshot(page: Page, name: string) {
  26  |   await page.locator("#studio-preview-heading").evaluate(el => scrollTo(0, el.getBoundingClientRect().top + scrollY - 30));
  27  |   await page.screenshot({ path: `${evidence}/${name}.png` });
  28  | }
  29  |
  30  | test("lazy bay uses one existing Canvas, keyboard focus and original hub restoration", async ({ page }) => {
  31  |   let requests = 0;
  32  |   await page.route(bayChunk(), route => { requests++; return route.continue(); });
  33  |   await page.goto("/"); await ready(page);
  34  |   expect(requests).toBe(0);
  35  |   await page.emulateMedia({ reducedMotion: "reduce" });
  36  |   await page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: "Creator ID" }).click();
  37  |   await expect(canvas(page)).toHaveAttribute("data-camera-preset", "creator");
  38  |   await expect(canvas(page)).toHaveAttribute("data-camera-moving", "false");
  39  |   await canvas(page).evaluate(c => c.setAttribute("data-original-canvas", "true"));
  40  |   const history = await page.evaluate(() => window.history.length);
  41  |   await entry(page).focus(); await page.keyboard.press("Enter"); await ready(page, "development");
  42  |   expect(requests).toBe(1);
  43  |   await expect(page.getByRole("heading", { name: "Development Lab — Savvyra", exact: true })).toBeFocused();
  44  |   await expect(canvas(page)).toHaveAttribute("data-original-canvas", "true");
  45  |   expect(await page.evaluate(() => window.history.length)).toBe(history);
  46  |   await expect(page).toHaveURL("/");
  47  |   await expect(page.getByRole("group", { name: "Studio focus controls" })).toHaveCount(0);
  48  |   await screenshot(page, "development-keyboard");
  49  |   await page.getByRole("button", { name: "Back to Central Hub" }).click(); await ready(page);
  50  |   await expect(entry(page)).toBeFocused();
  51  |   await expect(canvas(page)).toHaveAttribute("data-camera-preset", "creator");
  52  |   await expect(canvas(page)).toHaveAttribute("data-original-canvas", "true");
  53  |   await entry(page).click(); await ready(page, "development");
  54  |   await page.getByRole("button", { name: "Reset view" }).click(); await ready(page);
  55  |   await expect(canvas(page)).toHaveAttribute("data-camera-preset", "overview");
  56  |   expect(await page.evaluate(key => sessionStorage.getItem(key), sceneKey)).toBe("hub");
  57  |   await entry(page).click(); await ready(page, "development");
  58  |   const resetStoredScene = await page.evaluate(key => {
  59  |     Array.from(document.querySelectorAll("button")).find(button => button.textContent === "Reset view")!.click();
  60  |     const value = sessionStorage.getItem(key);
  61  |     (document.querySelector('nav[aria-label="Main navigation"] a[href="/about"]') as HTMLAnchorElement).click();
  62  |     return value;
  63  |   }, sceneKey);
  64  |   expect(resetStoredScene).toBeNull();
  65  |   await expect(page).toHaveURL("/about"); await page.getByRole("link", { name: "Return to studio" }).click();
  66  |   await ready(page); await expect(canvas(page)).toHaveAttribute("data-camera-preset", "overview");
  67  | });
  68  |
  69  | test("cancelled and rapid stale loads cannot replace the restored hub", async ({ page }) => {
  70  |   let release = () => {};
  71  |   const pending = new Promise<void>(resolve => { release = resolve; });
  72  |   await page.route(bayChunk(), async route => { await pending; await route.continue().catch(() => {}); });
  73  |   try {
  74  |     await page.goto("/"); await ready(page);
  75  |     await entry(page).click(); await expect(directory(page)).toHaveAttribute("data-phase", "loading");
  76  |     await screenshot(page, "development-loading");
  77  |     await entry(page).focus(); await page.keyboard.press("Escape"); await ready(page);
  78  |     await expect(page.getByTestId("scene-notice")).toContainText("cancelled");
  79  |     await expect(entry(page)).toBeFocused();
  80  |     await entry(page).click(); await expect(directory(page)).toHaveAttribute("data-phase", "loading");
  81  |     await page.evaluate(() => {
  82  |       for (let i = 0; i < 6; i++) (document.querySelector('[data-testid="studio-directory"] button') as HTMLButtonElement).click();
  83  |       Array.from(document.querySelectorAll("button")).find(button => button.textContent === "Back to Central Hub")!.click();
  84  |     });
  85  |     await ready(page); release(); await page.waitForTimeout(700);
  86  |     await ready(page); expect(await page.evaluate(key => sessionStorage.getItem(key), sceneKey)).toBe("hub");
  87  |     await screenshot(page, "development-cancelled");
  88  |     await entry(page).click(); await ready(page, "development");
  89  |   } finally { release(); }
  90  | });
  91  |
  92  | test("failed Development download has understandable retry without broken HTML", async ({ page }) => {
  93  |   const pattern = bayChunk();
  94  |   await page.route(pattern, route => route.abort("failed"));
  95  |   await page.goto("/"); await ready(page);
  96  |   await entry(page).click(); await expect(directory(page)).toHaveAttribute("data-phase", "failed");
  97  |   await expect(page.getByTestId("scene-notice")).toContainText("could not initialize or download");
  98  |   await screenshot(page, "development-download-failure");
  99  |   await expect(page.getByTestId("studio-actions").getByRole("link", { name: "Browse projects" })).toHaveAttribute("href", "/projects");
  100 |   await page.unroute(pattern); await page.getByRole("button", { name: "Retry review bay" }).click(); await ready(page, "development");
  101 | });
  102 |
  103 | test("per-scene watchdog rejects late completion and remains cancellable", async ({ page }) => {
  104 |   test.setTimeout(45000);
  105 |   let release = () => {}; const pending = new Promise<void>(resolve => { release = resolve; });
  106 |   const pattern = bayChunk();
  107 |   await page.route(pattern, async route => { await pending; await route.continue().catch(() => {}); });
  108 |   try {
  109 |     await page.goto("/"); await ready(page); await entry(page).click();
  110 |     await expect(directory(page)).toHaveAttribute("data-phase", "failed", { timeout: 20000 });
  111 |     await expect(page.getByTestId("scene-notice")).toContainText("took too long");
  112 |     release(); await page.waitForTimeout(500);
  113 |     await expect(directory(page)).toHaveAttribute("data-phase", "failed");
```
