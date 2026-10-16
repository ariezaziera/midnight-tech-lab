import { hubConfig } from "@/lib/scene/hub-config";
import { Block, Monitor } from "./primitives";

export function Workstation() {
  return <group name="CH_002_Workstation" position={hubConfig.workstation.position}>
    <Block position={[0, 1.18, 0]} size={hubConfig.workstation.deskSize} surface="desk" />
    {[-1.4, 1.4].map(x => <Block key={x} position={[x, 0.55, 0]} size={[0.2, 1.1, 1.1]} />)}
    <Monitor position={[-0.72, 2, -0.25]} />
    <Monitor position={[0.72, 2, -0.25]} surface="violet" />
    <Block position={[0, 1.29, 0.4]} size={[1.05, 0.05, 0.34]} surface="neutral" />
    <Block position={[0.85, 1.29, 0.4]} size={[0.16, 0.06, 0.25]} surface="neutral" />
    <group name="CH_003_Chair" position={[0, 0, 1.6]}>
      <Block position={[0, 0.7, 0]} size={[0.85, 0.16, 0.85]} />
      <Block position={[0, 1.22, 0.35]} size={[0.85, 1, 0.16]} />
      <Block position={[0, 0.3, 0]} size={[0.13, 0.6, 0.13]} surface="neutral" />
      <Block position={[0, 0.07, 0]} size={[1, 0.1, 0.15]} />
      <Block position={[0, 0.07, 0]} size={[0.15, 0.1, 1]} />
    </group>
    <group name="CH_008_Lamp" position={[1.4, 1.3, -0.4]}>
      <Block position={[0, 0.5, 0]} size={[0.06, 1, 0.06]} surface="amber" />
      <mesh position={[0, 1.03, 0]}><coneGeometry args={[0.27, 0.25, 12]} /><meshStandardMaterial color={hubConfig.colors.amber} emissive={hubConfig.colors.amber} emissiveIntensity={0.4} /></mesh>
      <pointLight position={[0, 0.85, 0.1]} color={hubConfig.colors.amber} intensity={7} distance={4} decay={2} />
    </group>
  </group>;
}
