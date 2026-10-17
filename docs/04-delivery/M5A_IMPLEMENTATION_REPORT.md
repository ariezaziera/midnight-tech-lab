# M5-A — Procedural Cinematic Asset & Composition Refinement

Date: 2026-10-17 (Asia/Kuala_Lumpur). Base: accepted M4 commit `cc4363d`. **Historical M5-A report. Owner accepted M5-A and authorized M5-B on 2026-10-17. Final cinematic approval and real-device validation remain open.**

## Summary and scope

The existing floating Central Hub now has a layered rock foundation, a more deliberately constructed workstation/chair/lamp, neutral framed Creator ID and project exhibition structures, and small integrated selection marks. This is an original procedural art study, not photorealism or final cinematic approval. No Blender, external modeling software, paid asset, downloaded model, image texture or new dependency was required.

The 8m platform footprint, four camera presets, transitions, three hotspot IDs and their HTML route actions remain. M4 editorial content/publication rules and all routes are unchanged. No new island, module, camera feature, contact functionality or deployment is included. Lighting, background, renderer configuration and demand rendering retain the accepted implementation; no M5-B effect was introduced.

## Audit and fresh baseline

Read AGENTS and the required product/design/experience/technical/delivery documentation, M4 report and current source. Inspected the camera rig/configuration, typed ancestor hotspot resolution, loader/recovery lifecycle, original primitives and M3/M4 screenshots/measurements. Reviewed earlier-central-hub and phase-8-production boards as broad composition references only; none of their depicted artwork, portrait, written claims or measurements were imported.

Before changing application source, ran clean installation and a production build of accepted M4. `scripts/capture-hub.mjs before` recorded all four preset views and three fresh Chromium-context samples. Application source was still unchanged at capture. Baseline screenshots are retained under `evidence/m5a/before/`; renaming them to the unique `preset-*` prefix preserves their original pixels and avoids collisions with editorial route screenshots.

The source hierarchy had a platform/cone/seven rock pieces, individual block/monitor meshes, typed workstation/Creator ID/project groups, inert console/globe, and a debug selection-box mesh. M3 target-space limits remain canonical in `interaction-config.ts`. RendererLifecycle still observes readiness and context loss; StudioPreview still owns lazy loading, mobile/no-JS HTML and retry. Neither was rewritten.

## Geometry and composition

- **Island:** retained 4m radius, 0.32m upper slab and 12-sided plan. A single deterministic rock mesh connects seven irregular but controlled shrinking strata, closing at Y=-2.53m. Material bands and a fuller mid-section make the lower silhouette visible. The complete rock stays inside the retained footprint, with no noisy satellite fragments. A narrow structural rim and six short accents replace the continuous bright ring.
- **Workstation:** retained 3.4×0.16×1.45m desk envelope and original location. Chamfered top, underframe/supports, dual monitors with stands/bezel construction, desk mat, abstract keyboard rows and mouse give the workstation a clearer purpose. Screens stay blank: no fictional code/project screenshot is implied.
- **Chair:** shaped seat/back/headrest, arm supports, stem and five spokes replace the block chair. It remains a lightweight silhouette rather than a production model.
- **Lamp:** base, stem, arm, shade and warm underside disc replace the simple stem/cone. Visual review moved the shade slightly outward/up so it reads beside the monitor; its highest point remains below the existing 2.7m path guard. The actual point-light position, color, intensity, distance and decay are unchanged.
- **Creator ID:** layered neutral frame, support rails and pedestal make the display an installation. Abstract empty plate/marks depict neither a face nor factual biography/statistics.
- **Project Display:** stepped exhibition plinth, inset spine and framed blank panel replace the single pedestal block. No title, result, client work or project imagery was added.
- **Secondary structures:** console receives a bordered inset panel; globe receives a narrow base accent. Both remain non-interactive.

An early visual pass left the rock too dark/recessed in the overview despite passing geometry tests. Its surface palette and mid-strata radii were adjusted within the same bounds; lighting and camera were not changed. Final matched screenshots and measurements were regenerated afterward. Focused views intentionally crop unrelated objects, as in the accepted camera system.

## Materials, batching and lifecycle

MeshStandardMaterial remains the primary surface material, with controlled roughness, modest metalness on metal/trim and restrained emissive accents. Rock uses deterministic face colors and flat shading. Desk tones distinguish warm wood from dark metal, upholstery, screens and trim. No texture, shader effect, bloom, fog, particles, shadow map or extra light was added.

