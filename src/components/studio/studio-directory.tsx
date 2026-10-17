import Link from "next/link";
import type { RefObject } from "react";
import type { SceneId, ScenePhase } from "@/lib/scene/scene-registry";

export function StudioDirectory({ desktop, scene, phase, enter, retry, button, message, readyMs }: {
  desktop: boolean; scene: SceneId; phase: ScenePhase; enter: () => void; retry: () => void;
  button: RefObject<HTMLButtonElement | null>; message: string; readyMs?: number;
}) {
  return <section className="border-t border-white/15 p-6" aria-labelledby="studio-directory-title" data-testid="studio-directory" data-scene={scene} data-phase={phase} data-ready-ms={readyMs}>
    <h3 id="studio-directory-title" className="text-lg">Development review bay</h3>
    <p className="mt-2 text-sm text-muted">Technical review placeholder only: a blank procedural bench/display. No project, programming-language or skill claims are represented.</p>
    {desktop && <div className="mt-4 flex flex-wrap gap-2">
      <button ref={button} className="studio-control" type="button" onClick={enter}>Enter Development Review Bay</button>
      {phase === "failed" && <button className="studio-control" type="button" onClick={retry}>Retry review bay</button>}
    </div>}
    <p className="mt-3 text-sm text-muted" role="status" data-testid="scene-notice">{message}</p>
    <Link className="studio-control mt-3 inline-flex" href="/projects">Browse Projects</Link>
  </section>;
}
