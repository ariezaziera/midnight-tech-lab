import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProjectLibrary, CaseStudyPage } from "../src/components/editorial/portfolio";
import { content } from "../src/content/editorial";
import type { EditorialContent, Project } from "../src/content/model";
import { validateContent, projectForRoute, projectSelection, isPublished } from "../src/lib/content";

// Synthetic, test-only contract data. Never imported by an application route.
const approval = { source: "Test harness contract assertion; NOT owner approval for real content", ownerVerified: true, publicPresentationApproved: true } as const;
const fixture: Project = {
  slug: "test-template", title: "Test-only template record", summary: "Synthetic test data, not portfolio work.",
  status: "published", approval, categoryIds: ["test-category"], role: "Test-only role field", tools: ["Test-only tool field"],
  caseStudy: { overview: "Test overview field", problem: "Test problem field", contribution: "Test contribution field", process: ["Test process field"], solution: "Test solution field", outcomes: [{ text: "Test-only verified-field contract", approval }] },
  media: [], links: [], relatedSlugs: [],
};
const dataset: EditorialContent = { categories: [{ id: "test-category", label: "Test category" }], projects: [fixture, { ...fixture, slug: "draft-test", status: "draft", approval: undefined }], profile: [], services: [], contacts: [] };

test("content approval, required fields and broken-reference guards", () => {
  expect(() => validateContent(content)).not.toThrow();
  expect(() => validateContent(dataset)).not.toThrow();
  expect(content.projects.filter(isPublished).map(p => p.slug)).toEqual(["savvyra"]);
  expect(projectForRoute(dataset, "draft-test")).toBeUndefined();
  expect(projectForRoute(content, "placeholder")?.status).toBe("placeholder");
  for (const project of [
    { ...fixture, approval: undefined }, { ...fixture, role: undefined },
    { ...fixture, categoryIds: ["missing"] }, { ...fixture, relatedSlugs: ["missing"] },
    { ...fixture, links: [{ label: "Unsafe", href: "javascript:alert(1)", approval }] },
    { ...fixture, media: [{ src: "/missing.png", width: 0, height: 0, alt: "", rights: "", provenance: "", approval }] },
    { ...fixture, caseStudy: { ...fixture.caseStudy, outcomes: [{ text: "Unverified", approval: { ...approval, source: "" } }] } },
  ]) expect(() => validateContent({ ...dataset, projects: [project] })).toThrow();
});

