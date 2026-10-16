"use client";

import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ComponentType, type ReactNode } from "react";
import type { HubCanvasProps } from "@/components/three/world/hub-canvas";
import type { SceneMetrics } from "@/lib/scene/hub-config";

const desktopQuery = "(min-width: 768px)";
function subscribe(listener: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
const getDesktop = () => window.matchMedia(desktopQuery).matches;
const getServerDesktop = () => false;

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function StaticDescription({ message }: { message: string }) {
  return <div className="flex min-h-72 flex-col justify-center p-6 sm:p-10"><p className="eyebrow mb-5 text-amber">Central Hub · Blockout placeholder</p><h3 className="mb-4 text-2xl">The studio layout</h3><p className="mb-4 max-w-xl leading-relaxed text-muted">{message}</p><p className="max-w-xl text-sm leading-relaxed text-muted">An approximately 8m floating platform supports a central desk and chair. Creator ID and project displays sit to the left; console and globe placeholders sit to the right. No portrait or project artwork is included.</p></div>;
}

function Failure({ message, retry }: { message: string; retry: () => void }) {
  return <div data-testid="scene-fallback"><div role="status"><StaticDescription message={message} /></div><button type="button" className="action action-secondary mb-8 ml-6 sm:ml-10" onClick={retry}>Retry 3D preview</button></div>;
}

type LoadState = { phase: "loading" } | { phase: "loaded"; Canvas: ComponentType<HubCanvasProps> } | { phase: "unsupported" | "error" | "timeout" | "lost" };

function DesktopPreview({ retry }: { retry: () => void }) {
  const [load, setLoad] = useState<LoadState>({ phase: "loading" });
  const [metrics, setMetrics] = useState<(SceneMetrics & { readyMs: number }) | null>(null);
  const started = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    started.current = performance.now();
    timer.current = setTimeout(() => setLoad({ phase: "timeout" }), 15000);
    // The import runs only after mount; no Three.js/browser code enters SSR.
    // A fresh attempt calls the chunk loader again after a failed request.
    void (async () => {
      try {
        const probe = document.createElement("canvas");
        const context = probe.getContext("webgl2", { failIfMajorPerformanceCaveat: false });
        if (!context) { if (timer.current) clearTimeout(timer.current); if (mounted.current) setLoad({ phase: "unsupported" }); return; }
        context.getExtension("WEBGL_lose_context")?.loseContext();
        const sceneModule = await import("@/components/three/world/hub-canvas");
        if (mounted.current) setLoad(current => current.phase === "loading" ? { phase: "loaded", Canvas: sceneModule.default } : current);
      } catch { if (timer.current) clearTimeout(timer.current); if (mounted.current) setLoad({ phase: "error" }); }
    })();
    return () => { mounted.current = false; if (timer.current) clearTimeout(timer.current); };
  }, []);

  const ready = useCallback((value: SceneMetrics) => {
    if (!mounted.current) return;
    if (timer.current) clearTimeout(timer.current);
    setMetrics({ ...value, readyMs: Math.round(performance.now() - (started.current ?? performance.now())) });
  }, []);
  const lost = useCallback(() => { if (mounted.current) { if (timer.current) clearTimeout(timer.current); setLoad({ phase: "lost" }); } }, []);

  if (load.phase !== "loaded" && load.phase !== "loading") {
    const messages = {
      unsupported: "WebGL 2 is unavailable in this browser. The HTML portfolio remains available.",
      error: "The 3D preview could not start or download. You can retry or continue with the HTML portfolio.",
      timeout: "The 3D preview took too long to load. You can retry or continue with the HTML portfolio.",
      lost: "The graphics context was lost. Retry to create a fresh preview, or continue with the HTML portfolio.",
    };
    return <Failure message={messages[load.phase]} retry={retry} />;
  }

  const error = <Failure message="The 3D renderer could not initialize. You can retry or continue with the HTML portfolio." retry={retry} />;
  return <SceneBoundary fallback={error}>
    <div className="relative h-[440px] w-full" data-testid="scene-viewport" data-scene-ready={metrics ? "true" : "false"} data-scene-metrics={metrics ? JSON.stringify(metrics) : undefined}>
      {load.phase === "loaded" && <load.Canvas onReady={ready} onFailure={lost} />}
      {!metrics && <div className="absolute inset-0 flex flex-col items-center justify-center bg-space p-6 text-center" role="status"><p className="text-lg">Loading the Central Hub blockout…</p><p className="mt-3 text-sm text-muted">The HTML portfolio is ready to use.</p></div>}
    </div>
  </SceneBoundary>;
}

export function StudioPreview() {
  const desktop = useSyncExternalStore(subscribe, getDesktop, getServerDesktop);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(value => value + 1), []);
  return <section className="min-w-0 overflow-hidden border border-white/15 bg-surface" aria-labelledby="studio-preview-heading">
    <div className="border-b border-white/15 px-6 py-4"><h2 id="studio-preview-heading" className="text-lg">Central Hub / Spatial prototype</h2><p className="mt-1 text-xs text-muted">M2 blockout · Fixed overview · All objects are placeholders</p></div>
    {desktop ? <DesktopPreview key={attempt} retry={retry} /> : <div data-testid="scene-2d"><StaticDescription message="This lightweight HTML view keeps the layout readable on smaller screens and when JavaScript is disabled. The 3D overview is available on wider screens." /></div>}
    <div className="border-t border-white/15 px-6 py-4"><p className="mb-2 text-sm text-muted">Placeholder zones · No scene interactions</p><ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs"><li className="text-violet">Creator ID / Left rear</li><li className="text-violet">Project display / Left front</li><li className="text-muted">Workstation / Center</li><li className="text-cyan-200">Console &amp; globe / Right</li></ul></div>
  </section>;
}
