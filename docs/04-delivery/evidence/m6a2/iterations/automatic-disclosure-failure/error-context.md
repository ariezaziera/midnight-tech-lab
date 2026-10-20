# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: studio-zones.spec.ts >> twenty round trips retain bounded resources and idle rendering in every bay quality
- Location: tests\studio-zones.spec.ts:213:5

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('canvas')
Expected: "false"
Received: "true"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" locator('canvas') with timeout 5000ms
  - waiting for locator('canvas')
    13 × locator resolved to <canvas width="694" height="440" data-render-count="391" data-camera-moving="true" data-engine="three.js r186" data-original-canvas="true" data-active-scene="development" data-camera-preset="development-exhibit" data-camera-pose="{"position":[5.27770556735525,4.377727977486379,6.511046370732293],"target":[0,1.1055792106939697,-0.018893121913657752],"bounds":{"min":[2.7,2.6,4.2],"max":[5.6,4.6,6.8]}}" data-render-metrics="{"calls":11,"triangles":532,"geometries":11,"textures":1,"materials":9,"programs"…>…</canvas>
       - unexpected value "true"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e3]: Local preview · Placeholder content · Provisional design
  - banner [ref=e4]:
    - link "MIDNIGHT TECH LAB Arieza / Independent creative studio" [ref=e5] [cursor=pointer]:
      - /url: /
      - text: MIDNIGHT TECH LAB
      - generic [ref=e6]: Arieza / Independent creative studio
    - navigation "Main navigation" [ref=e8]:
      - link "Home" [ref=e9] [cursor=pointer]:
        - /url: /
      - link "Projects" [ref=e10] [cursor=pointer]:
        - /url: /projects
      - link "Services" [ref=e11] [cursor=pointer]:
        - /url: /services
      - link "About" [ref=e12] [cursor=pointer]:
        - /url: /about
      - link "Contact" [ref=e13] [cursor=pointer]:
        - /url: /contact
  - main [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e16]:
        - paragraph [ref=e17]: Arieza / Midnight Tech Lab
        - heading "A space for work & ideas." [level=1] [ref=e18]: A space forwork & ideas.
        - paragraph [ref=e19]: A portfolio and independent creative studio, taking shape. Explore the page previews while verified work and personal content are prepared.
        - generic [ref=e20]:
          - link "Explore projects" [ref=e21] [cursor=pointer]:
            - /url: /projects
            - text: Explore projects
            - generic [aria-hidden] [ref=e22]: ↗
          - link "About Arieza" [ref=e23] [cursor=pointer]:
            - /url: /about
            - text: About Arieza
            - generic [aria-hidden] [ref=e24]: ↗
      - region [ref=e25]:
        - generic [ref=e26]:
          - heading "Development Lab — Savvyra" [level=2] [ref=e27]
          - paragraph [ref=e28]: Text-first procedural exhibit · HTML case study is authoritative
        - img "Development Lab. Use the equivalent HTML controls below." [ref=e30]
        - generic [ref=e33]:
          - group "Graphics quality" [ref=e34]:
            - generic [ref=e36]:
              - generic [ref=e37] [cursor=pointer]:
                - radio "Low" [checked] [ref=e38]
                - text: Low
              - generic [ref=e39] [cursor=pointer]:
                - radio "Medium" [ref=e40]
                - text: Medium
              - generic [ref=e41] [cursor=pointer]:
                - radio "High" [ref=e42]
                - text: High
            - paragraph [ref=e43]: Pixel detail only. Low uses less graphics work on high-density screens. Motion preference is separate.
          - generic [ref=e44]:
            - button "Back to Central Hub" [ref=e45]
            - button "Reset view" [ref=e46]
          - region [ref=e47]:
            - heading "Savvyra exhibit controls" [level=3] [ref=e48]
            - paragraph [ref=e49]: Use the exhibit controls and read its HTML explanation below. Escape returns from exhibit focus to Development overview, then to the Central Hub. Reset view returns to hub overview.
            - status [ref=e50]: Savvyra selected.
            - generic [ref=e51]:
              - link "About Arieza" [ref=e52] [cursor=pointer]:
                - /url: /about
                - text: About Arieza
                - generic [aria-hidden] [ref=e53]: ↗
              - link "Browse projects" [ref=e54] [cursor=pointer]:
                - /url: /projects
                - text: Browse projects
                - generic [aria-hidden] [ref=e55]: ↗
        - region [ref=e56]:
          - heading "Savvyra · Development exhibit" [level=3] [ref=e57]
          - paragraph [ref=e58]: Text-first exhibit using an original procedural display marker, not project imagery. The approved HTML case study is the source of project information.
          - button "Enter Development Lab" [ref=e60]
          - region "Savvyra exhibit explanation" [ref=e61]:
            - generic [ref=e62]:
              - button "Focus Savvyra" [active] [pressed] [ref=e63]
              - button "Back to Development overview" [ref=e64]
            - group [ref=e65]:
              - generic "About Savvyra" [ref=e66] [cursor=pointer]
              - heading "Savvyra · Selected" [level=4] [ref=e67]
              - paragraph [ref=e68]: A full-stack personal finance web application that brings salary planning, transactions, savings, commitments, debts, and investments into one connected experience.
              - paragraph [ref=e69]: My Role & Contributions As the solo Full-Stack Developer and UI/UX Designer, I was responsible for the project's design direction, application structure, frontend development, backend integration, and iterative refinement. I incorporated AI-assisted development into my workflow while remaining responsible for reviewing suggestions, making design and technical decisions, integrating functionality, testing, and debugging.
              - paragraph [ref=e70]: Design & Development Approach 01. Organizing Financial Information I structured the application around distinct financial activities while maintaining a central dashboard for an overview of income, expenses, savings, debts, commitments, and investments.
            - link "Read Savvyra case study" [ref=e71] [cursor=pointer]:
              - /url: /projects/savvyra
            - status [ref=e72]: Savvyra selected. Escape returns to Development overview.
          - status [ref=e73]: Scene ready. All portfolio routes remain available.
          - link "Browse Projects" [ref=e74] [cursor=pointer]:
            - /url: /projects
    - generic [ref=e75]:
      - heading "Explore the portfolio" [level=2] [ref=e76]
      - paragraph [ref=e77]: Review work and process through Projects, or start with Services for a potential collaboration. These pages work independently of the studio scene. Approved portfolio work and confirmed offerings are still being prepared.
      - generic [ref=e78]:
        - generic [ref=e79]:
          - paragraph [ref=e80]: "01"
          - heading "Projects" [level=3] [ref=e81]
          - paragraph [ref=e82]: A place for verified work and the process behind it.
          - link "View projects" [ref=e83] [cursor=pointer]:
            - /url: /projects
            - text: View projects
            - generic [aria-hidden] [ref=e84]: ↗
        - generic [ref=e85]:
          - paragraph [ref=e86]: "02"
          - heading "Services" [level=3] [ref=e87]
          - paragraph [ref=e88]: Offerings and scope will appear here once confirmed.
          - link "View services" [ref=e89] [cursor=pointer]:
            - /url: /services
            - text: View services
            - generic [aria-hidden] [ref=e90]: ↗
        - generic [ref=e91]:
          - paragraph [ref=e92]: "03"
          - heading "Contact" [level=3] [ref=e93]
          - paragraph [ref=e94]: Contact details are awaiting verification.
          - link "View contact" [ref=e95] [cursor=pointer]:
            - /url: /contact
            - text: View contact
            - generic [aria-hidden] [ref=e96]: ↗
  - contentinfo [ref=e97]:
    - paragraph [ref=e98]: Midnight Tech Lab / Arieza
    - paragraph [ref=e99]: Work in progress. Authentic content is being prepared.
  - alert [ref=e100]
