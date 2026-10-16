import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Box3, Mesh, PerspectiveCamera, Raycaster, Vector3, type Object3D } from "three";
import { cameraBounds, cameraPresets, hotspots, hotspotIds, isHotspotId, transitionConfig, transitionPose, type CameraPose, type CameraPresetId, type CameraRequest } from "@/lib/scene/interaction-config";

export type CameraRigProps = { request: CameraRequest; reducedMotion: boolean; onSettled: (preset: CameraPresetId) => void };

export function objectHotspot(object: Object3D | null) {
  for (let item = object; item; item = item.parent) if (isHotspotId(item.userData.hotspotId)) return item.userData.hotspotId;
  return null;
}

function diagnostics(camera: PerspectiveCamera, scene: Object3D, pose: CameraPose, preset: CameraPresetId) {
  const position = camera.position;
  let clearance = Infinity;
  scene.traverse(object => {
    if (object instanceof Mesh && !object.userData.skipDiagnostics) clearance = Math.min(clearance, new Box3().setFromObject(object).distanceToPoint(position));
  });
  const project = (point: number[]) => new Vector3(...point).project(camera);
  const picks = Object.fromEntries(hotspotIds.map(id => {
    const point = project(hotspots[id].pickPoint);
    return [id, { x: (point.x + 1) / 2, y: (1 - point.y) / 2, depth: point.z }];
  }));
  const bounds = preset === "overview" ? null : hotspots[preset].bounds;
  const corners = bounds ? [-1, 1].flatMap(x => [-1, 1].flatMap(y => [-1, 1].map(z => project(bounds.center.map((v, axis) => v + [x, y, z][axis] * bounds.size[axis] / 2)).toArray()))) : [];
  const direction = new Vector3(...pose.target).sub(position).normalize();
  const ray = new Raycaster(position, direction, camera.near, position.distanceTo(new Vector3(...pose.target)) + 1);
  const hit = ray.intersectObject(scene, true).find(item => !item.object.userData.skipDiagnostics);
  return { position: position.toArray(), target: pose.target, fov: camera.fov, near: camera.near, far: camera.far, clearance, picks, corners, targetInView: project(pose.target).toArray(), nearestHotspot: hit ? objectHotspot(hit.object) : null };
}

export function CameraRig({ request, reducedMotion, onSettled }: CameraRigProps) {
  const invalidate = useThree(state => state.invalidate);
  const current = useRef<CameraPose>(cameraPresets.overview);
  const initial = useRef(true);
  const plan = useRef<{ from: CameraPose; to: CameraPresetId; elapsed: number; duration: number } | null>(null);

  useEffect(() => () => { initial.current = true; plan.current = null; }, []);

  useEffect(() => {
    const same = current.current.position.every((value, i) => value === cameraPresets[request.preset].position[i]);
    plan.current = { from: current.current, to: request.preset, elapsed: 0, duration: initial.current || reducedMotion || same ? 0 : transitionConfig.durationMs };
    initial.current = false;
    invalidate();
  }, [request.preset, request.sequence, reducedMotion, invalidate]);

  useFrame((state, delta) => {
    const active = plan.current;
    const camera = state.camera as PerspectiveCamera;
    if (active) {
      active.elapsed += Math.min(delta, 0.1) * 1000;
      const progress = active.duration === 0 ? 1 : Math.min(1, active.elapsed / active.duration);
      const pose = progress === 1 ? cameraPresets[active.to] : transitionPose(active.from, cameraPresets[active.to], progress);
      camera.position.set(...pose.position);
      camera.fov = pose.fov;
      camera.near = pose.near;
      camera.far = pose.far;
      camera.lookAt(...pose.target);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      current.current = pose;
      state.gl.domElement.setAttribute("data-camera-preset", active.to);
      state.gl.domElement.setAttribute("data-camera-moving", String(progress < 1));
      state.gl.domElement.setAttribute("data-camera-pose", JSON.stringify({ position: pose.position, target: pose.target, bounds: cameraBounds }));
      if (progress < 1) state.invalidate();
      else { plan.current = null; onSettled(active.to); }
    }
    if (!plan.current) {
      state.scene.updateMatrixWorld(true);
      const preset = request.preset;
      state.gl.domElement.setAttribute("data-camera-diagnostics", JSON.stringify(diagnostics(camera, state.scene, current.current, preset)));
    }
  }, -1);
  return null;
}
