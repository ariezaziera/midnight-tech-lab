"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Light, Mesh, PointLight } from "three";
import { qualityPolicy, type GraphicsQuality } from "@/lib/scene/quality-config";
import { lightingConfig } from "@/lib/scene/look-config";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { CentralHub } from "../hub/central-hub";
import { type SceneMetrics } from "@/lib/scene/hub-config";
import { CameraRig, type CameraRigProps } from "../camera/camera-rig";
import { cameraPresets, type HotspotId } from "@/lib/scene/interaction-config";

export type HubCanvasProps = CameraRigProps & { quality: GraphicsQuality; onReady: (metrics: SceneMetrics) => void; onFailure: () => void; onSelect: (id: HotspotId) => void };

function RendererLifecycle({ onReady, onFailure }: Pick<HubCanvasProps, "onReady" | "onFailure">) {
  const { gl } = useThree();
  const frames = useRef(0);
  const reported = useRef(false);
  const scheduled = useRef<number | null>(null);

  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      if (scheduled.current !== null) cancelAnimationFrame(scheduled.current);
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
      if (context.isContextLost() || renderer.info.render.calls === 0) { onFailure(); return; }
      const materials = new Set();
      state.scene.traverse(object => { if (object instanceof Mesh) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material)); });
      renderer.domElement.dataset.renderMetrics = JSON.stringify({ calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures, materials: materials.size, programs: renderer.info.programs?.length ?? 0, dpr: renderer.getPixelRatio(), width: renderer.domElement.width, height: renderer.domElement.height });
      if (reported.current) return;
      reported.current = true;
      const lights: Light[] = [];
      state.scene.traverse(object => { if (object instanceof Light) lights.push(object); });
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
    aria-label="Central Hub blockout. Select the Creator ID, Project Display or Workstation, or use the equivalent HTML controls below."
  >

    <PerspectiveCamera makeDefault position={camera.position} fov={camera.fov} near={camera.near} far={camera.far} />
    <hemisphereLight args={[lightingConfig.fill.sky, lightingConfig.fill.ground, lightingConfig.fill.intensity]} />
    <directionalLight {...lightingConfig.key} />
    <directionalLight {...lightingConfig.rim} />
    <CentralHub selected={props.request.preset === "overview" ? null : props.request.preset} onSelect={props.onSelect} />
    <CameraRig request={props.request} reducedMotion={props.reducedMotion} onSettled={props.onSettled} />
    <RendererLifecycle {...props} />
  </Canvas>;
}