```

# Test source

```ts
  125 |     } });
  126 |   });
  127 |   await page.goto("/"); await ready(page); await entry(page).click();
  128 |   await expect(directory(page)).toHaveAttribute("data-phase", "failed");
  129 |   await screenshot(page, "development-initialization-failure");
  130 |   await page.evaluate(() => document.documentElement.setAttribute("data-allow-review-allocation", "true"));
  131 |   await page.getByRole("button", { name: "Retry review bay" }).click(); await ready(page, "development");
  132 | });
  133 |
  134 | test("validated bay restores after reload; leaving a pending load keeps the previous stable hub", async ({ page, browser }) => {
  135 |   await page.goto("/"); await ready(page); await entry(page).click(); await ready(page, "development");
  136 |   await page.reload(); await ready(page, "development");
  137 |   await expect(page.locator("#studio-preview-heading")).toHaveText("Development Lab — Savvyra");
  138 |   const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  139 |   const pendingPage = await context.newPage();
  140 |   let release = () => {}; const pending = new Promise<void>(resolve => { release = resolve; });
  141 |   await pendingPage.route(bayChunk(), async route => { await pending; await route.continue().catch(() => {}); });
  142 |   try {
  143 |     await pendingPage.goto("http://127.0.0.1:3000/"); await ready(pendingPage);
  144 |     await pendingPage.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: "Creator ID" }).click();
  145 |     await expect(canvas(pendingPage)).toHaveAttribute("data-camera-preset", "creator");
  146 |     await entry(pendingPage).click(); await expect(directory(pendingPage)).toHaveAttribute("data-phase", "loading");
  147 |     await pendingPage.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About", exact: true }).click();
  148 |     release(); await pendingPage.waitForTimeout(300);
  149 |     await pendingPage.getByRole("link", { name: "Return to studio" }).click(); await ready(pendingPage);
  150 |     await expect(canvas(pendingPage)).toHaveAttribute("data-camera-preset", "creator");
  151 |     expect(await pendingPage.evaluate(key => sessionStorage.getItem(key), sceneKey)).toBe("hub");
  152 |   } finally { release(); await context.close(); }
  153 | });
  154 |
  155 | test("quality changes while loading and context recovery preserve validated scene", async ({ page }) => {
  156 |   let release = () => {}; const pending = new Promise<void>(resolve => { release = resolve; });
  157 |   await page.route(bayChunk(), async route => { await pending; await route.continue().catch(() => {}); });
  158 |   try {
  159 |     await page.goto("/"); await ready(page);
  160 |     await canvas(page).evaluate(c => c.setAttribute("data-original-canvas", "true"));
  161 |     await entry(page).click(); await expect(directory(page)).toHaveAttribute("data-phase", "loading");
  162 |     await page.getByRole("radio", { name: "High", exact: true }).check(); release(); await ready(page, "development");
  163 |     expect((await metrics(page)).dpr).toBe(2);
  164 |     await expect(canvas(page)).toHaveAttribute("data-original-canvas", "true");
  165 |     await canvas(page).evaluate(c => (c as HTMLCanvasElement).getContext("webgl2")!.getExtension("WEBGL_lose_context")!.loseContext());
  166 |     await expect(page.getByTestId("scene-fallback")).toBeVisible();
  167 |     await screenshot(page, "development-context-lost");
  168 |     await page.getByRole("button", { name: "Retry 3D preview" }).click(); await ready(page, "development");
  169 |     expect((await metrics(page)).dpr).toBe(2);
  170 |     await page.setViewportSize({ width: 390, height: 844 });
  171 |     await expect(page.getByTestId("scene-2d")).toBeVisible(); await expect(canvas(page)).toHaveCount(0);
  172 |     await page.setViewportSize({ width: 1024, height: 900 }); await ready(page, "development");
  173 |     expect((await metrics(page)).dpr).toBe(2);
  174 |     await entry(page).focus(); await page.keyboard.press("Escape"); await ready(page);
  175 |   } finally { release(); }
  176 | });
  177 |
  178 | test("scene session rejects invalid IDs, tolerates denial and restores completed route journeys", async ({ page }) => {
  179 |   await page.addInitScript(key => sessionStorage.setItem(key, "media-unapproved"), sceneKey);
  180 |   await page.goto("/"); await ready(page);
  181 |   await page.addInitScript(() => { Storage.prototype.getItem = () => { throw new Error("denied"); }; Storage.prototype.setItem = () => { throw new Error("denied"); }; });
  182 |   await page.reload(); await ready(page); await entry(page).click(); await ready(page, "development");
  183 |   await page.getByTestId("studio-actions").getByRole("link", { name: "Browse projects" }).click();
  184 |   await expect(page).toHaveURL("/projects"); await page.getByRole("link", { name: "Return to studio" }).click();
  185 |   await ready(page, "development"); await expect(page.locator("#studio-preview-heading")).toBeFocused();
  186 |   await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About", exact: true }).click();
  187 |   await page.goBack(); await ready(page, "development");
  188 | });
  189 |
  190 | test("restored bay never loads on mobile/no-JS or blocks unsupported WebGL links", async ({ browser }) => {
  191 |   for (const javaScriptEnabled of [false, true]) {
  192 |     const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled });
  193 |     const page = await context.newPage(); let requests = 0;
  194 |     await page.addInitScript(key => sessionStorage.setItem(key, "development"), sceneKey);
  195 |     await page.route(bayChunk(), route => { requests++; return route.continue(); });
  196 |     await page.goto("http://127.0.0.1:3000/");
  197 |     await expect(page.getByTestId("scene-2d")).toBeVisible(); await expect(entry(page)).toHaveCount(0);
  198 |     await expect(canvas(page)).toHaveCount(0); expect(requests).toBe(0);
  199 |     await page.getByTestId("studio-directory").getByRole("link", { name: "Browse Projects", exact: true }).click();
  200 |     await expect(page).toHaveURL(/\/projects$/); await context.close();
  201 |   }
  202 |   const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  203 |   await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => { document.documentElement.dataset.unsupportedProbe = "true"; return null; }; });
  204 |   await page.goto("http://127.0.0.1:3000/");
  205 |   // Assert recovery from an actual failed capability probe, after client hydration.
  206 |   await page.waitForFunction(() => document.documentElement.dataset.unsupportedProbe === "true", undefined, { timeout: 15000 });
  207 |   await expect(page.getByTestId("scene-fallback")).toBeVisible();
  208 |   await entry(page).click();
  209 |   await page.getByTestId("studio-directory").getByRole("link", { name: "Browse Projects", exact: true }).click();
  210 |   await expect(page).toHaveURL(/\/projects$/); await page.close();
  211 | });
  212 |
  213 | test("twenty round trips retain bounded resources and idle rendering in every bay quality", async ({ page }) => {
  214 |   test.setTimeout(180000);
  215 |   await page.goto("/"); await ready(page);
  216 |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  217 |   const samples = [];
  218 |   let expectedFocus: { calls: number; geometries: number; materials: number; textures: number } | null = null;
  219 |   await canvas(page).evaluate(c => c.setAttribute("data-original-canvas", "true"));
  220 |   for (let cycle = 0; cycle < 20; cycle++) {
  221 |     await entry(page).click(); await ready(page, "development"); await page.waitForTimeout(500);
  222 |     const bay = await metrics(page);
  223 |     await page.getByRole("button", { name: "Focus Savvyra", exact: true }).click();
  224 |     await expect(canvas(page)).toHaveAttribute("data-camera-preset", "development-exhibit");
> 225 |     await expect(canvas(page)).toHaveAttribute("data-camera-moving", "false");
      |                                ^ Error: expect(locator).toHaveAttribute(expected) failed
  226 |     const focus = await metrics(page);
  227 |     expect(focus.calls).toBeLessThanOrEqual(45); expect(focus.triangles).toBeLessThanOrEqual(7000);
  228 |     if (expectedFocus) expect(focus).toMatchObject(expectedFocus);
  229 |     else expectedFocus = { calls: focus.calls, geometries: focus.geometries, materials: focus.materials, textures: focus.textures };
  230 |     expect(bay.calls).toBeLessThanOrEqual(35); expect(bay.triangles).toBeLessThanOrEqual(3000);
  231 |     expect(bay.geometries).toBeLessThanOrEqual(35); expect(bay.materials).toBeLessThanOrEqual(16);
  232 |     expect(bay.textures).toBeLessThanOrEqual(1); expect(bay.lightCount).toBeLessThanOrEqual(4); expect(bay.pointLightCount).toBeLessThanOrEqual(1); expect(bay.shadows).toBe(false);
  233 |     await page.getByRole("button", { name: "Back to Central Hub" }).click(); await ready(page); await page.waitForTimeout(500);
  234 |     const hub = await metrics(page);
  235 |     expect(hub.calls).toBe(30); expect(hub.triangles).toBe(1680); expect(hub.geometries).toBe(30); expect(hub.materials).toBe(15); expect(hub.textures).toBe(1);
  236 |     samples.push({ cycle, bay, hub, focus }); await expect(canvas(page)).toHaveAttribute("data-original-canvas", "true");
  237 |   }
  238 |   await entry(page).click(); await ready(page, "development");
  239 |   for (const label of ["Low", "Medium", "High"]) {
  240 |     await page.getByRole("radio", { name: label, exact: true }).check(); await page.waitForTimeout(500);
  241 |     const frame = await canvas(page).getAttribute("data-render-count"); await page.waitForTimeout(2000);
  242 |     expect(await canvas(page).getAttribute("data-render-count")).toBe(frame);
  243 |   }
  244 |   writeFileSync(`${evidence}/resource-cycles.json`, JSON.stringify({ samples, errors }, null, 2)); expect(errors).toEqual([]);
  245 | });
  246 |
```
