import Link from "next/link";
import type { RefObject } from "react";
import { qualityIds, qualityPolicy, type GraphicsQuality } from "@/lib/scene/quality-config";
import { hotspots, hotspotIds, type CameraPresetId, type HotspotId } from "@/lib/scene/interaction-config";

export function StudioControls({ preset, desktop, select, back, reset, buttons, quality, setQuality }: {
  quality: GraphicsQuality; setQuality: (quality: GraphicsQuality) => void;
  preset: CameraPresetId; desktop: boolean; select: (id: HotspotId) => void; back: () => void; reset: () => void;
  buttons: RefObject<Partial<Record<HotspotId, HTMLButtonElement | null>>>;
}) {
  const selected = preset === "overview" ? null : hotspots[preset];
  return <div className="border-t border-white/15 p-6" data-testid="studio-actions">
    {desktop && <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Studio focus controls">
        {hotspotIds.map(id => <button key={id} ref={node => { buttons.current[id] = node; }} type="button" className="studio-control" aria-pressed={preset === id} onClick={() => select(id)}>{hotspots[id].title}{preset === id && <span className="ml-2 text-xs">· Selected</span>}</button>)}
      </div>
      <fieldset className="mt-4" aria-describedby="quality-description">
        <legend className="text-sm">Graphics quality</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {qualityIds.map(id => <label key={id} className="studio-control cursor-pointer has-[:checked]:border-amber has-[:checked]:text-amber">
            <input className="mr-2 accent-amber" type="radio" name="graphics-quality" value={id} checked={quality === id} onChange={() => setQuality(id)} />{qualityPolicy[id].label}
          </label>)}
        </div>
        <p id="quality-description" className="mt-2 text-xs text-muted">Pixel detail only. Low uses less graphics work on high-density screens. Motion preference is separate.</p>
      </fieldset>
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
