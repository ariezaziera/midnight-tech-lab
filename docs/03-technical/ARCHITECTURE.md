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
