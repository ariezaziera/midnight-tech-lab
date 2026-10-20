import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Box3, Mesh, PerspectiveCamera, Vector3, type Object3D } from "three";
import { HubResources, StaticParts, box, monitor, selectionCorners, type Part } from "../hub/primitives";
import { developmentPoses, exhibitBounds, exhibitTransitionMs, exhibitPick, type DevelopmentInteraction } from "@/lib/scene/development-config";
import type { CameraPose } from "@/lib/scene/interaction-config";
import { lightingConfig } from "@/lib/scene/look-config";

// Original procedural review geometry only: blank display, no language/project imagery.
const parts: Part[] = [
  box([0, -.12, 0], [4.8, .24, 3.6], "platform", "chamfer"),
  box([0, -.24, 0], [4.6, .08, 3.4], "metal", "chamfer"),
  box([0, 1.05, 0], [3.2, .16, 1.3], "desk", "chamfer"),
  ...[-1.25, 1.25].flatMap(x => [box([x, .5, 0], [.12, .95, .9]), box([x, .05, 0], [.45, .1, 1.1], "metal", "chamfer")]),
  ...monitor([0, 1.95, -.3], 1.8, 1, "violet"),
  box([0, 1.15, .3], [1.3, .03, .4], "upholstery", "chamfer"),
  box([-.1, 1.18, .3], [.85, .04, .25], "trim", "chamfer"),
  box([1.3, 1.18, -.35], [.3, .06, .3], "metal", "chamfer"),
  box([1.3, 1.65, -.35], [.04, .9, .04], "trim"),
  box([1.3, 2.15, -.35], [.45, .22, .45], "metal", "cone"),
  box([1.3, 2.04, -.35], [.32, .02, .32], "amber", "cylinder"),
  ...[-1, 1].map(x => box([x * 2.1, .025, -.9], [.04, .025, .7], "cyan")),
];

function BayCamera({ exhibitRequest, exhibitEligible, reducedMotion }: DevelopmentInteraction & { reducedMotion: boolean }) {
  const invalidate = useThree(state => state.invalidate);
  const pose = useRef<CameraPose>(developmentPoses.overview);
  const initial = useRef(true);
  const plan = useRef<{ from: CameraPose; to: CameraPose; elapsed: number; duration: number } | null>(null);
  const selected = exhibitEligible && exhibitRequest.selected;
  useEffect(() => {
    plan.current = { from: pose.current, to: selected ? developmentPoses.exhibit : developmentPoses.overview, elapsed: 0, duration: initial.current || reducedMotion ? 0 : exhibitTransitionMs };
    initial.current = false;
    invalidate();
  }, [selected, exhibitRequest.sequence, reducedMotion, invalidate]);
  useFrame((state, delta) => {
    const active = plan.current;
    if (!active) return;
    active.elapsed += Math.min(delta, .1) * 1000;
    const progress = active.duration === 0 ? 1 : Math.min(1, active.elapsed / active.duration);
    const t = progress * progress * (3 - 2 * progress);
    const blend = (from: number[], to: number[]) => from.map((value, i) => value + (to[i] - value) * t) as [number, number, number];
    const current: CameraPose = { ...active.to, position: blend(active.from.position, active.to.position), target: blend(active.from.target, active.to.target) };
    const { gl, scene } = state;
    const lens = state.camera as PerspectiveCamera;
    lens.position.set(...current.position);
    lens.lookAt(...current.target);
    lens.fov = current.fov; lens.near = current.near; lens.far = current.far;
    lens.updateProjectionMatrix(); lens.updateMatrixWorld(); scene.updateMatrixWorld(true);
    pose.current = current;
    let clearance = Infinity;
    scene.traverse(object => { if (object instanceof Mesh && !object.userData.skipDiagnostics) clearance = Math.min(clearance, new Box3().setFromObject(object).distanceToPoint(lens.position)); });
    const point = new Vector3(...exhibitPick).project(lens);
    gl.domElement.dataset.cameraPreset = selected ? "development-exhibit" : "development";
    gl.domElement.dataset.cameraMoving = String(progress < 1);
    gl.domElement.dataset.cameraPose = JSON.stringify({ position: current.position, target: current.target, bounds: exhibitBounds });
    gl.domElement.dataset.cameraDiagnostics = JSON.stringify({ position: current.position, target: current.target, fov: lens.fov, near: lens.near, far: lens.far, clearance, bounds: exhibitBounds, targetInView: new Vector3(...current.target).project(lens).toArray(), exhibitPick: { x: (point.x + 1) / 2, y: (1 - point.y) / 2, depth: point.z }, corners: [-1,1].flatMap(x=>[-1,1].map(y=>new Vector3(x * .9, 1.95 + y * .5, -.15).project(lens).toArray())) });
    if (progress < 1) state.invalidate(); else plan.current = null;
  }, -1);
  return null;
}

export function objectExhibit(object: Object3D | null): "savvyra" | null {
  for (let item = object; item; item = item.parent) if (item.userData.exhibitId === "savvyra") return "savvyra";
  return null;
}
const marker = [box([0,1.95,-.17], [1.55,.75,.025], "cyan")];
const selection = selectionCorners([0,1.95,-.13], 1.8, 1);
export default function DevelopmentScene(props: DevelopmentInteraction & { reducedMotion: boolean }) {
  return <group name="DevelopmentTechnicalReviewBay">
    <HubResources><StaticParts parts={parts} />
      {props.exhibitEligible && <group userData={{ exhibitId: "savvyra" }} onPointerDown={event => { if (objectExhibit(event.object) === "savvyra") { event.stopPropagation(); props.onExhibit(); } }}><StaticParts parts={marker} /></group>}
      {props.exhibitEligible && props.exhibitRequest.selected && <StaticParts parts={selection} decorative />}
    </HubResources>
    <pointLight {...lightingConfig.lamp} position={[1.3, 2, -.35]} />
    <BayCamera {...props} />
  </group>;
}
