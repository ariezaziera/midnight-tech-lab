import type { CameraPose } from "./interaction-config";
import { developmentCamera } from "./scene-registry";

export type ExhibitRequest = { selected: boolean; sequence: number };
export type DevelopmentInteraction = { exhibitEligible: boolean; exhibitRequest: ExhibitRequest; onExhibit: () => void };
export const developmentPoses: Record<"overview" | "exhibit", CameraPose> = {
  overview: developmentCamera,
  exhibit: { position: [2.7, 2.6, 4.2], target: [0, 1.95, -.17], fov: 38, near: .1, far: 40 },
};
export const exhibitBounds = { min: [2.7, 2.6, 4.2], max: [5.6, 4.6, 6.8] };
export const exhibitTransitionMs = 600;
export const exhibitPick = [0, 1.95, -.15] as const;
