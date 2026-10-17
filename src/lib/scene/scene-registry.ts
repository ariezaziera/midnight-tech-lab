import type { CameraPose } from "./interaction-config";

export const sceneIds = ["hub", "development"] as const;
export type SceneId = typeof sceneIds[number];
export type SceneRequest = { id: SceneId; sequence: number };
export type ScenePhase = "loading" | "ready" | "failed" | "cancelled";
export type SceneEvent = { request: SceneRequest; phase: ScenePhase; readyMs?: number; message?: string };
export const sceneRegistry = {
  hub: { title: "Central Hub / Spatial prototype" },
  development: { title: "Development Lab — Technical Review Placeholder" },
} satisfies Record<SceneId, { title: string }>;
export const isSceneId = (value: unknown): value is SceneId => sceneIds.some(id => id === value);
export const developmentCamera: CameraPose = { position: [5.6, 4.6, 6.8], target: [0, 1, 0], fov: 38, near: .1, far: 40 };
export const developmentBounds = { min: [5, 4, 6], max: [6, 5, 7] } as const;
