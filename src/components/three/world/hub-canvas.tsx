"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Light, PointLight } from "three";
import { lightingConfig } from "@/lib/scene/look-config";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { CentralHub } from "../hub/central-hub";
import { hubConfig, type SceneMetrics } from "@/lib/scene/hub-config";
import { CameraRig, type CameraRigProps } from "../camera/camera-rig";
import { cameraPresets, type HotspotId } from "@/lib/scene/interaction-config";

export type HubCanvasProps = CameraRigProps & { onReady: (metrics: SceneMetrics) => void; onFailure: () => void; onSelect: (id: HotspotId) => void };

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
    if (reported.current) return;
    reported.current = true;
    // Inspect the completed first draw, rather than marking ready at context creation.
    scheduled.current = requestAnimationFrame(() => {
      const context = renderer.getContext();
      if (context.isContextLost() || renderer.info.render.calls === 0) { onFailure(); return; }
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
    dpr={hubConfig.dpr}
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
