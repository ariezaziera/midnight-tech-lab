# M5-B — Cinematic Lighting, Materials & Cosmic Atmosphere

Date: 2026-10-17 (Asia/Kuala_Lumpur). Base: accepted M5-A commit `3102413`. **M5-B implementation delivered for owner review; M5-C/M6 remain unstarted.**

## Summary

The accepted procedural Central Hub now combines warm workstation focus with cool fill/rim light, selectively tuned shared materials, and a static midnight cosmic background. This is a restrained lighting/material study rather than final cinematic or photorealistic approval. M5-A geometry, the four M3 camera presets, three hotspot mappings, selection-corner construction and the M4 editorial portfolio remain intact.

No Blender, paid/downloaded model, artwork, texture, new dependency or hardware is required. No post-processing, bloom, volumetric effect, shadow map, particle animation, camera feature, island/module, graphics-settings UI or contact change was introduced. Nothing is deployed.

## Audit and fresh baseline

Reviewed AGENTS and the product/decision, design/reference, camera/experience, architecture/requirements/performance, scene/asset and delivery documents, plus the M5-A report and committed scene source. Inspected the concept board and M5-A overview/workstation evidence. The generated references guide color/mood only; their portrait, artwork and written claims are not content sources.

After clean installation, built accepted M5-A and captured a fresh baseline **before changing application source**. `node scripts/capture-hub.mjs before m5b` recorded all four presets and three new browser-context measurements under `evidence/m5b/before/`. The utility now accepts a milestone argument; earlier milestone evidence is preserved. Historical M5-A figures are context only, not substitutes for this fresh baseline.

## Lighting changes

`src/lib/scene/look-config.ts` centralizes the fixed light setup and shared material responses. Four lights remain, with one point light and no shadow maps:

- **Hemisphere fill:** sky `#b5b4db`, ground `#7889af`, intensity **1.65**. Replaces the old white ambient light with cool separation and legible lower surfaces.
- **Warm directional key:** position `[3,6,4]`, color `#ffd8ac`, intensity **2.2**. Establishes warmer foreground/desk response without a new light.
- **Cool directional rim:** position `[-4,2,-3]`, color `#8c8be0`, intensity **2.8**. Helps the structural/display silhouette separate from the background.
- **Desk-lamp point:** existing workstation-local position `[1.4,2.15,-0.3]`, color `#ffc77a`, intensity **8**, distance **3.5m**, decay **2**. With the retained workstation transform, its world position remains `[1.4,2.31,-0.95]`. The shorter reach keeps the practical emphasis near the desk.

These are intentional prototype values for the installed Three/R3F implementation, not calibrated photometric or final reference measurements. Light positions/configuration are static; no camera-dependent lighting or animation was added. Exposure/tone-mapping behavior was not intentionally changed. Antialiasing, low-power preference, DPR 1–1.5 and demand rendering remain.

The initial pass was too dark around the rock and furniture. Visual review led to a stronger cool fill/rim and lifted dark surface values, rather than adding lights or moving cameras. The final evidence/measurements use that corrected version. No change to geometry or camera was needed to hide poor lighting.

## Atmosphere/background implementation

The desktop scene viewport uses static CSS gradients: deep midnight base, restrained purple/blue variation, a small muted-pink atmospheric contribution and an edge vignette. Twelve tiny radial-gradient star marks add sparse detail. All layers are authored CSS colors, not third-party/generated artwork or nebula images.

The WebGL context now has alpha enabled and clears with zero alpha; the old solid Three.js background is removed. The Canvas sits above the CSS decoration. Pseudo-elements have pointer-events disabled and no focus/content semantics. The loading status remains above the scene; failure/mobile branches retain their normal HTML presentation.

There is no star geometry, texture, expensive CSS filter, custom shader, asset download, continuous particle loop or new animation. The background is screen-space decoration and intentionally has no parallax. Reduced motion needs no additional atmosphere mode because the background is static for everyone. No quality-control UI was added.

## Material and emissive refinements

M5-A's shared material/geometry lifecycle and per-target batching are preserved. Existing MeshStandardMaterial surfaces now take explicit typed roughness/metalness/emission values from `look-config.ts`:

