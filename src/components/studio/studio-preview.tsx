"use client";

import { Component, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ComponentType, type ReactNode } from "react";
import type { HubCanvasProps } from "@/components/three/world/hub-canvas";
import type { SceneMetrics } from "@/lib/scene/hub-config";
import type { DevelopmentExhibit } from "@/lib/scene/zone-content";
import type { ExhibitRequest } from "@/lib/scene/development-config";
import { StudioControls } from "./studio-controls";
import { defaultQuality, type GraphicsQuality } from "@/lib/scene/quality-config";
import { sceneRegistry, type SceneEvent, type SceneId, type SceneRequest } from "@/lib/scene/scene-registry";
import { readStableScene, resetStableScene, saveStableScene, serverScene, subscribeStableScene } from "@/lib/scene/scene-session";
import { StudioDirectory } from "./studio-directory";
import { isHotspotId, type CameraRequest, type HotspotId } from "@/lib/scene/interaction-config";
import { readStablePreset, saveStablePreset, serverPreset, subscribeStablePreset } from "@/lib/scene/studio-session";

const desktopQuery = "(min-width: 768px)";
function subscribe(listener: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
const getDesktop = () => window.matchMedia(desktopQuery).matches;
const getServerDesktop = () => false;
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(listener: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerMotion = () => true;

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode; fail: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.fail(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function StaticDescription({ message }: { message: string }) {
  return <div className="flex min-h-72 flex-col justify-center p-6 sm:p-10"><p className="eyebrow mb-5 text-amber">Central Hub · Blockout placeholder</p><h3 className="mb-4 text-2xl">The studio layout</h3><p className="mb-4 max-w-xl leading-relaxed text-muted">{message}</p><p className="max-w-xl text-sm leading-relaxed text-muted">An approximately 8m floating platform supports a central desk and chair. Creator ID and project displays sit to the left; console and globe placeholders sit to the right. No portrait or project artwork is included.</p></div>;
}

function Failure({ message, retry }: { message: string; retry: () => void }) {
  return <div data-testid="scene-fallback"><div role="status"><StaticDescription message={message} /></div><button type="button" className="action action-secondary mb-8 ml-6 sm:ml-10" onClick={retry}>Retry 3D preview</button></div>;
}

type LoadState = { phase: "loading" } | { phase: "loaded"; Canvas: ComponentType<HubCanvasProps> } | { phase: "unsupported" | "error" | "timeout" | "lost" };

function DesktopPreview({ retry, ...interaction }: { retry: () => void } & Omit<HubCanvasProps, "onReady" | "onFailure">) {
  const { onSceneState, sceneRequest } = interaction;
  const [load, setLoad] = useState<LoadState>({ phase: "loading" });
  const [metrics, setMetrics] = useState<(SceneMetrics & { readyMs: number }) | null>(null);
  const started = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);
  useEffect(() => { if (interaction.scenePhase === "failed" && timer.current) clearTimeout(timer.current); }, [interaction.scenePhase]);
  useEffect(() => {
    if (load.phase === "loading" || load.phase === "loaded") return;
    onSceneState({ request: sceneRequest, phase: "failed", message: "The 3D preview is unavailable. Retry the preview, return to the hub, or use the HTML portfolio links." });
  }, [load.phase, onSceneState, sceneRequest]);

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
  const lost = useCallback(() => { if (mounted.current) { if (timer.current) clearTimeout(timer.current); setLoad({ phase: "lost" }); onSceneState({ request: sceneRequest, phase: "failed", message: "The graphics context was lost. Retry the preview or return to the Central Hub." }); } }, [onSceneState, sceneRequest]);

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
  return <SceneBoundary fallback={error} fail={() => interaction.onSceneState({ request: interaction.sceneRequest, phase: "failed", message: "The graphics renderer could not initialize. Retry the 3D preview or use the HTML portfolio." })}>
    <div className="cosmic-stage relative h-[440px] w-full" data-testid="scene-viewport" data-scene-ready={metrics && interaction.scenePhase === "ready" ? "true" : "false"} data-scene-metrics={metrics ? JSON.stringify(metrics) : undefined}>
      {load.phase === "loaded" && <load.Canvas {...interaction} onReady={ready} onFailure={lost} />}
      {(!metrics || interaction.scenePhase !== "ready") && <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-space p-6 text-center" role="status"><p className="text-lg">{interaction.scenePhase === "failed" ? "The review scene could not become ready. Retry or return using the controls below." : interaction.sceneRequest.id === "hub" ? "Loading the Central Hub blockout…" : interaction.exhibitEligible ? "Loading Development Lab…" : "Loading Development Lab — Technical Review Placeholder…"}</p><p className="mt-3 text-sm text-muted">The HTML portfolio is ready to use.</p></div>}
    </div>
  </SceneBoundary>;
}

export function StudioPreview({ exhibit = null }: { exhibit?: DevelopmentExhibit | null }) {
  const [exhibitRequest, setExhibitRequest] = useState<ExhibitRequest>({ selected: false, sequence: 0 });
  const exhibitButton = useRef<HTMLButtonElement>(null);
  const overviewExhibit = useCallback(() => { setExhibitRequest(value => ({ selected: false, sequence: value.sequence + 1 })); exhibitButton.current?.focus({ preventScroll: true }); }, []);
  const focusExhibit = useCallback(() => { if (exhibit) { setExhibitRequest(value => ({ selected: true, sequence: value.sequence + 1 })); requestAnimationFrame(() => { const button = exhibitButton.current; if (button?.getClientRects().length) button.focus({ preventScroll: true }); }); } }, [exhibit]);
  const desktop = useSyncExternalStore(subscribe, getDesktop, getServerDesktop);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerMotion);
  const restored = useSyncExternalStore(subscribeStablePreset, readStablePreset, serverPreset);
  const restoredScene = useSyncExternalStore(subscribeStableScene, readStableScene, serverScene);
  const [sceneChoice, setSceneChoice] = useState<SceneRequest | null>(null);
  const pendingScene = useRef<SceneRequest | null>(null);
  const [sceneEvent, setSceneEvent] = useState<SceneEvent | null>(null);
  const [sceneNotice, setSceneNotice] = useState("");
  const entryButton = useRef<HTMLButtonElement>(null);
  const sceneRequest = useMemo(() => sceneChoice ?? { id: restoredScene, sequence: 0 }, [sceneChoice, restoredScene]);
  const scenePhase = sceneEvent?.request.id === sceneRequest.id && sceneEvent.request.sequence === sceneRequest.sequence ? sceneEvent.phase : "loading";
  const [requested, setRequested] = useState<CameraRequest | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [quality, setQuality] = useState<GraphicsQuality>(defaultQuality);
  const controls = useRef<Partial<Record<HotspotId, HTMLButtonElement | null>>>({});
  const region = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const lastSelected = useRef<HotspotId | null>(null);
  const request = requested ?? { preset: restored, sequence: 0 };
  const preset = request.preset;
  const retry = useCallback(() => setAttempt(value => value + 1), []);
  const onSceneState = useCallback((event: SceneEvent) => {
    const expected = pendingScene.current ?? { id: readStableScene(), sequence: 0 };
    if (event.request.id === expected.id && event.request.sequence === expected.sequence) setSceneEvent(event);
  }, []);
  const chooseScene = useCallback((id: SceneId) => {
    setExhibitRequest(value => ({ selected: false, sequence: value.sequence + 1 }));
    const next = { id, sequence: (pendingScene.current?.sequence ?? 0) + 1 };
    pendingScene.current = next;
    setSceneChoice(next); setSceneEvent(null); setSceneNotice("");
    return next;
  }, []);
  const select = useCallback((id: HotspotId) => {
    lastSelected.current = id;
    setRequested(current => ({ preset: id, sequence: (current?.sequence ?? 0) + 1 }));
    controls.current[id]?.focus({ preventScroll: true });
  }, []);
  const back = useCallback(() => {
    const previous = isHotspotId(preset) ? preset : lastSelected.current;
    setRequested(current => ({ preset: "overview", sequence: (current?.sequence ?? 0) + 1 }));
    if (previous) controls.current[previous]?.focus({ preventScroll: true });
    else heading.current?.focus({ preventScroll: true });
  }, [preset]);
  const returnHub = useCallback(() => {
    const cancelled = scenePhase === "loading";
    const next = chooseScene("hub");
    if (cancelled) setSceneEvent({ request: next, phase: "cancelled" });
    setRequested(current => ({ preset: readStablePreset(), sequence: (current?.sequence ?? 0) + 1 }));
    setSceneNotice(cancelled ? "Scene loading cancelled. Central Hub restored." : "Returned to the Central Hub.");
  }, [chooseScene, scenePhase]);
  const enterBay = useCallback(() => {
    // Leaving during hub travel restores only the last completed hub preset.
    setRequested(current => ({ preset: readStablePreset(), sequence: (current?.sequence ?? 0) + 1 }));
    chooseScene("development");
  }, [chooseScene]);
  const reset = useCallback(() => {
    resetStableScene();
    saveStablePreset("overview");
    if (sceneRequest.id !== "hub") chooseScene("hub");
    back();
  }, [back, chooseScene, sceneRequest.id]);
  useEffect(() => {
    if (!desktop || scenePhase !== "ready") return;
    saveStableScene(sceneRequest.id);
    if (sceneRequest.sequence > 0) {
      if (sceneRequest.id === "development") heading.current?.focus({ preventScroll: true });
      else entryButton.current?.focus({ preventScroll: true });
    }
  }, [desktop, scenePhase, sceneRequest.id, sceneRequest.sequence]);

  useEffect(() => {
    // Next's retained route views may preserve state while pausing effects.
    // On reactivation, discard any unfinished request in favor of the stable session preset.
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setExhibitRequest(value => ({ selected: false, sequence: value.sequence + 1 }));
      const stable = readStablePreset();
      setRequested(current => current && current.preset !== stable ? { preset: stable, sequence: current.sequence + 1 } : current);
      const stableScene = readStableScene();
      if (pendingScene.current && pendingScene.current.id !== stableScene) {
        const next = { id: stableScene, sequence: pendingScene.current.sequence + 1 };
        pendingScene.current = next; setSceneChoice(next); setSceneEvent(null);
      }
    });
    if (window.location.hash === "#studio-preview-heading") heading.current?.focus({ preventScroll: true });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !region.current?.contains(document.activeElement)) return;
      if (sceneRequest.id !== "hub") { event.preventDefault(); if (exhibit && exhibitRequest.selected && scenePhase === "ready") overviewExhibit(); else returnHub(); return; }
      if (preset === "overview") return;
      event.preventDefault();
      back();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [back, preset, returnHub, sceneRequest.id, exhibit, exhibitRequest.selected, overviewExhibit, scenePhase]);

  return <section ref={region} className="min-w-0 overflow-hidden border border-white/15 bg-surface" aria-labelledby="studio-preview-heading" data-studio-preset={preset} data-studio-scene={desktop ? sceneRequest.id : "hub"}>
    <div className="border-b border-white/15 px-6 py-4"><h2 ref={heading} tabIndex={-1} id="studio-preview-heading" className="text-lg">{desktop && sceneRequest.id === "development" && exhibit ? `Development Lab — ${exhibit.title}` : sceneRegistry[desktop ? sceneRequest.id : "hub"].title}</h2><p className="mt-1 text-xs text-muted">{desktop && sceneRequest.id === "development" ? exhibit ? "Text-first procedural exhibit · HTML case study is authoritative" : "M6-A1 technical review · No portfolio content" : "M3 camera & interactions · All objects are placeholders"}</p></div>
    {desktop ? <DesktopPreview exhibitEligible={!!exhibit} exhibitRequest={exhibitRequest} onExhibit={focusExhibit} key={attempt} retry={retry} sceneRequest={sceneRequest} scenePhase={scenePhase} onSceneState={onSceneState} quality={quality} request={request} reducedMotion={reducedMotion} onSelect={select} onSettled={saveStablePreset} /> : <div data-testid="scene-2d"><StaticDescription message="This lightweight HTML view keeps the layout readable on smaller screens and when JavaScript is disabled. The 3D overview is available on wider screens." /></div>}
    <StudioControls developmentTitle={exhibit?.title} developmentSelected={exhibitRequest.selected} backToHub={returnHub} hubActive={!desktop || sceneRequest.id === "hub"} quality={quality} setQuality={setQuality} preset={preset} desktop={desktop} select={select} back={back} reset={reset} buttons={controls} />
    <StudioDirectory exhibit={exhibit} selected={exhibitRequest.selected} focusExhibit={focusExhibit} overviewExhibit={overviewExhibit} exhibitButton={exhibitButton} desktop={desktop} scene={desktop ? sceneRequest.id : "hub"} phase={desktop ? scenePhase : "ready"} enter={enterBay} retry={() => { chooseScene(sceneRequest.id); retry(); }} button={entryButton} readyMs={sceneEvent?.readyMs} message={!desktop ? "The review bay is available on desktop; portfolio content remains available through HTML." : sceneNotice || sceneEvent?.message || (scenePhase === "ready" ? "Scene ready. All portfolio routes remain available." : "Loading the scene. You can cancel or browse projects.")} />
  </section>;
}
