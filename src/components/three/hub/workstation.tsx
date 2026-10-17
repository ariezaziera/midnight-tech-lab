import { hubConfig } from "@/lib/scene/hub-config";
import { StaticParts, box, monitor, selectionCorners, type Part } from "./primitives";

const furniture: Part[] = [
  box([0, 1.18, 0], hubConfig.workstation.deskSize, "desk", "chamfer"),
  box([0, 1.075, 0], [3.22, .06, 1.28], "metal", "chamfer"),
  ...[-1.4, 1.4].flatMap(x => [box([x, .56, 0], [.12, 1.04, .9]), box([x, .06, 0], [.5, .1, 1.1], "metal", "chamfer")]),
  box([0, .8, -.57], [2.8, .12, .08], "trim"),
  ...monitor([-.72, 2, -.25]), ...monitor([.72, 2, -.25], 1.2, .75, "violet"),
  box([0, 1.278, .28], [1.65, .025, .62], "upholstery", "chamfer"),
  box([-.18, 1.31, .32], [1.04, .045, .33], "metal", "chamfer"),
  ...[0, 1, 2].map(row => box([-.18, 1.338, .22 + row * .085], [.85, .012, .035], "neutral")),
  box([.65, 1.32, .35], [.17, .07, .26], "trim", "chamfer"),
  // Chair: shaped seat/back, arms, stem and five low-profile spokes.
  box([0, .71, 1.6], [.86, .17, .8], "upholstery", "chamfer"),
  box([0, 1.25, 1.94], [.82, .95, .14], "upholstery", "panel", [-.08, 0, 0]),
  box([0, 1.76, 1.96], [.5, .22, .15], "upholstery", "panel"),
  ...[-.49, .49].flatMap(x => [box([x, .85, 1.72], [.055, .35, .055], "trim"), box([x, 1.03, 1.58], [.12, .07, .43], "metal", "chamfer")]),
  box([0, .34, 1.6], [.12, .55, .12], "trim", "cylinder"),
  ...Array.from({ length: 5 }, (_, i) => { const angle = i * Math.PI * 2 / 5; return box([Math.sin(angle) * .25, .09, 1.6 + Math.cos(angle) * .25], [.07, .08, .6], "metal", "box", [0, angle, 0]); }),
  // Lamp retains the existing light position/output; only its construction changes.
  box([1.4, 1.3, -.4], [.36, .065, .34], "metal", "chamfer"),
  box([1.4, 1.8, -.4], [.045, 1, .045], "trim"),
  box([1.44, 2.28, -.4], [.16, .045, .045], "trim"),
  box([1.48, 2.37, -.4], [.5, .25, .5], "metal", "cone"),
  box([1.48, 2.25, -.4], [.36, .02, .36], "amber", "cylinder"),
];
const selection = [...selectionCorners([-.72, 2, -.15], 1.27, .82), ...selectionCorners([.72, 2, -.15], 1.27, .82)];
export function Workstation({ selected }: { selected: boolean }) {
  return <group name="CH_002_Workstation" position={hubConfig.workstation.position}>
    <StaticParts parts={furniture} />
    {selected && <StaticParts parts={selection} decorative />}
    <pointLight position={[1.4, 2.15, -.3]} color="#fbbf70" intensity={7} distance={4} decay={2} />
  </group>;
}
