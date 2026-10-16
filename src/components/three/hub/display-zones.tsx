import { hubConfig } from "@/lib/scene/hub-config";
import { Block, Monitor } from "./primitives";
import type { HotspotId } from "@/lib/scene/interaction-config";

export function DisplayZones() {
  return <>
    <group name="CH_005_CreatorID" userData={{ hotspotId: "creator" satisfies HotspotId }} position={hubConfig.zones.creator} rotation={[0, 0.2, 0]}>
      <Block position={[0, 1.2, 0]} size={[1.12, 2.15, 0.2]} surface="violet" />
      <Block position={[0, 1.2, 0.12]} size={[0.9, 1.88, 0.05]} surface="screen" />
      <Block position={[0, 1.2, 0.16]} size={[0.5, 0.07, 0.02]} surface="neutral" />
      <Block position={[0, 0.12, 0]} size={[1.3, 0.24, 0.65]} />
    </group>
    <group name="CH_004_ProjectDisplay" userData={{ hotspotId: "projects" satisfies HotspotId }} position={hubConfig.zones.project} rotation={[0, 0.25, 0]}>
      <Block position={[0, 0.65, 0]} size={[0.8, 1.3, 0.5]} />
      <Monitor position={[0, 1.65, 0]} width={1.3} height={0.8} surface="violet" />
    </group>
    <group name="CH_006_NavigationConsole" position={hubConfig.zones.console} rotation={[0, -0.3, 0]}>
      <Block position={[0, 0.55, 0]} size={[0.9, 1.1, 0.75]} />
      <Block position={[0, 1.14, 0]} size={[1, 0.16, 0.8]} surface="cyan" rotation={[-0.15, 0, 0]} />
    </group>
    <group name="CH_007_Globe" position={hubConfig.zones.globe}>
      <mesh position={[0, 0.18, 0]}><cylinderGeometry args={[0.65, 0.7, 0.36, 12]} /><meshStandardMaterial color={hubConfig.colors.metal} /></mesh>
      <mesh position={[0, 1.1, 0]}><icosahedronGeometry args={[0.6, 1]} /><meshStandardMaterial color={hubConfig.colors.cyan} wireframe /></mesh>
    </group>
  </>;
}
