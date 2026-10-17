# Architecture

## Layers
1. **App Router:** public routes `/`, `/projects`, `/projects/[slug]`, `/services`, `/about`, `/contact`.
2. **Content:** typed local project/service records and media metadata.
3. **UI:** global navigation, page layouts, case-study templates, overlays and design tokens.
4. **3D:** lazy-loaded world canvas, scene graph, GLB asset loaders, lighting and environment.
5. **Interaction:** scene state machine, camera preset controller and hotspot-to-route mapping.
6. **Quality:** accessible fallback, error boundaries, loading and tests.

## Proposed source tree
```text
src/
  app/{page.tsx,layout.tsx,globals.css,projects/,services/,about/,contact/}
  components/{navigation/,ui/,overlays/,three/{world/,islands/,camera/,hotspots/}}
  content/{projects.ts,services.ts}
  lib/{scene/,utils/}
  types/
public/{models/,textures/,images/}
tests/
```

## State ownership
Route navigation is URL-based. Camera and overlay state are local to the world shell or a narrowly scoped provider; avoid duplicating router state in the 3D store. Store only serializable camera preset identifiers for restoration.

## Error strategy
Show readable 2D experience when scene fails; never block the whole site on 3D asset load.

## M1 implementation boundary
All page shells are Server Components. Only the global navigation is a small Client Component for URL-derived `aria-current`; its links are prerendered and remain usable without JavaScript. Mobile links wrap visibly without a toggle. `/projects/placeholder` is a local, explicitly labeled layout fixture; other project slugs return 404. All pages carry noindex/nofollow metadata as a preview precaution, not an access control. The app must not be published. No 3D, content store, backend or scene state has been implemented.

## M2 implementation boundary (supersedes M1's no-3D status)

Home remains a Server Component and embeds `StudioPreview`, a small client boundary with a server-rendered descriptive HTML view. At 768 CSS px and wider, it probes WebGL 2 and calls `import()` from an effect to load `three/world/hub-canvas.tsx`. The import never runs during SSR. Smaller screens do not load the scene module. Editorial routes remain Server Components. The 768px choice is provisional and does not approve the final mobile presentation.

The loader owns only attempt/loading/ready/failure state, not navigation or interaction state. It handles unsupported WebGL, rejected chunk requests, a 15-second first-draw watchdog, renderer exceptions and real `webglcontextlost` events. Failure keeps the HTML description/navigation and exposes a retry that remounts a fresh attempt. A React boundary is one layer, not the whole failure strategy. A desktop Canvas also has a last-resort native fallback; the first-draw watchdog covers a renderer that never becomes ready.

Scene data lives in `src/lib/scene/hub-config.ts`. Procedural components under `components/three/hub/` build the platform, workstation and display zones. `PerspectiveCamera` is imported directly from Drei's camera module; no Drei controls, physics, asset loaders, textures, particles or postprocessing are used. Installed transitive packages are not evidence that their features are implemented.

Rendering uses `frameloop="demand"`, DPR 1–1.5, no shadow maps, disabled raycast events and scroll-independent size measurement. Resize can redraw; normal operation has no continuous animation. `RendererLifecycle` observes frames and renderer counters for prototype diagnostics and context-loss handling; it does not animate objects or the camera.

## M3 camera and interaction layer (supersedes static M2 behavior)

`interaction-config.ts` centralizes four camera presets/bounds, three typed hotspot records, focus volumes and transition math. `studio-session.ts` persists only validated stable IDs with a memory fallback. StudioPreview derives a selection from the latest request; `studio-controls.tsx` provides normal HTML controls and route links outside the renderer/failure boundary.

`three/camera/camera-rig.tsx` applies one cancellable two-leg camera plan through the exterior waypoint, invalidating demand frames until stable. Motion preferences can snap the plan. A completed plan saves the stable ID; route reactivation discards unfinished requests, and recovery snaps to a fresh renderer. Camera selection does not replace or duplicate URL navigation.

Raycast events are enabled only for metadata-based scene selection; the root hit handler blocks deeper intersections and ignores inert metadata. No OrbitControls, camera-controls feature, GSAP, physics or additional animation package is used. A non-raycast amber outline marks selection. Native HTML buttons/links handle keyboard and touch alternatives. The non-modal selection section remains available during rendering failures.

