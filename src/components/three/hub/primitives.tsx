import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { BoxGeometry, CylinderGeometry, ConeGeometry, ExtrudeGeometry, Shape, MeshStandardMaterial, Matrix4, Quaternion, Euler, Vector3, type BufferGeometry } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { hubConfig, type Surface, type Vec3 } from "@/lib/scene/hub-config";

export type Part = { position: Vec3; size: Vec3; surface?: Surface; rotation?: Vec3; shape?: "box" | "chamfer" | "panel" | "cylinder" | "cone" };
type Resources = { materials: Record<Surface, MeshStandardMaterial>; shapes: Record<NonNullable<Part["shape"]>, BufferGeometry> };
const ResourcesContext = createContext<Resources | null>(null);

/** Each mount owns and releases its resources, including after renderer recovery. */
export function HubResources({ children }: { children: ReactNode }) {
  const resources = useMemo(() => {
    const outline = new Shape();
    [[-.44, -.5], [.44, -.5], [.5, -.44], [.5, .44], [.44, .5], [-.44, .5], [-.5, .44], [-.5, -.44]].forEach(([x, y], index) => index ? outline.lineTo(x, y) : outline.moveTo(x, y));
    outline.closePath();
    const panel = new ExtrudeGeometry(outline, { depth: 1, bevelEnabled: false, steps: 1, curveSegments: 1 });
    panel.translate(0, 0, -.5);
    const chamfer = panel.clone().rotateX(-Math.PI / 2);
    const raw = { box: new BoxGeometry(1, 1, 1), chamfer, panel, cylinder: new CylinderGeometry(.5, .5, 1, 8), cone: new ConeGeometry(.5, 1, 8) };
    const shapes = Object.fromEntries(Object.entries(raw).map(([key, geometry]) => {
      if (!geometry.index) return [key, geometry];
      const converted = geometry.toNonIndexed(); geometry.dispose(); return [key, converted];
    })) as Resources["shapes"];
    const materials = Object.fromEntries(Object.entries(hubConfig.colors).map(([surface, color]) => {
      const accent = ["edge", "violet", "cyan", "amber"].includes(surface);
      return [surface, new MeshStandardMaterial({ color, roughness: surface === "desk" ? .65 : .85, metalness: surface === "metal" || surface === "trim" ? .35 : .05, emissive: accent ? color : "#000000", emissiveIntensity: accent ? .18 : 0 })];
    })) as Resources["materials"];
    return { shapes, materials };
  }, []);
  useEffect(() => () => { Object.values(resources.shapes).forEach(g => g.dispose()); Object.values(resources.materials).forEach(m => m.dispose()); }, [resources]);
  return <ResourcesContext.Provider value={resources}>{children}</ResourcesContext.Provider>;
}

/** Merge only inside a logical target: nearest-hit metadata remains unambiguous. */
export function StaticParts({ parts, decorative = false }: { parts: readonly Part[]; decorative?: boolean }) {
  const resources = useContext(ResourcesContext);
  if (!resources) throw new Error("StaticParts requires HubResources");
  const batches = useMemo(() => {
    const groups = new Map<Surface, BufferGeometry[]>();
    for (const part of parts) {
      const geometry = resources.shapes[part.shape ?? "box"].clone();
      const matrix = new Matrix4().compose(new Vector3(...part.position), new Quaternion().setFromEuler(new Euler(...(part.rotation ?? [0, 0, 0]))), new Vector3(...part.size));
      geometry.applyMatrix4(matrix);
      const surface = part.surface ?? "metal";
      const list = groups.get(surface) ?? []; list.push(geometry); groups.set(surface, list);
    }
    return Array.from(groups, ([surface, geometries]) => {
      const geometry = mergeGeometries(geometries);
      geometries.forEach(g => g.dispose());
      if (!geometry) throw new Error("Incompatible procedural part attributes");
      geometry.computeBoundingBox(); geometry.computeBoundingSphere();
      return { surface, geometry };
    });
  }, [parts, resources]);
  useEffect(() => () => batches.forEach(batch => batch.geometry.dispose()), [batches]);
  return <group dispose={null}>{batches.map(batch => <mesh key={batch.surface} geometry={batch.geometry} material={resources.materials[batch.surface]} userData={decorative ? { skipDiagnostics: true } : undefined} raycast={decorative ? () => undefined : undefined} />)}</group>;
}

export function box(position: Vec3, size: Vec3, surface: Surface = "metal", shape: Part["shape"] = "box", rotation?: Vec3): Part { return { position, size, surface, shape, rotation }; }
export function monitor(position: Vec3, width = 1.2, height = .75, accent: Surface = "cyan"): Part[] {
  const [x, y, z] = position;
  return [
    box([x, y, z], [width + .1, height + .1, .12], "metal", "panel"),
    box([x, y, z + .07], [width, height, .025], "screen"),
    box([x, y - height / 2 + .02, z + .09], [width * .7, .018, .012], accent),
    box([x, y - height / 2 - .15, z], [.065, .3, .08], "trim"),
    box([x, y - height / 2 - .28, z + .03], [width * .38, .04, .3], "metal", "chamfer"),
  ];
}

export function selectionCorners(center: Vec3, width: number, height: number): Part[] {
  return [-1, 1].flatMap(x => [-1, 1].flatMap(y => [
    box([center[0] + x * (width / 2 - .08), center[1] + y * height / 2, center[2]], [.16, .025, .025], "amber"),
    box([center[0] + x * width / 2, center[1] + y * (height / 2 - .08), center[2]], [.025, .16, .025], "amber"),
  ]));
}