- Warm desk: roughness **0.72**, metalness **0**; warmer walnut tone.
- Dark metal/trim: roughness **0.72/0.78**, metalness **0.2/0.15**, restrained reflections rather than mirror surfaces.
- Screens: roughness **1**, metalness **0**, zero emission; all displays remain blank/neutral.
- Structural/frame accents: emissive intensity **0.28/0.22**; cyan accents/globe **0.15**.
- Amber lamp underside and selected corners: emissive intensity **0.4**, providing static selected-state readability without bloom.
- Upholstery remains rough/non-metallic. Rock strata/vertex colors and mesh are unchanged; their perceived separation comes from the new lighting.

The globe remains an inert wireframe placeholder. No portrait, project screenshot/title, statistic or biography was fabricated. Global editorial typography/layout, semantic controls and publication rules are unchanged.

## Before/after visual evidence

Evidence contains 37 PNGs, five JSON measurement files and one HTML comparison. Matched desktop screenshots use 1440×900, identical geometry/camera presets and the same capture protocol:

- Overview: [before](evidence/m5b/before/preset-overview.png), [after](evidence/m5b/after/preset-overview.png).
- Creator ID: [before](evidence/m5b/before/preset-creator.png), [after](evidence/m5b/after/preset-creator.png).
- Project Display: [before](evidence/m5b/before/preset-projects.png), [after](evidence/m5b/after/preset-projects.png).
- Workstation: [before](evidence/m5b/before/preset-workstation.png), [after](evidence/m5b/after/preset-workstation.png).
- [Combined comparison PNG](evidence/m5b/comparison.png), [local HTML comparison](evidence/m5b/comparison.html).
- [Mobile 2D fallback, 390×844](evidence/m5b/after/mobile-2d.png).
- [Unsupported WebGL](evidence/m5b/after/desktop-unsupported-webgl.png).
- [Reduced-motion atmosphere/selection](evidence/m5b/after/reduced-motion-atmosphere.png).

Final overview/Creator ID/workstation and combined views were inspected for silhouette, desk warmth, display visibility, star restraint, selected corner legibility and unchanged HTML controls. A final Project Display pair is included in the combined comparison. Lower strata and dark parts remain subdued intentionally; this is not an approved final screen match. Blank screens and faceted procedural geometry remain visible limitations. No pixel-perfect fidelity claim is made against unapproved boards.

## Performance comparison and limitations

Environment: Windows, Node **22.14.0**, npm **11.16.0**, Chromium **156.0.8078.4**, local production builds, no network throttling, 1440×900, fresh browser contexts, three samples per phase. Canvas height **440px** and DPR **1–1.5** are retained. The masked renderer reports **WebKit WebGL**; physical GPU/acceleration and the owner's real laptop performance were not identified or benchmarked.

Fresh M5-A baseline versus final M5-B:

- Initial readiness **1436/789/1103ms → 1672/1003/837ms**; medians **1103 → 1003ms**. Startup variance is substantial; these samples do not prove a general speedup.
- Draw calls **30 → 30**.
- Triangles **1680 → 1680**.
- Renderer geometries **30 → 30**.
- Renderer textures **1 → 1**; no image texture is requested.
- All-JavaScript ResourceTiming transfer **392,831 → 393,066 bytes**, **+235 bytes** in each matched sample.
- CSS transfer in the first sample **4,773 → 5,120 bytes**, **+347 bytes**. ResourceTiming includes reported transfer overhead and framework/global styles, not just the new rules.
- Every idle sample remains at frame **2 → 2** across the **750ms** observation interval, before and after.
- All six matched contexts recorded **zero page errors**.
- Final live diagnostics confirm **4 lights**, **1 point light**, **shadow maps off**, **context alpha on**. Baseline's four-light setup is also evident in the accepted source; its older diagnostics did not include these additional fields.

No WebGL rendering-count increase was accepted. Static CSS was chosen instead of added star geometry or an effect pipeline. Alpha composition and CSS painting are still work for the browser and are **not captured by Three.js draw/triangle counters**. Their real-GPU cost was not measured. No production FPS, GPU memory, broad hardware compatibility or older-laptop smoothness claim is made. Actual owner-device review remains required before more effects/quality decisions.

Raw comparable data: [baseline](evidence/m5b/before/measurements.json), [final](evidence/m5b/after/measurements.json). Full-suite scene/camera measurements under `after/` are separate observations affected by two-worker test load.

## Exact validation results