test("published fixture filtering and reusable template render, outside app routes", async ({ page }) => {
  expect(projectSelection(dataset).projects).toHaveLength(1);
  expect(projectSelection(dataset, "missing").projects).toHaveLength(0);
  await page.setContent(renderToStaticMarkup(createElement(ProjectLibrary, { data: dataset, category: "test-category" })));
  await expect(page.getByRole("link", { name: "Test category" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Read Test-only template record" })).toHaveAttribute("href", "/projects/test-template");
  await page.setContent(renderToStaticMarkup(createElement(CaseStudyPage, { project: fixture, data: dataset })));
  for (const title of ["Overview", "Context & problem", "Role & responsibilities", "Tools & technologies", "Process & decisions", "Solution & deliverables", "Verified outcomes"]) await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  await expect(page.getByText("Test overview field")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Media gallery" })).toHaveCount(0);
});

test("published library and empty URL filter work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/projects?category=missing");
  await expect(page.getByRole("heading", { name: "No projects match this filter." })).toBeVisible();
  await page.getByRole("link", { name: "Clear filters" }).click();
  await expect(page.getByRole("link", { name: "Read Savvyra", exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Project filters" }).getByRole("link")).toHaveCount(2);
  await page.getByRole("link", { name: "View placeholder case study" }).click();
  await expect(page.getByText("Local layout preview / Not a real project")).toBeVisible();
  await page.getByRole("link", { name: "About Arieza", exact: true }).click();
  await page.getByRole("link", { name: "Contact information", exact: true }).click();
  await expect(page.getByText("There is currently no way", { exact: false })).toBeVisible();
  await context.close();
});

test("client journey works without WebGL", async ({ page }) => {
  await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  await page.goto("/");
  await page.getByRole("link", { name: "View services" }).click();
  await page.getByRole("link", { name: "Explore relevant projects" }).click();
  await expect(page.getByRole("link", { name: "Read Savvyra", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Contact information", exact: true }).click();
  await expect(page.locator("form, input, textarea, a[href^='mailto:'], a[href^='tel:']")).toHaveCount(0);
});

test("prototype metadata and unapproved slugs stay restricted", async ({ page }) => {
  for (const route of ["/", "/projects", "/projects/placeholder", "/projects/savvyra", "/about", "/services", "/contact"]) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
  }
  await page.goto("/projects/placeholder");
  await expect(page).toHaveTitle(/Local placeholder/);
  for (const slug of ["draft-test", "test-template", "optima-bank", "markerless-ar-melaka"]) expect((await page.goto(`/projects/${slug}`))?.status()).toBe(404);
});

test("keyboard filter, selected state and draft evidence", async ({ page }) => {
  await page.goto("/projects?category=missing");
  const clear = page.getByRole("link", { name: "Clear filters" });
  await clear.focus();
  expect(await clear.evaluate(el => getComputedStyle(el).outlineStyle)).toBe("solid");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("link", { name: "All projects", exact: true })).toHaveAttribute("aria-current", "page");
  for (const [label, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("/projects?category=missing");
    await page.screenshot({ path: `docs/04-delivery/evidence/m6a1/after/${label}-empty-filter.png`, fullPage: true });
    await page.goto("/about");
    await expect(page.getByText("Draft · awaiting owner input")).toHaveCount(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("client HTML journey with JavaScript disabled on mobile", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await page.getByRole("link", { name: "View services" }).click();
  await page.getByRole("link", { name: "Explore relevant projects" }).click();
  await page.getByRole("link", { name: "Contact information", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Let’s connect, soon.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

// Approved textual source, not synthetic project data or a runtime content loader.
const packet = readFileSync("docs/04-delivery/SAVVYRA_CONTENT_PACKET_V1.md", "utf8");
const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
const approvedLines = packet.split(/\r?\n/).map(line => line.replace(/\*\*/g, "").replace(/^- /, "").trim()).filter(line => line && !line.startsWith("#") && !/^(Category|Project Type|Role):/.test(line));

test("zero-published, draft and other-placeholder exclusions remain isolated guarantees", async ({ page }) => {
  const empty: EditorialContent = { ...dataset, projects: dataset.projects.map(p => ({ ...p, status: "draft", approval: undefined })) };
  expect(() => validateContent(empty)).not.toThrow();
  expect(projectSelection(empty).projects).toHaveLength(0);
  expect(projectSelection(empty).categories).toHaveLength(0);
  expect(projectForRoute(empty, "test-template")).toBeUndefined();
  const placeholder = { ...fixture, slug: "other-placeholder", status: "placeholder" as const, approval: undefined };
  expect(projectForRoute({ ...dataset, projects: [placeholder] }, placeholder.slug)).toBeUndefined();
  await page.setContent(renderToStaticMarkup(createElement(ProjectLibrary, { data: empty })));
  await expect(page.getByRole("heading", { name: "No approved projects yet." })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Project filters" }).getByRole("link")).toHaveCount(1);
});

test("Savvyra exact packet, approval metadata and empty media/link contract", async ({ page }) => {
  const project = projectForRoute(content, "savvyra")!;
  expect(project).toMatchObject({ title: "Savvyra", status: "published", projectType: "Solo Personal Project", role: "Full-Stack Developer & UI/UX Designer", categoryIds: ["development"], media: [], links: [], relatedSlugs: [] });
  expect(projectSelection(content, "development").projects).toEqual([project]);
  expect(projectSelection(content).categories).toEqual([{ id: "development", label: "Development" }]);
  for (const invalid of [undefined, { ...approval, source: " " }, { ...approval, ownerVerified: false }, { ...approval, publicPresentationApproved: false }]) {
    const rejected = { ...project, approval: invalid } as unknown as Project;
    expect(isPublished(rejected)).toBe(false);
    expect(() => validateContent({ ...content, projects: [rejected] })).toThrow();
    expect(projectForRoute({ ...content, projects: [rejected] }, "savvyra")).toBeUndefined();
  }
  expect((await page.goto("/projects/savvyra"))?.status()).toBe(200);
  await expect(page).toHaveTitle(/Savvyra/);
  const text = normalize(await page.locator("main").innerText());
  for (const line of approvedLines) expect(text).toContain(normalize(line));
  await expect(page.getByText("Solo Personal Project", { exact: true })).toBeVisible();
  await expect(page.locator("main img, main canvas, main a[href^='https:'], main a[href^='http:']")).toHaveCount(0);
  for (const title of ["Media gallery", "Project links", "Template preview only"]) await expect(page.getByRole("heading", { name: title, exact: true })).toHaveCount(0);
  expect(text).not.toContain("MongoDB");
});

test("Savvyra keyboard discovery, native Development filter and separate template", async ({ page }) => {
  await page.goto("/projects");
  const filter = page.getByRole("link", { name: "Development", exact: true });
  await filter.focus();
  expect(await filter.evaluate(el => getComputedStyle(el).outlineStyle)).toBe("solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/category=development$/);
  await expect(page.getByRole("link", { name: "Development", exact: true })).toHaveAttribute("aria-current", "page");
  const published = page.locator("section").filter({ has: page.getByRole("heading", { name: "Published work", exact: true }) });
  await expect(published.getByRole("article")).toHaveCount(1);
  await expect(published.getByRole("link", { name: "Read Savvyra", exact: true })).toBeVisible();
  await expect(page.getByText("Local placeholder · not real work", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Read Savvyra", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Savvyra");
  await page.getByRole("link", { name: "Back to projects", exact: true }).click();
  await page.getByRole("link", { name: "View placeholder case study" }).click();
  await expect(page.getByRole("heading", { name: "Template preview only", exact: true })).toBeVisible();
});

test("Savvyra server-rendered responsive journey needs no JavaScript or scene requests", async ({ browser }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: width === 1440 ? 900 : 844 } });
    const page = await context.newPage();
    const requests: string[] = [];
    page.on("request", request => requests.push(request.url()));
    await page.goto("http://127.0.0.1:3000/projects");
    await page.getByRole("link", { name: "Development", exact: true }).click();
    await page.getByRole("link", { name: "Read Savvyra", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Savvyra");
    const text = normalize(await page.locator("main").innerText());
    for (const line of approvedLines) expect(text).toContain(normalize(line));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    await expect(page.locator("main img, canvas")).toHaveCount(0);
    expect(requests.filter(url => /\.(glb|gltf|png|jpe?g|webp)(?:[?]|$)/i.test(url))).toEqual([]);
    await page.getByRole("link", { name: "Back to projects", exact: true }).click();
    await expect(page.getByRole("link", { name: "Read Savvyra", exact: true })).toBeVisible();
    await context.close();
  }
});
