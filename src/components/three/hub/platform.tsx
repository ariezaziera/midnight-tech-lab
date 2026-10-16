import { hubConfig } from "@/lib/scene/hub-config";

export function Platform() {
  const { radius, depth, segments } = hubConfig.platform;
  return <group name="CH_001_Platform">
    <mesh><cylinderGeometry args={[radius, radius * 0.97, depth, segments]} /><meshStandardMaterial color={hubConfig.colors.platform} roughness={0.95} /></mesh>
    <mesh position={[0, -0.17, 0]}><cylinderGeometry args={[radius * 1.005, radius * 1.005, 0.055, segments]} /><meshStandardMaterial color={hubConfig.colors.edge} emissive={hubConfig.colors.edge} emissiveIntensity={0.25} /></mesh>
    <mesh position={[0, -1.05, 0]} rotation={[0, 0.18, Math.PI]}><coneGeometry args={[3.9, 1.9, 7]} /><meshStandardMaterial color={hubConfig.colors.rock} flatShading roughness={1} /></mesh>
    {Array.from({ length: 7 }, (_, i) => {
      const angle = i * Math.PI * 2 / 7;
      return <mesh key={i} position={[Math.cos(angle) * 2.5, -1.5 - (i % 3) * 0.13, Math.sin(angle) * 2.5]} scale={[1.2, 0.8 + (i % 2) * 0.2, 1]} rotation={[0, i, 0]}><dodecahedronGeometry args={[1.1, 0]} /><meshStandardMaterial color={hubConfig.colors.rock} roughness={1} flatShading /></mesh>;
    })}
  </group>;
}