`HubResources` owns shared primitive templates and a typed material palette for each mounted hub. `StaticParts` transforms and merges primitives by surface **within each logical target**, reducing draws while preserving metadata ancestry. The Three.js merge utility is imported from the already installed package; it adds no dependency. Merged buffers, rock resources and shared materials have unmount cleanup, including renderer-retry replacement. No global mutable geometry cache or new continuous frame callback was introduced.

## Selection, cameras and interactions

The large amber wireframe volume is removed. Small non-animated amber corner marks attach to the Creator ID/project frames and both workstation monitor frames. They are one decorative material batch per selected target, excluded from pointer and diagnostic rays. The existing HTML buttons still provide pressed state, Selected text, visible focus, live status and route actions.

No camera coordinate, target, FOV, clipping, bounds, waypoint or duration changed. All presets retain FOV 38°, near 0.1m and far 60m:

- overview: position `[8,7,10]`, target `[0,0.25,0]`.
- creator: position `[-5,3.5,4.5]`, target `[-2.6,1.36,-0.8]`.
- projects: position `[-5,3.5,7]`, target `[-2.4,1.81,1.7]`.
- workstation: position `[1,4.5,6.5]`, target `[0.25,1.95,-0.65]`.

Typed IDs still map creator to `/about`, projects to `/projects`, and workstation to focus/overview. Nearest-hit metadata resolution still works on merged meshes; nothing infers behavior from names. Back, Reset, scoped Escape, rapid selections, reduced-motion snapping, keyboard/pointer equivalents and stable route restoration are preserved. Target projection, center-ray hits and conservative mesh-bounds clearance pass at 1024×900 and 1440×900. These are basic fixed-scene checks, not a general collision engine.

## Before/after visual evidence

Fresh same-view baseline and final capture pairs:

- Overview: [before](evidence/m5a/before/preset-overview.png), [after](evidence/m5a/after/preset-overview.png).
- Creator ID: [before](evidence/m5a/before/preset-creator.png), [after](evidence/m5a/after/preset-creator.png).
- Project Display: [before](evidence/m5a/before/preset-projects.png), [after](evidence/m5a/after/preset-projects.png).
- Workstation: [before](evidence/m5a/before/preset-workstation.png), [after](evidence/m5a/after/preset-workstation.png).
- [Side-by-side comparison PNG](evidence/m5a/comparison.png) and [local HTML comparison](evidence/m5a/comparison.html). The capture utility verified all eight comparison images loaded before saving the comparison screenshot.
- [Mobile HTML fallback, 390×844](evidence/m5a/after/mobile-2d.png).
- [Unsupported WebGL fallback](evidence/m5a/after/desktop-unsupported-webgl.png).

All matched desktop presets use 1440×900. Evidence inventory: 36 PNGs, five JSON files and one HTML comparison. Additional regression evidence includes all six HTML routes on desktop/mobile, selected states, reduced motion, loading/download/initialization/context-loss failures and camera measurements. Baseline and final captures were inspected for silhouette, subject readability, frame placement and selection feedback. The model remains visibly faceted and intentionally sparse; final reference crops/visual approval are outstanding.

## Performance measurements and gate

Protocol: Windows, Node 22.14.0/npm 11.16.0, Chromium 156.0.8078.4, local production builds, 1440×900, fresh browser context per sample, no network throttling, same capture script/renderer settings. DPR remains 1–1.5; Canvas remains 440px high. Masked renderer is WebKit WebGL; actual GPU/hardware acceleration and the owner's physical laptop model were not established.

Fresh accepted-M4 baseline versus final M5-A, three runs each:

- Initial readiness: baseline **951/868/669ms**, final **795/718/825ms**. Medians **868 → 795ms**. These small local samples do not establish a general speedup.
- Draw calls: **49 → 30** in every initial sample, 19 fewer (~38.8%).
- Triangles: **866 → 1,680**, 814 more (~94.0%). This is a real geometry-cost trade-off, not a claim that every metric improved.
- Renderer geometry count: **49 → 30**, 19 fewer (~38.8%).
- Renderer texture count: **1 → 1**. No external texture asset is requested; this is a renderer counter rather than an asset inventory.
- All-JavaScript ResourceTiming transfer: **390,239 → 392,831 bytes**, +2,592 bytes (~0.66%), including framework/shell/scene and reported transfer overhead.
- Idle observation: frame count **2 → 2** across the 750ms interval in every before/after sample. No continuous animation was added. All six capture contexts recorded zero page errors.

The responsible geometry changes were optimized through shared templates/materials and per-target batching rather than accepting a draw-call increase. The final absolute mesh complexity is below the added 3,000-triangle/35-draw/geometry regression guards; those are implementation checks, not owner-approved hardware budgets. Measurements do not show a readiness or idle regression in this environment, but cannot prove that extra vertices cost nothing on the owner's GPU. Review on that older laptop remains a gate. No FPS, GPU-memory, broad compatibility or photorealism claim is made.

