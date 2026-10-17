import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box3, Mesh, PerspectiveCamera, Vector3 } from "three";
import { HubResources, StaticParts, box, monitor, type Part } from "../hub/primitives";
import { developmentCamera, developmentBounds } from "@/lib/scene/scene-registry";
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

function BayCamera() {
  const placed = useRef(false);
  useFrame(state => {
    if (placed.current) return;
    placed.current = true;
    const { gl, scene } = state;
    const lens = state.camera as PerspectiveCamera;
    lens.position.set(...developmentCamera.position);
    lens.lookAt(...developmentCamera.target);
    lens.fov = developmentCamera.fov; lens.near = developmentCamera.near; lens.far = developmentCamera.far;
    lens.updateProjectionMatrix(); lens.updateMatrixWorld(); scene.updateMatrixWorld(true);
    let clearance = Infinity;
    scene.traverse(object => { if (object instanceof Mesh) clearance = Math.min(clearance, new Box3().setFromObject(object).distanceToPoint(lens.position)); });
    gl.domElement.dataset.cameraPreset = "development";
    gl.domElement.dataset.cameraMoving = "false";
    gl.domElement.dataset.cameraDiagnostics = JSON.stringify({ position: developmentCamera.position, target: developmentCamera.target, fov: lens.fov, near: lens.near, far: lens.far, clearance, bounds: developmentBounds, targetInView: new Vector3(...developmentCamera.target).project(lens).toArray() });
  }, -1);
  return null;
}

export default function DevelopmentScene() {
  return <group name="DevelopmentTechnicalReviewBay">
    <HubResources><StaticParts parts={parts} /></HubResources>
    <pointLight {...lightingConfig.lamp} position={[1.3, 2, -.35]} />
    <BayCamera />
  </group>;
}
