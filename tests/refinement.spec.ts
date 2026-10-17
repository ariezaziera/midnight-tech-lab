import { expect, test } from "@playwright/test";
import { createRockGeometry } from "../src/components/three/hub/platform";
import { cameraPresets, hotspots } from "../src/lib/scene/interaction-config";
import { hubConfig } from "../src/lib/scene/hub-config";

test("layered rock is deterministic, finite, outward-facing and inside the retained footprint", () => {
  const first = createRockGeometry();
  const second = createRockGeometry();
  expect(Array.from(first.attributes.position.array)).toEqual(Array.from(second.attributes.position.array));
  expect(Array.from(first.attributes.position.array).every(Number.isFinite)).toBe(true);
  const bounds = first.boundingBox!;
  expect(Math.max(Math.abs(bounds.min.x), Math.abs(bounds.max.x), Math.abs(bounds.min.z), Math.abs(bounds.max.z))).toBeLessThanOrEqual(4);
  expect(bounds.min.y).toBeGreaterThanOrEqual(-2.6);
  expect(bounds.max.y).toBeLessThan(0);
  const positions = first.attributes.position;
  const normals = first.attributes.normal;
  expect(positions.getX(0) * normals.getX(0) + positions.getZ(0) * normals.getZ(0)).toBeGreaterThan(0);
  expect(positions.count / 3).toBeLessThanOrEqual(200);
  expect(hubConfig.platform.radius).toBe(4);
  expect(hubConfig.workstation.deskSize).toEqual([3.4, .16, 1.45]);
  first.dispose(); second.dispose();
});

test("refinement keeps bounded rendering cost, all focus targets and demand rest", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByTestId("scene-viewport")).toHaveAttribute("data-scene-ready", "true", { timeout: 20000 });
  const metrics = JSON.parse((await page.getByTestId("scene-viewport").getAttribute("data-scene-metrics"))!);
  expect(metrics.calls).toBeLessThanOrEqual(35);
  expect(metrics.geometries).toBeLessThanOrEqual(35);
  expect(metrics.triangles).toBeLessThanOrEqual(3000);
  expect(metrics.textures).toBe(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const id of ["creator", "projects", "workstation"] as const) {
    await page.getByRole("group", { name: "Studio focus controls" }).getByRole("button", { name: hotspots[id].title }).click();
    await expect(page.locator("canvas")).toHaveAttribute("data-camera-preset", id);
    await expect(page.locator("canvas")).toHaveAttribute("data-camera-moving", "false");
    const diagnostics = JSON.parse((await page.locator("canvas").getAttribute("data-camera-diagnostics"))!);
    expect(diagnostics.nearestHotspot).toBe(id);
    expect(diagnostics.position).toEqual(cameraPresets[id].position);
    expect(diagnostics.clearance).toBeGreaterThan(.3);
  }
  await page.waitForTimeout(500);
  const frames = await page.locator("canvas").getAttribute("data-render-count");
  await page.waitForTimeout(750);
  expect(await page.locator("canvas").getAttribute("data-render-count")).toBe(frames);
});
