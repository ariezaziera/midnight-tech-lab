import { useEffect, useMemo } from "react";
import { BufferGeometry, Color, Float32BufferAttribute, MeshStandardMaterial } from "three";
import { hubConfig } from "@/lib/scene/hub-config";
import { StaticParts, box } from "./primitives";

/** Deterministic strata: no runtime random displacement or dense rock objects. */
export function createRockGeometry() {
  const { strata, segments } = hubConfig.platform;
  const points = strata.map((ring, layer) => Array.from({ length: segments }, (_, i) => {
    const angle = i * Math.PI * 2 / segments + ring.twist;
    const radius = ring.radius * (1 - .035 * (1 + Math.sin(i * 2.3 + layer * .6)));
    return [Math.cos(angle) * radius, ring.y + (layer === 0 ? 0 : .07 * Math.sin(i * 1.7)), Math.sin(angle) * radius];
  }));
  const positions: number[] = [], colors: number[] = [];
  const palette = ["#625b70", "#403d51", "#575066", "#37354a", "#4e465d", "#363247"];
  for (let layer = 0; layer < points.length - 1; layer++) for (let i = 0; i < segments; i++) {
    const j = (i + 1) % segments;
    const color = new Color(palette[layer]).multiplyScalar(.9 + (i % 3) * .06);
    for (const point of [points[layer][i], points[layer][j], points[layer + 1][i], points[layer][j], points[layer + 1][j], points[layer + 1][i]]) { positions.push(...point); colors.push(color.r, color.g, color.b); }
  }
  const last = points.at(-1)!;
  const dark = new Color("#191a27");
  for (let i = 0; i < segments; i++) for (const point of [[0, -2.53, 0], last[i], last[(i + 1) % segments]]) { positions.push(...point); colors.push(dark.r, dark.g, dark.b); }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals(); geometry.computeBoundingBox(); geometry.computeBoundingSphere();
  return geometry;
}
const accents = Array.from({ length: 6 }, (_, index) => {
  const angle = (index * 2 + .5) * Math.PI * 2 / 12;
  return box([Math.sin(angle) * 3.91, -.075, Math.cos(angle) * 3.91], [.7, .025, .035], "edge", "box", [0, angle, 0]);
});
export function Platform() {
  const rock = useMemo(() => createRockGeometry(), []);
  const rockMaterial = useMemo(() => new MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1 }), []);
  useEffect(() => () => { rock.dispose(); rockMaterial.dispose(); }, [rock, rockMaterial]);
  const { radius, depth, segments } = hubConfig.platform;
  return <group name="CH_001_Platform">
    <mesh><cylinderGeometry args={[radius * .985, radius, depth, segments]} /><meshStandardMaterial color={hubConfig.colors.platform} roughness={.95} /></mesh>
    <mesh position={[0, -.19, 0]}><cylinderGeometry args={[radius, radius * .97, .09, segments]} /><meshStandardMaterial color={hubConfig.colors.metal} roughness={.85} metalness={.3} /></mesh>
    <mesh geometry={rock} material={rockMaterial} dispose={null} />
    <StaticParts parts={accents} />
  </group>;
}
