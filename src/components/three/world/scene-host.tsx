import { Component, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { CentralHub } from "../hub/central-hub";
import { CameraRig, type CameraRigProps } from "../camera/camera-rig";
import type { HotspotId } from "@/lib/scene/interaction-config";
import type { SceneEvent, ScenePhase, SceneRequest } from "@/lib/scene/scene-registry";

type Props = CameraRigProps & { sceneRequest: SceneRequest; scenePhase: ScenePhase; onSceneState: (event: SceneEvent) => void; onSelect: (id: HotspotId) => void };
type Loaded = { request: SceneRequest; startedAt: number; View?: ComponentType; fail: () => void };
class GraphBoundary extends Component<{ children: ReactNode; fail: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.fail(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Two graphs only. Loading disposes the previous graph; successful switches keep Canvas. */
export function SceneHost({ sceneRequest, scenePhase, onSceneState, ...hub }: Props) {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    let active = true;
    const startedAt = performance.now();
    onSceneState({ request: sceneRequest, phase: "loading" });
    const fail = () => {
      if (!active) return;
      active = false;
      if (timer.current) clearTimeout(timer.current);
      setLoaded(null);
      onSceneState({ request: sceneRequest, phase: "failed", message: "The review scene could not initialize or download. Retry, return to the Central Hub, or browse projects." });
    };
    timer.current = setTimeout(() => {
      if (!active) return;
      active = false;
      setLoaded(null);
      onSceneState({ request: sceneRequest, phase: "failed", message: "The review scene took too long to become ready. Retry or return to the Central Hub." });
    }, 15000);
    void (async () => {
      try {
        // No Development import until explicitly requested (or validated stable restoration).
        const View = sceneRequest.id === "development" ? (await import("../zones/development-scene")).default : undefined;
        await Promise.resolve();
        if (active) setLoaded({ request: sceneRequest, startedAt, View, fail });
      } catch { fail(); }
    })();
    return () => { active = false; if (timer.current) clearTimeout(timer.current); };
  }, [sceneRequest, onSceneState]);
  useEffect(() => { if (scenePhase === "ready" && timer.current) clearTimeout(timer.current); }, [scenePhase]);

  if (!loaded || loaded.request.id !== sceneRequest.id || loaded.request.sequence !== sceneRequest.sequence) return null;
  return <group name="ActiveStudioGraph" userData={{ studioScene: loaded.request.id, sceneSequence: loaded.request.sequence, startedAt: loaded.startedAt }}>
    <GraphBoundary key={`${sceneRequest.id}:${sceneRequest.sequence}`} fail={loaded.fail}>
      {loaded.View ? <loaded.View /> : <><CentralHub selected={hub.request.preset === "overview" ? null : hub.request.preset} onSelect={hub.onSelect} /><CameraRig request={hub.request} reducedMotion={hub.reducedMotion} onSettled={hub.onSettled} /></>}
    </GraphBoundary>
  </group>;
}