- `npm ci`: **PASS, exit 0**, **427 installed / 428 audited in 6m**. Existing five high development-only audit findings, ESLint support notice and pending unrs-resolver postinstall notice remain tracked. No forced dependency update or blanket script approval.
- `npm run lint`: **PASS, exit 0**, zero warnings after the final light/material adjustment.
- `npm run typecheck`: **PASS, exit 0**, route generation plus strict TypeScript.
- `npm run build`: **PASS, exit 0**, final scene and all editorial routes; existing request-rendered Projects filtering/static permitted detail behavior retained.
- `npm test`: **PASS, exit 0 — 51 passed in 2.2m**.
- `npm audit --omit=dev`: **PASS, exit 0 — zero production vulnerabilities**.
- Restored development preview: **PASS, exit 0** — HTTP 200, lit transparent scene, four lights/no shadows, Creator selection and Escape, zero page errors.
- `node scripts/capture-hub.mjs before m5b` and final `after m5b`: **PASS, exit 0**, repeated measurements and matched four-preset screenshots. All eight comparison images were verified loaded before capture.

All **49 existing M1–M5-A checks** are retained; none are deleted or weakened for M5-B. Two new browser checks cover the live light/point/shadow/alpha budget, unchanged initial geometry cost, static/pointer-inert gradients, real pointer selection through decoration, idle frames, no external media/font request, reduced motion and mobile removal of the canvas/backdrop. Existing tests cover 404/publication/noindex, normal/no-JS HTML routes, keyboard/touch/focus, overflow, all three targets, Back/Reset/Escape, rapid requests, restoration and WebGL unsupported/init/download/timeout/context-loss recovery.

The first visual pass was rejected as too dark, then corrected and rebuilt/recaptured before final tests. Its earlier timing observations are not substituted for final data. Expected upstream R3F Clock and Node-side Three CommonJS deprecation messages remain maintenance limitations; no warning suppression or package changes were used.

## Accessibility and fallback verification

Static CSS decoration adds no focus target, accessible content or mandatory motion. Existing HTML buttons retain pressed state, Selected text, focus indicators and polite status; ordinary About/Projects links remain available without camera movement. Corner geometry remains non-raycast and unchanged. Navigation and editorial content remain independent of WebGL and JavaScript.

Mobile below 768px remains the existing HTML view with no scene chunk/canvas, including on touch/no-JS paths. Unsupported, initialization/download failure, loading timeout, context loss and fresh retry remain protected by tests. No form, backend or contact destination was added, and prototype noindex/nofollow remains.

Chromium observations do not establish WCAG conformance or screen-reader compatibility. Physical devices, Safari/Firefox, assistive technology, actual laptop FPS/GPU memory and CSS-compositing benchmarks were not tested.

## Files changed, remaining M5-C work and owner review

New: `src/lib/scene/look-config.ts`, `tests/atmosphere.spec.ts`, this report and M5-B evidence.

Runtime changes: `three/world/hub-canvas.tsx` (light setup, transparent clear and one-time diagnostics), `three/hub/primitives.tsx` (typed shared material responses), `workstation.tsx` (lamp config), `display-zones.tsx` (globe material), `lib/scene/hub-config.ts` (surface colors and metrics type), `studio/studio-preview.tsx` (background class/loading stack), `app/globals.css` (scoped static atmosphere).

Validation: existing four suites only update evidence destinations; the M5-A refinement suite is unchanged. `scripts/capture-hub.mjs` accepts a milestone folder without overwriting prior evidence. No dependency/lockfile, editorial data/route, geometry, camera rig/config or hotspot behavior changes.

Docs updated: DECISIONS, DESIGN_SYSTEM, ACCESSIBILITY, ARCHITECTURE, SCENE_GRAPH, ASSET_MANIFEST, TECHNICAL_REQUIREMENTS, PERFORMANCE, IMPLEMENTATION_PLAN, ACCEPTANCE_CRITERIA, TASKS, README, CHANGELOG and historical M5-A acceptance note.

M5-C may address separately authorized quality controls, broader optimization, owner-device budgets and browser/device validation; no such UI/controller work is started here. Real portfolio/portrait assets, final visual calibration, content rights/approval and release decisions remain open. Future effects remain unapproved by this slice; the absence of bloom/shadows/volumetrics is deliberate.

**Request owner review of M5-B visuals, selected states and actual laptop responsiveness. Completed validated changes are committed and pushed under the standing owner instruction. This does not deploy the site or authorize M5-C/M6. Stop here pending explicit authorization.**
