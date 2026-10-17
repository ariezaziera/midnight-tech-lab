import type { Surface, Vec3 } from "./hub-config";

type FixedLight = { position: Vec3; color: string; intensity: number };
type StudioLighting = {
  fill: { sky: string; ground: string; intensity: number };
  key: FixedLight; rim: FixedLight;
  lamp: FixedLight & { distance: number; decay: number };
};
/** Four fixed lights, no shadows, no camera-dependent or animated lighting. */
export const lightingConfig: StudioLighting = {
  fill: { sky: "#b5b4db", ground: "#7889af", intensity: 1.65 },
  key: { position: [3, 6, 4], color: "#ffd8ac", intensity: 2.2 },
  rim: { position: [-4, 2, -3], color: "#8c8be0", intensity: 2.8 },
  // Position is local to the retained workstation group.
  lamp: { position: [1.4, 2.15, -.3], color: "#ffc77a", intensity: 8, distance: 3.5, decay: 2 },
};

type MaterialResponse = { roughness: number; metalness: number; emissiveIntensity: number };
export const materialResponse: Record<Surface, MaterialResponse> = {
  rock: { roughness: 1, metalness: 0, emissiveIntensity: 0 },
  platform: { roughness: .95, metalness: .02, emissiveIntensity: 0 },
  edge: { roughness: .9, metalness: .05, emissiveIntensity: .28 },
  desk: { roughness: .72, metalness: 0, emissiveIntensity: 0 },
  metal: { roughness: .72, metalness: .2, emissiveIntensity: 0 },
  trim: { roughness: .78, metalness: .15, emissiveIntensity: 0 },
  screen: { roughness: 1, metalness: 0, emissiveIntensity: 0 },
  violet: { roughness: .9, metalness: .05, emissiveIntensity: .22 },
  cyan: { roughness: .95, metalness: 0, emissiveIntensity: .15 },
  amber: { roughness: .9, metalness: 0, emissiveIntensity: .4 },
  neutral: { roughness: .88, metalness: 0, emissiveIntensity: 0 },
  upholstery: { roughness: 1, metalness: 0, emissiveIntensity: 0 },
};
