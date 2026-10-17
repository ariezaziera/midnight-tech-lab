/** Pixel density only: never change composition, motion policy or renderer identity. */
export const qualityIds = ["low", "medium", "high"] as const;
export type GraphicsQuality = typeof qualityIds[number];
export const defaultQuality: GraphicsQuality = "low";
export const qualityPolicy: Record<GraphicsQuality, { label: string; dpr: [number, number] }> = {
  low: { label: "Low", dpr: [1, 1] },
  medium: { label: "Medium", dpr: [1, 1.5] },
  high: { label: "High", dpr: [1, 2] },
};