Canvas data attributes record prototype camera pose, stable projection/clearance diagnostics and render counts for reproducible browser verification. They expose no alternate navigation API or test-only feature switch. Geometry diagnostic sampling is limited to demanded frames; idle rendering still stops.

## M4 editorial content contract

Canonical types: `src/content/model.ts`; local records: `src/content/editorial.ts`; validation/selectors: `src/lib/content.ts`. Editorial data is separate from Server Component presentation under `src/components/editorial/`. No CMS/API/storage service is used.

Every record has `published`, `draft` or `placeholder` status. Published records require an approval source plus owner verification and explicit public-presentation approval. Project identity, category/related references, minimum published overview/role, media alt/rights/provenance, verified outcomes and links are validated when content is imported. A failed content contract stops rendering/build instead of silently exposing incomplete data. Media paths and CV file existence must also be checked before adding actual assets; none are currently configured.

Only published projects appear in the portfolio/filter categories/related work. The sole explicit exception is `/projects/placeholder`, shown separately as a local demonstration. Draft/other placeholder routes are excluded both by generated params and runtime selection. Candidate project names from documentation are not imported. Profile drafts show only missing-input messages, and unconfirmed services/contact methods are excluded. Prototype metadata remains noindex/nofollow for every status; no structured data is added.

Projects filters use server-rendered query links (`?category=...`) and work without JavaScript. Unknown categories show an empty state with a clear-filter link; repeated category parameters use the unfiltered view. Consequently `/projects` renders at request time, while approved detail params remain statically generated. Existing small client navigation/studio boundaries are unchanged.

## M5-A procedural resource boundary

The existing lazy Canvas/client boundary, lifecycle, demand loop, camera rig and HTML portfolio are retained. Hub-local resource ownership and material batching live in `components/three/hub/primitives.tsx`; deterministic low-poly strata live in `platform.tsx`. Each furniture/display group merges geometry by surface locally, preserving separate hotspot metadata. Shared templates/materials and merged geometry have explicit unmount cleanup. No global mutable scene resource cache, new dependency or continuous frame callback is added.

## M5-B fixed lighting and static atmosphere

Geometry and camera layers are unchanged. The world uses one hemisphere fill, two directional lights and the existing workstation point light, with typed values in `src/lib/scene/look-config.ts`. No shadow map is enabled. Shared MeshStandardMaterial responses are configured there without changing M5-A's per-target static batching/resource ownership.

The desktop viewport has a static CSS midnight/purple/blue/muted-pink gradient, twelve small radial-gradient star marks and a subtle edge vignette. WebGL clears transparently above that background. Pseudo-elements are decorative and pointer-inert; the Canvas has its own stacking level and loading status remains above it. No texture, star mesh, particle loop, post-processing or camera motion is used for atmosphere. Smaller screens/failures retain their existing HTML view.

RendererLifecycle keeps its original readiness/context-loss behavior and adds one-time diagnostics for actual light/point counts, shadow-map state and context alpha. Existing demand rendering and camera transitions are unchanged. CSS painting/compositing is outside Three.js draw counters; real-device review remains necessary.

## M5-C quality boundary

`src/lib/scene/quality-config.ts` owns typed Low/Medium/High DPR ranges [1,1], [1,1.5], [1,2]. StudioPreview owns local quality state with Low initial selection; native radio controls in StudioControls pass it into the existing lazy Canvas. Canvas identity and camera request are unchanged. R3F updates pixel ratio/backbuffer on its existing renderer; antialiasing, lights, materials, geometry and reduced-motion policy are unchanged. No persistent preference is written. Retry and responsive remount retain the parent quality; a fresh document resets Low.

RendererLifecycle samples renderer memory/draw/DPR/backbuffer and unique live mesh material counts after demanded draws into canvas data attributes. Its one-shot requestAnimationFrame callback never invalidates rendering; cleanup cancels the pending callback and removes the context-loss listener. Readiness remains the first completed draw. Existing shared-resource disposal/recovery is retained because repeated-selection tests found no growth requiring a rewrite. Counters describe live renderer/scene resources, not physical GPU allocation or complete browser heap cleanup.
