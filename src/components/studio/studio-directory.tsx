import type { DevelopmentExhibit } from "@/lib/scene/zone-content";
import Link from "next/link";
import type { RefObject } from "react";
import type { SceneId, ScenePhase } from "@/lib/scene/scene-registry";

export function StudioDirectory({ desktop, scene, phase, enter, retry, button, message, readyMs, exhibit, selected, focusExhibit, overviewExhibit, exhibitButton }: {
  exhibit: DevelopmentExhibit | null; selected: boolean; focusExhibit: () => void; overviewExhibit: () => void; exhibitButton: RefObject<HTMLButtonElement | null>;
  desktop: boolean; scene: SceneId; phase: ScenePhase; enter: () => void; retry: () => void;
  button: RefObject<HTMLButtonElement | null>; message: string; readyMs?: number;
}) {
  return <section className="border-t border-white/15 p-6" aria-labelledby="studio-directory-title" data-testid="studio-directory" data-scene={scene} data-phase={phase} data-ready-ms={readyMs}>
    <h3 id="studio-directory-title" className="text-lg">{exhibit ? `${exhibit.title} · Development exhibit` : "Development review bay"}</h3>
    <p className="mt-2 text-sm text-muted">{exhibit ? "Text-first exhibit using an original procedural display marker, not project imagery. The approved HTML case study is the source of project information." : "Technical review placeholder only: a blank procedural bench/display. No project, programming-language or skill claims are represented."}</p>
    {desktop && <div className="mt-4 flex flex-wrap gap-2">
      <button ref={button} className="studio-control" type="button" onClick={enter}>{exhibit ? "Enter Development Lab" : "Enter Development Review Bay"}</button>
      {phase === "failed" && <button className="studio-control" type="button" onClick={retry}>Retry review bay</button>}
    </div>}
    {exhibit && <section className="mt-5" aria-label={exhibit.title + " exhibit explanation"}>
      {desktop && scene === "development" && <div className="flex flex-wrap gap-2 mb-4"><button ref={exhibitButton} type="button" className="studio-control" aria-pressed={selected} disabled={phase !== "ready"} onClick={focusExhibit}>Focus {exhibit.title}</button><button type="button" className="studio-control" disabled={!selected} onClick={overviewExhibit}>Back to Development overview</button></div>}
      <details>
      <summary className="studio-control cursor-pointer">About {exhibit.title}</summary>
      <h4 className="mt-3 text-lg">{exhibit.title}{selected && desktop && scene === "development" ? " · Selected" : ""}</h4>
      <p className="mt-3 text-sm text-muted">{exhibit.summary}</p>
      <p className="mt-3 text-sm text-muted whitespace-pre-line">{exhibit.contribution}</p>
      <p className="mt-3 text-sm text-muted whitespace-pre-line">{exhibit.approach}</p>
      </details>
      <Link className="action action-secondary mt-4" href={exhibit.href}>Read {exhibit.title} case study</Link>
      <p className="sr-only" role="status">{selected && scene === "development" ? exhibit.title + " selected. Escape returns to Development overview." : "Development overview."}</p>
    </section>}
    <p className="mt-3 text-sm text-muted" role="status" data-testid="scene-notice">{message}</p>
    <Link className="studio-control mt-3 inline-flex" href="/projects">Browse Projects</Link>
  </section>;
}
