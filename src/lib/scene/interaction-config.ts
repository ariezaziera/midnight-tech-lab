import type { Vec3 } from "./hub-config";

export const hotspotIds = ["creator", "projects", "workstation"] as const;
export type HotspotId = typeof hotspotIds[number];
export type CameraPresetId = "overview" | HotspotId;
export type CameraPose = { position: Vec3; target: Vec3; fov: number; near: number; far: number };
export type CameraRequest = { preset: CameraPresetId; sequence: number };

export const cameraPresets: Record<CameraPresetId, CameraPose> = {
  overview: { position: [8, 7, 10], target: [0, 0.25, 0], fov: 38, near: 0.1, far: 60 },
  creator: { position: [-5, 3.5, 4.5], target: [-2.6, 1.36, -0.8], fov: 38, near: 0.1, far: 60 },
  projects: { position: [-5, 3.5, 7], target: [-2.4, 1.81, 1.7], fov: 38, near: 0.1, far: 60 },
  workstation: { position: [1, 4.5, 6.5], target: [0.25, 1.95, -0.65], fov: 38, near: 0.1, far: 60 },
};

export const cameraBounds = { min: [-6, 3.2, 4] as Vec3, max: [9, 8.5, 11] as Vec3, minFov: 35, maxFov: 45 };
export const transitionConfig = { durationMs: 1000, waypoint: [0, 8, 9] as Vec3 };

type Hotspot = { title: string; description: string; href?: "/about" | "/projects"; action?: string; pickPoint: Vec3; bounds: { center: Vec3; size: Vec3 } };
export const hotspots: Record<HotspotId, Hotspot> = {
  creator: { title: "Creator ID", description: "A neutral portrait placeholder. Read about Arieza on the About page.", href: "/about", action: "About Arieza", pickPoint: [-2.6, 1.36, -0.65], bounds: { center: [-2.6, 1.36, -0.8], size: [1.4, 2.5, 0.8] } },
  projects: { title: "Project Display", description: "Project artwork is awaiting approval. Browse the project library without a featured-project claim.", href: "/projects", action: "Browse projects", pickPoint: [-2.4, 1.81, 1.8], bounds: { center: [-2.4, 1.55, 1.7], size: [1.7, 2.2, 0.9] } },
  workstation: { title: "Workstation", description: "Inspect the desk and twin monitors. Return to the overview whenever you are ready.", pickPoint: [0.72, 2.16, -0.31], bounds: { center: [0, 1.5, -0.65], size: [3.8, 2.7, 1.9] } },
};

export function isHotspotId(value: unknown): value is HotspotId { return hotspotIds.some(id => id === value); }
export function isCameraPresetId(value: unknown): value is CameraPresetId { return value === "overview" || isHotspotId(value); }

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
function mixVector(a: Vec3, b: Vec3, t: number): Vec3 { return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]; }

/** Two exterior legs, easing to rest at the elevated waypoint; never cut through the hub. */
export function transitionPose(start: CameraPose, end: CameraPose, progress: number): CameraPose {
  const t = Math.min(1, Math.max(0, progress));
  const position = t < 0.5 ? mixVector(start.position, transitionConfig.waypoint, smooth(t * 2)) : mixVector(transitionConfig.waypoint, end.position, smooth((t - 0.5) * 2));
  return {
    position: position.map((value, axis) => Math.min(cameraBounds.max[axis], Math.max(cameraBounds.min[axis], value))) as Vec3,
    target: mixVector(start.target, end.target, smooth(t)),
    fov: Math.min(cameraBounds.maxFov, Math.max(cameraBounds.minFov, mix(start.fov, end.fov, smooth(t)))),
    near: end.near, far: end.far,
  };
}
