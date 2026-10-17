import { hubConfig } from "@/lib/scene/hub-config";
import { StaticParts, box, monitor, selectionCorners, type Part } from "./primitives";
import type { HotspotId } from "@/lib/scene/interaction-config";

const creator: Part[] = [
  box([0, .12, 0], [1.3, .24, .65], "metal", "chamfer"),
  box([0, .31, -.04], [.82, .16, .25], "trim"),
  box([0, 1.3, -.03], [1.1, 2.12, .2], "metal", "panel"),
  box([0, 1.3, .085], [.94, 1.94, .025], "violet", "panel"),
  box([0, 1.3, .108], [.86, 1.84, .025], "screen", "panel"),
  ...[-.57, .57].map(x => box([x, 1.32, -.03], [.055, 2.1, .28], "trim")),
  // Abstract empty frame and horizontal placeholder marks, never a likeness or biography.
  box([0, 1.55, .13], [.5, .6, .018], "platform", "panel"),
  box([0, 1.03, .14], [.48, .025, .015], "neutral"),
  box([0, .92, .14], [.29, .02, .015], "neutral"),
];
const project: Part[] = [
  box([0, .1, 0], [1.05, .2, .72], "metal", "chamfer"),
  box([0, .68, -.04], [.55, 1.04, .38], "metal", "chamfer"),
  box([0, .75, .16], [.16, .64, .018], "edge"),
  box([0, 1.21, -.04], [.85, .13, .5], "trim", "chamfer"),
  ...monitor([0, 1.65, 0], 1.3, .8, "violet"),
  // A neutral empty display construction, not a project thumbnail or title.
  box([0, 1.72, .09], [.7, .26, .015], "platform"),
];
const consoleParts = [box([0, .55, 0], [.9, 1.1, .75], "metal", "chamfer"), box([0, 1.14, 0], [1, .16, .8], "metal", "chamfer", [-.15, 0, 0]), box([0, 1.23, .02], [.75, .025, .51], "cyan", "chamfer", [-.15, 0, 0])];
const globeBase = [box([0, .18, 0], [1.35, .36, 1.35], "metal", "cylinder"), box([0, .39, 0], [1.1, .06, 1.1], "edge", "cylinder")];
const creatorSelection = selectionCorners([0, 1.3, .15], .96, 1.96);
const projectSelection = selectionCorners([0, 1.65, .11], 1.37, .87);
export function DisplayZones({ selected }: { selected: HotspotId | null }) {
  return <>
    <group name="CH_005_CreatorID" userData={{ hotspotId: "creator" satisfies HotspotId }} position={hubConfig.zones.creator} rotation={[0, .2, 0]}>
      <StaticParts parts={creator} />{selected === "creator" && <StaticParts parts={creatorSelection} decorative />}
    </group>
    <group name="CH_004_ProjectDisplay" userData={{ hotspotId: "projects" satisfies HotspotId }} position={hubConfig.zones.project} rotation={[0, .25, 0]}>
      <StaticParts parts={project} />{selected === "projects" && <StaticParts parts={projectSelection} decorative />}
    </group>
    <group name="CH_006_NavigationConsole" position={hubConfig.zones.console} rotation={[0, -.3, 0]}><StaticParts parts={consoleParts} /></group>
    <group name="CH_007_Globe" position={hubConfig.zones.globe}>
      <StaticParts parts={globeBase} />
      <mesh position={[0, 1.1, 0]}><icosahedronGeometry args={[.6, 1]} /><meshStandardMaterial color={hubConfig.colors.cyan} wireframe /></mesh>
    </group>
  </>;
}
