"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { CentralHub } from "../hub/central-hub";
import { hubConfig, type SceneMetrics } from "@/lib/scene/hub-config";

export type HubCanvasProps = { onReady: (metrics: SceneMetrics) => void; onFailure: () => void };

function RendererLifecycle({ onReady, onFailure }: HubCanvasProps) {
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
      onReady({ calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures, frames: frames.current, renderer: String(context.getParameter(context.RENDERER)) });
    });
  });
  return null;
}

export default function HubCanvas(props: HubCanvasProps) {
  const { camera } = hubConfig;
  return <Canvas
    frameloop="demand"
    events={() => ({ enabled: false, priority: 1 })}
    resize={{ scroll: false }}
    dpr={hubConfig.dpr}
    gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
    fallback={<p className="p-6 text-muted">WebGL is unavailable. Use the HTML portfolio navigation.</p>}
    role="img"
    aria-label="Static Central Hub blockout: floating rock platform, workstation, creator display, project display, console and globe placeholders."
  >
    <color attach="background" args={[hubConfig.background]} />
    <PerspectiveCamera makeDefault position={camera.position} fov={camera.fov} near={camera.near} far={camera.far} onUpdate={value => value.lookAt(...camera.target)} />
    <ambientLight intensity={1.4} />
    <directionalLight position={[4, 8, 5]} intensity={3} color="#d8d9ff" />
    <directionalLight position={[-4, 3, -4]} intensity={2} color="#a78bfa" />
    <CentralHub />
    <RendererLifecycle {...props} />
  </Canvas>;
}
