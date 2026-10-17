"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Light, Mesh, PointLight, type Object3D } from "three";
import { qualityPolicy, type GraphicsQuality } from "@/lib/scene/quality-config";
import { lightingConfig } from "@/lib/scene/look-config";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { SceneHost } from "./scene-host";
import { sceneRegistry, type SceneEvent, type ScenePhase, type SceneRequest } from "@/lib/scene/scene-registry";
import { type SceneMetrics } from "@/lib/scene/hub-config";
import { type CameraRigProps } from "../camera/camera-rig";
import { cameraPresets, type HotspotId } from "@/lib/scene/interaction-config";

export type HubCanvasProps = CameraRigProps & { sceneRequest: SceneRequest; scenePhase: ScenePhase; onSceneState: (event: SceneEvent) => void; quality: GraphicsQuality; onReady: (metrics: SceneMetrics) => void; onFailure: () => void; onSelect: (id: HotspotId) => void };

function RendererLifecycle({ onReady, onFailure, sceneRequest, request, onSceneState }: Pick<HubCanvasProps, "onReady" | "onFailure" | "sceneRequest" | "request" | "onSceneState">) {
  const { gl } = useThree();
  const frames = useRef(0);
  const reported = useRef(false);
  const stable = useRef<string | null>(null);
  const scheduled = useRef<number | null>(null);

  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      if (scheduled.current !== null) cancelAnimationFrame(scheduled.current);
      scheduled.current = null;
    };
  }, [gl, onFailure]);

  useFrame(state => {
    const renderer = state.gl;
    frames.current += 1;
    renderer.domElement.setAttribute("data-render-count", String(frames.current));
    if (scheduled.current !== null) return;
    // Inspect completed demand draws. This callback never invalidates another frame.
    scheduled.current = requestAnimationFrame(() => {
      scheduled.current = null;
      const context = renderer.getContext();
      if (context.isContextLost()) { onFailure(); return; }
      const graphs: Object3D[] = [];
      state.scene.traverse(object => { if (object.userData.studioScene) graphs.push(object); });
      const lights: Light[] = [];
      state.scene.traverse(object => { if (object instanceof Light) lights.push(object); });
      const materials = new Set();
      state.scene.traverse(object => { if (object instanceof Mesh) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material)); });
      renderer.domElement.dataset.activeScene = graphs[0]?.userData.studioScene ?? "none";
      renderer.domElement.dataset.renderMetrics = JSON.stringify({ calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures, materials: materials.size, programs: renderer.info.programs?.length ?? 0, dpr: renderer.getPixelRatio(), width: renderer.domElement.width, height: renderer.domElement.height, graphs: graphs.map(graph => graph.userData.studioScene), lightCount: lights.length, pointLightCount: lights.filter(light => light instanceof PointLight).length, shadows: renderer.shadowMap.enabled });
      const graph = graphs[0];
      if (graphs.length !== 1 || !graph || graph.userData.studioScene !== sceneRequest.id || graph.userData.sceneSequence !== sceneRequest.sequence || renderer.info.render.calls === 0) return;
      const cameraReady = renderer.domElement.dataset.cameraPreset === (sceneRequest.id === "hub" ? request.preset : "development") && renderer.domElement.dataset.cameraMoving === "false";
      const token = `${sceneRequest.id}:${sceneRequest.sequence}`;
      if (cameraReady && stable.current !== token) {
        stable.current = token;
        onSceneState({ request: sceneRequest, phase: "ready", readyMs: Math.round(performance.now() - graph.userData.startedAt) });
      }
      if (!cameraReady) return;
      if (reported.current) return;
      reported.current = true;
      onReady({ lightCount: lights.length, pointLightCount: lights.filter(light => light instanceof PointLight).length, shadows: renderer.shadowMap.enabled, alpha: context.getContextAttributes()?.alpha ?? false, calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures, frames: frames.current, renderer: String(context.getParameter(context.RENDERER)) });
    });
  });
  return null;
}

export default function HubCanvas(props: HubCanvasProps) {
  const camera = cameraPresets.overview;
  return <Canvas
    className="cosmic-canvas"
    frameloop="demand"
    resize={{ scroll: false }}
    dpr={qualityPolicy[props.quality].dpr}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    fallback={<p className="p-6 text-muted">WebGL is unavailable. Use the HTML portfolio navigation.</p>}
    role="img"
    aria-label={`${sceneRegistry[props.sceneRequest.id].title}. Use the equivalent HTML controls below.`}
  >

    <PerspectiveCamera makeDefault position={camera.position} fov={camera.fov} near={camera.near} far={camera.far} />
    <hemisphereLight args={[lightingConfig.fill.sky, lightingConfig.fill.ground, lightingConfig.fill.intensity]} />
    <directionalLight {...lightingConfig.key} />
    <directionalLight {...lightingConfig.rim} />
    <SceneHost sceneRequest={props.sceneRequest} scenePhase={props.scenePhase} onSceneState={props.onSceneState} request={props.request} reducedMotion={props.reducedMotion} onSettled={props.onSettled} onSelect={props.onSelect} />
    <RendererLifecycle {...props} />
  </Canvas>;
}
