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
