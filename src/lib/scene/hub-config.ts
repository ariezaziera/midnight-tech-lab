export type Vec3 = [number, number, number];
export type Surface = "rock" | "platform" | "edge" | "desk" | "metal" | "screen" | "violet" | "cyan" | "amber" | "neutral";

type HubConfig = {
  platform: { radius: number; depth: number; segments: number };
  workstation: { position: Vec3; deskSize: Vec3 };
  zones: { creator: Vec3; project: Vec3; console: Vec3; globe: Vec3 };
  colors: Record<Surface, string>;
  background: string;
  dpr: [number, number];
};

/** M2 spatial estimates in nominal meters, +Y up. Not final art or camera approval. */
export const hubConfig: HubConfig = {
  platform: { radius: 4, depth: 0.32, segments: 12 },
  workstation: { position: [0, 0.16, -0.65], deskSize: [3.4, 0.16, 1.45] },
  zones: { creator: [-2.6, 0.16, -0.8], project: [-2.4, 0.16, 1.7], console: [2.55, 0.16, 0.4], globe: [2.4, 0.16, -1.65] },
  colors: {
    rock: "#323248", platform: "#58516c", edge: "#a78bfa", desk: "#8e6956",
    metal: "#272c40", screen: "#111b30", violet: "#c4b5fd", cyan: "#67cddd",
    amber: "#fbbf70", neutral: "#a8adbd",
  },
  background: "#0b1024",
  dpr: [1, 1.5],
};

export type SceneMetrics = { calls: number; triangles: number; geometries: number; textures: number; frames: number; renderer: string };
