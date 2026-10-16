import { hubConfig, type Surface, type Vec3 } from "@/lib/scene/hub-config";

type BlockProps = { position: Vec3; size: Vec3; surface?: Surface; rotation?: Vec3 };

export function Block({ position, size, surface = "metal", rotation }: BlockProps) {
  return <mesh position={position} rotation={rotation}><boxGeometry args={size} /><meshStandardMaterial color={hubConfig.colors[surface]} roughness={0.8} /></mesh>;
}

export function Monitor({ position, width = 1.2, height = 0.75, surface = "cyan" }: { position: Vec3; width?: number; height?: number; surface?: Surface }) {
  return <group position={position}>
    <Block position={[0, 0, 0]} size={[width + 0.12, height + 0.12, 0.13]} />
    <Block position={[0, 0, 0.075]} size={[width, height, 0.025]} surface="screen" />
    <Block position={[0, -0.2 * height, 0.095]} size={[width * 0.7, 0.035, 0.01]} surface={surface} />
    <Block position={[-width * 0.2, height * 0.1, 0.095]} size={[width * 0.3, 0.035, 0.01]} surface={surface} />
    <Block position={[0, -height / 2 - 0.18, 0]} size={[0.07, 0.36, 0.08]} />
    <Block position={[0, -height / 2 - 0.34, 0.05]} size={[width * 0.4, 0.06, 0.4]} />
  </group>;
}