Raw comparable samples: [before](evidence/m5a/before/measurements.json), [after](evidence/m5a/after/measurements.json). Separate full-suite scene/camera measurements are under `after/`; their timings include two-worker test load and are not substituted for the matched three-run comparison.

## Exact validation results

- `npm ci`: **PASS, exit 0**, 427 packages installed / 428 audited in 6m. Existing five high development-only audit findings, ESLint support notice and pending unrs-resolver install-script notice remain tracked. No forced fix or blanket script approval was used.
- `npm run lint`: **PASS, exit 0**, zero warnings on the final source/capture utility.
- `npm run typecheck`: **PASS, exit 0**, generated route types plus strict TypeScript.
- `npm run build`: **PASS, exit 0**, final visually reviewed geometry/material values and all editorial route generation.
- `npm test`: **PASS, exit 0 — 49 passed in 2.0m**.
- `npm audit --omit=dev`: **PASS, exit 0 — zero production vulnerabilities**. No dependency or lockfile change.
- Restored development preview smoke: **PASS, exit 0** — HTTP 200, ready scene, Creator selection and Escape to overview, zero page errors.
- `node scripts/capture-hub.mjs before` and final `after`: **PASS, exit 0**, three samples/four views each, final comparison assets all loaded.

Two focused additions test deterministic/finite/outward-facing low-poly strata within the retained footprint, plus draw/geometry/triangle guards, every focused target and demand rest. The full suite preserves 47 M1–M4 checks covering editorial publication restrictions/routes/noindex, no-JS navigation, keyboard/touch/mobile overflow, target selection, Back/Reset/Escape, rapid/interrupted requests, reduced motion, restoration, WebGL unsupported/renderer/download/timeout/context loss and fresh retry.

Earlier validation is not substituted for final results: first lint flagged the React rule requiring an inline useMemo callback; this was fixed. An npm filtered-test attempt failed to forward --grep and found no tests; invoking Playwright directly then passed seven focused checks in 32.2s. An intermediate full suite passed 49 in 2.1m, and another passed 49 in 1.8m before the final rock-readability adjustment. The full suite is rerun after that final adjustment. Test output may show the existing R3F Clock deprecation and a Three.js CommonJS deprecation from Playwright's Node-side import transformation; application source uses ES imports and no dependency update or warning suppression was applied.

## Accessibility and fallback status

HTML controls, text selected state/focus, ordinary links and semantic editorial content remain independent of 3D. Corner marks supplement those controls rather than replacing them. Reduced motion retains direct preset changes. Mobile below 768 CSS px remains content-first HTML without downloading the scene. Lazy loading, unsupported WebGL, initialization/download/timeout/context-loss explanations and fresh retry remain covered. No image/portrait is substituted and no content needs hover or camera travel.

Browser observations are not WCAG conformance or screen-reader certification. Physical mobile devices, Safari/Firefox, assistive technologies and actual older-laptop rendering remain untested.

## Changed files and remaining gates

Scene/config: `src/components/three/hub/{platform,workstation,display-zones,primitives,central-hub}.tsx`, `src/lib/scene/hub-config.ts`. Camera config/rig, world rendering lifecycle and M4 editorial/content files are unchanged.

Validation/evidence: new `tests/refinement.spec.ts`, `scripts/capture-hub.mjs`, M5-A evidence and this report. Existing four suites change only evidence destinations to preserve M4 captures. Milestone docs updated: DECISIONS, SCENE_GRAPH, ASSET_MANIFEST, ARCHITECTURE, TECHNICAL_REQUIREMENTS, PERFORMANCE, CAMERA_SYSTEM, ACCESSIBILITY, ACCEPTANCE_CRITERIA, IMPLEMENTATION_PLAN, TASKS, README, CHANGELOG and historical M4 acceptance note.

Remaining visual issues: sparse blank displays, visible low-poly edges, simple material response and existing flat cosmic background/lighting. Actual portrait/project artwork and final editorial approvals remain missing. More geometry is not a substitute for approved content. No production effect or asset is silently substituted.

M5-B may address lighting/atmosphere/effects only after separate authorization; no bloom, volumetrics, particles, shadow system or lighting pass was started. M5-C scope and M6 remain unauthorized. Final visuals, device budgets, dependency maintenance, content/media rights and release/deployment decisions remain open.

**Request owner review of the M5-A geometry, selection treatment, before/after evidence and triangle-cost trade-off on the actual laptop. Changes are committed on the existing authorized branch. Stop here; no push/deployment or M5-B/M5-C/M6 work is included.**
