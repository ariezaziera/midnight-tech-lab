export type Vec3 = [number, number, number];
export type Surface = "rock" | "platform" | "edge" | "desk" | "metal" | "trim" | "screen" | "violet" | "cyan" | "amber" | "neutral" | "upholstery";
type HubConfig = {
  platform: { radius: number; depth: number; segments: number; strata: readonly { y: number; radius: number; twist: number }[] };
  workstation: { position: Vec3; deskSize: Vec3 };
  zones: { creator: Vec3; project: Vec3; console: Vec3; globe: Vec3 };
  colors: Record<Surface, string>; background: string;
};
/** M5-A procedural refinement. Footprint and interaction centers retained; density policy lives in quality-config. */
export const hubConfig: HubConfig = {
  platform: { radius: 4, depth: .32, segments: 12, strata: [
    { y: -.19, radius: 3.94, twist: 0 }, { y: -.62, radius: 3.82, twist: .035 },
    { y: -.8, radius: 3.65, twist: .02 }, { y: -1.34, radius: 3.55, twist: -.025 },
    { y: -1.51, radius: 3.1, twist: -.01 }, { y: -2.04, radius: 2.25, twist: .045 },
    { y: -2.45, radius: .55, twist: .08 },
  ] },
  workstation: { position: [0, .16, -.65], deskSize: [3.4, .16, 1.45] },
  zones: { creator: [-2.6, .16, -.8], project: [-2.4, .16, 1.7], console: [2.55, .16, .4], globe: [2.4, .16, -1.65] },
  colors: { rock: "#242331", platform: "#303047", edge: "#8063ac", desk: "#75503a", metal: "#30384a", trim: "#666779", screen: "#0b1220", violet: "#8470ad", cyan: "#4499ad", amber: "#eab773", neutral: "#9295a1", upholstery: "#302d42" },
  background: "#0b1024",
};
export type SceneMetrics = { calls: number; triangles: number; geometries: number; textures: number; frames: number; renderer: string; lightCount: number; pointLightCount: number; shadows: boolean; alpha: boolean };
