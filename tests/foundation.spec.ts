import { expect, test } from "@playwright/test";

const routes = [
  ["/", "A space for"], ["/projects", "Work, with context."],
  ["/projects/placeholder", "Placeholder case study"], ["/about", "Hello, I’m Arieza."],
  ["/services", "Space for collaboration."], ["/contact", "Let’s connect, soon."],
] as const;

for (const [path, heading] of routes) {
  test(`direct navigation and HTML fallback: ${path}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL: "http://127.0.0.1:3000" });
    const page = await context.newPage();
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link")).toHaveCount(5);
    await page.getByRole("navigation").getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about$/);
    await context.close();
  });
}

for (const path of ["/projects/not-a-project", "/missing-page"]) {
  test(`invalid address returns 404: ${path}`, async ({ page }) => {
    expect((await page.goto(path))?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page isn’t here.");
    await page.getByRole("link", { name: "Return home" }).click();
    await expect(page).toHaveURL("/");
  });
}

test("project journey, current route, no invented contact actions", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore projects" }).click();
  await page.getByRole("link", { name: "View placeholder case study" }).click();
  await expect(page.getByRole("navigation").getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
  await page.getByRole("link", { name: "Back to projects" }).click();
  await expect(page).toHaveURL("/projects");
  await page.getByRole("navigation").getByRole("link", { name: "Contact" }).click();
  await expect(page.locator("form, input, textarea, a[href^='mailto:'], a[href^='tel:'], canvas")).toHaveCount(0);
  await expect(page.locator("main button, main a")).toHaveCount(0);
});

test("keyboard skip link and visible focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  expect(await skip.evaluate(el => getComputedStyle(el).outlineStyle)).toBe("solid");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`responsive routes without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const [path] of routes) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const nav = page.getByRole("navigation");
      for (const link of await nav.getByRole("link").all()) {
        await expect(link).toBeVisible();
        expect((await link.boundingBox())?.height).toBeGreaterThanOrEqual(44);
      }
      expect(await page.locator("main").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
    }
  });
}

test("200 percent text enlargement remains readable without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("capture desktop and mobile route evidence", async ({ page }) => {
  for (const [label, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]] as const) {
    await page.setViewportSize({ width, height });
    for (const [path] of routes) {
      await page.goto(path);
      if (path === "/" && width >= 768) await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true", { timeout: 15000 });
      await page.screenshot({ path: `docs/04-delivery/evidence/m2/${label}-${path === "/" ? "home" : path.slice(1).replaceAll("/", "-")}.png`, fullPage: path !== "/" || width < 768 });
    }
  }
});
