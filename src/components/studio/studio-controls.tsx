import Link from "next/link";
import type { RefObject } from "react";
import { hotspots, hotspotIds, type CameraPresetId, type HotspotId } from "@/lib/scene/interaction-config";

export function StudioControls({ preset, desktop, select, back, reset, buttons }: {
  preset: CameraPresetId; desktop: boolean; select: (id: HotspotId) => void; back: () => void; reset: () => void;
  buttons: RefObject<Partial<Record<HotspotId, HTMLButtonElement | null>>>;
}) {
  const selected = preset === "overview" ? null : hotspots[preset];
  return <div className="border-t border-white/15 p-6" data-testid="studio-actions">
    {desktop && <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Studio focus controls">
        {hotspotIds.map(id => <button key={id} ref={node => { buttons.current[id] = node; }} type="button" className="studio-control" aria-pressed={preset === id} onClick={() => select(id)}>{hotspots[id].title}{preset === id && <span className="ml-2 text-xs">· Selected</span>}</button>)}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={back} disabled={preset === "overview"} className="studio-control">Back to overview</button>
        <button type="button" onClick={reset} className="studio-control">Reset view</button>
      </div>
    </>}
    <section className={desktop ? "mt-5" : ""} aria-labelledby="studio-selection-title">
      <h3 id="studio-selection-title" className="text-lg">{selected?.title ?? "Studio overview"}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{selected?.description ?? (desktop ? "Select an object or use the focus controls. Escape returns to the overview. All objects remain blockout placeholders." : "Explore the portfolio through these HTML links. The workstation overview is described above.")}</p>
      <p className="sr-only" role="status">{selected ? `${selected.title} selected.` : "Studio overview selected."}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/about" className={preset === "creator" ? "action" : "action action-secondary"}>About Arieza <span aria-hidden="true">↗</span></Link>
        <Link href="/projects" className={preset === "projects" ? "action" : "action action-secondary"}>Browse projects <span aria-hidden="true">↗</span></Link>
        {!desktop && <a href="#studio-preview-heading" className="studio-control">Workstation overview</a>}
      </div>
    </section>
  </div>;
}
