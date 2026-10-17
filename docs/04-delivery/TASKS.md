# Tasks — Initial Backlog

## Documentation
- [x] Create baseline Codex documentation pack.
- [ ] Supply approved cropped wireframe/reference images and update `WIREFRAME_MAP.md`.
- [ ] Approve final color/font tokens.
- [ ] Confirm Personal Corner placement.
- [ ] Supply real portrait and verified content/links.

## M0
- [x] Codex audit documentation and asset gaps (2026-10-16; see [M0 audit report](M0_AUDIT_REPORT.md)).
- [x] Owner approve placeholders and M1-only milestone scope (conditional approval, 2026-10-16; see DECISIONS.md).

### M0 findings — prioritized follow-up

Audit delivered; M5-A accepted and M5-B authorized. **Do not begin M5-C/M6 without explicit owner approval.** Findings are detailed in `M0_AUDIT_REPORT.md`; only decisions explicitly recorded in DECISIONS.md are approved.

- [x] Read all 34 baseline docs and inspect all ten concept boards.
- [x] Validate all ten referenced image paths, PNG decoding and SHA-256 prefixes: 10/10 pass each check. No broken listed image paths.
- [x] **AUD-01 / P0 / owner:** acknowledged gaps and approved M1-only scope, labeled placeholders and provisional tokens.
- [ ] **AUD-02 / P0 / before final visual sign-off / owner:** supply approved per-screen desktop/mobile references and final palette/type/layout decisions.
- [ ] **AUD-03 / P0 / before publication / owner:** supply authentic biography, portrait permission, CV, project content/media/rights/links, services and verified contact destination. Define draft exclusion across routes, metadata and hotspots.
- [ ] **AUD-04 / P0 / before future external asset integration / owner + implementer:** acquire approved external production assets only in a separately authorized slice; M5-A uses original procedural geometry without Blender/downloads; extend manifest with licensing, provenance, runtime paths and asset budgets, including fallback/OG/favicon and editorial media.
- [x] **AUD-05 / P1 / owner:** direct-link-only contact approved; incomplete informational shell until verified link exists, no form/success state.
- [ ] **AUD-06 / P1 / release planning / owner:** confirm functional MVP boundary, defer intro/expansion, and require baseline hardening before any release.
- [x] **AUD-07 / M3 matrix / owner + implementer:** approved creator → About, projects → Projects library, workstation → focus/overview; console/globe inactive. Service detail and Lab journeys remain deferred.
- [x] **AUD-08 / M3 implementation / implementer:** centralize overview/creator/projects/workstation presets, bounds, interrupted transitions and stable restoration; capture geometry/camera evidence. M3 functional prototype accepted; final framing remains a later visual gate.
- [ ] **AUD-09 / P1 / reference selection / owner:** review Development/Design crops from `earlier-central-hub.png` and Media from `earlier-module-layouts.png`; correct mappings after selection.
- [x] **AUD-10 / P1 / M1 setup / implementer:** pin compatible dependencies and Node/npm, add lockfile and independent validation scripts. ESLint support limitation tracked below; see M1 report.
- [ ] **AUD-11 / P1 / before M2 and release / owner + implementer:** specify target devices, measurable budgets, quality selection/override and failure recovery; validate accessibility throughout implementation.
- [ ] **AUD-12 / P2 / docs cleanup / implementer:** clarify bundled concept boards versus absent approved assets and refresh obsolete repository setup directions.

### Later owner decisions (do not block a separately approved placeholder foundation)

- [ ] Confirm mobile fallback and optional 3D policy before scene work.
- [ ] Confirm Services Terminal separate island versus attached structure before expansion.
- [ ] Confirm intro milestone; recommended post-MVP.
- [ ] Approve hosting/domain and future contact provider only when relevant; backend remains deferred.

## M1
- [x] Scaffold new Next.js application with TypeScript strict and Tailwind CSS.
- [x] Add HTML navigation, six responsive route shells and explicit local placeholders.
- [x] Establish lint/typecheck/build and browser tests.
- [x] Complete validation evidence and submit [M1 implementation report](M1_IMPLEMENTATION_REPORT.md): lint/typecheck/build pass; 17 browser tests pass; 12 screenshots captured.
- [x] Owner accepted M1 as the base and explicitly authorized M2 only (2026-10-16).
- [ ] Track lint-tooling maintenance: ESLint 9 support ended; current Next lint plugins do not support ESLint 10. Five high audit findings share the unpatched braces lint dependency chain. Production audit is clean.
- [ ] Track upstream R3F/Three.js development deprecation: pinned R3F instantiates `THREE.Clock`; revisit a compatible dependency update when appropriate. No application Clock usage or dependency change was introduced in M3.

## M2 — Central Hub blockout
- [x] Inspect required documents, accepted M1 source and Central Hub concept boards.
- [x] Implement procedural platform, rock underside, workstation/chair/monitors, neutral Creator ID, project display, console, globe and basic lights.
- [x] Add typed dimensions/materials and fixed overview camera; no travel or hotspots.
- [x] Add client-only lazy import, mobile/no-JS HTML view, loading watchdog, error/context-loss fallback and retry.
- [x] Complete clean install, lint/typecheck/tests/build validation: all pass; 25 browser tests (17 M1 + 8 M2). Capture desktop/mobile/failure evidence under `evidence/m2/`.
- [x] Submit [M2 implementation report](M2_IMPLEMENTATION_REPORT.md) and initial scene measurements for owner composition/camera review.
- [x] Owner accepted M2 as the base and explicitly authorized M3 only (2026-10-17).
- [ ] Replace all procedural blockout assets only in a separately approved art milestone. Production GLBs, textures, real portrait and project art remain missing.

## M3 — Camera and interactions
- [x] Add four typed camera presets, exterior waypoint, tested bounds and reduced-motion snapping without new dependencies.
- [x] Add three typed targets and metadata-based pointer selection; keep console/globe inactive.
- [x] Add semantic HTML focus/route controls, selection outline/text/live status, Back, Reset and scoped Escape.
- [x] Save only stable preset IDs, restore across routes/browser Back, reject invalid stored values and preserve failure recovery.
- [x] Preserve M1/M2 regression coverage and add 15 M3 checks: final 40 tests pass; lint/typecheck/build and clean npm ci pass.
- [x] Capture overview, selected targets, mobile, failure and camera measurement evidence under `evidence/m3/`.
- [x] Submit [M3 implementation report](M3_IMPLEMENTATION_REPORT.md).
- [x] Owner accepted M3 functional prototype and authorized M4 (2026-10-17). Final framing/selection/cinematic styling remain open.
- [ ] Physical mobile, Safari/Firefox, screen-reader and final visual/production-asset reviews remain outstanding.

## M5–M6

- [ ] Integrate approved cinematic assets.
- [ ] QA and deploy.


## M4 — Editorial portfolio
- [x] Audit content approvals; retain zero published projects/services/contact methods and one labeled local template.
- [x] Add typed local records, publication checks, category/reference validation and reusable project/case-study presentation.
- [x] Structure About, Services and Contact with honest missing inputs and direct HTML journeys.
- [x] Complete npm ci, lint, typecheck, production build and production audit (zero production findings); final full browser suite: 47 passed in 1.9m.
- [x] Capture 27 screenshots and three regression measurement JSON files; submit [M4 implementation report](M4_IMPLEMENTATION_REPORT.md).
- [ ] Owner approve authentic project titles, roles, narratives, tools, media/rights, results and links before publication.
- [ ] Owner supply approved biography, skills, experience, working approach, portrait/CV, actual offerings and verified contact destination/availability.
- [x] Owner accepted M4 and authorized M5-A only (2026-10-17). M5-B/M5-C/M6 remain unauthorized.

- [ ] Review the clean-install notice for the pinned `unrs-resolver@1.12.2` postinstall script before explicitly approving scripts; no blanket approval was applied in M4.


## M5-A — Procedural geometry/material refinement
- [x] Audit scene hierarchy, typed hotspot bounds, four camera presets, concept boards and M3/M4 evidence.
- [x] Capture fresh before-edit production baseline: four camera views and three same-protocol measurement runs.
- [x] Refine rock strata, workstation/chair/lamp and neutral framed display structures; retain 8m footprint and camera values.
- [x] Batch static geometry by material inside target groups; share resources and release on unmount/recovery.
- [x] Replace debug bounds volumes with integrated amber selection corners; preserve all HTML controls and route mappings.
- [x] Focused checks: seven passed; no camera adjustment required.
- [x] All required commands passed; final full suite 49 passed in 2.0m. Fresh three-run after comparison: draws/geometries 49→30, triangles 866→1680, textures unchanged, no idle loop; trade-off documented.
- [x] Submit [M5-A implementation report](M5A_IMPLEMENTATION_REPORT.md), 36 screenshots, five JSON measurements and side-by-side comparison; commit for owner review.
- [x] Owner accepted M5-A and explicitly authorized M5-B only (2026-10-17); final visual approval remains open.
- [ ] Physical older-laptop/GPU validation, final visual approval and authentic identity/project assets remain open.


## M5-B — Lighting, materials & atmosphere
- [x] Audit current source, M5-A evidence, references and required documentation.
- [x] Capture fresh accepted-M5-A baseline before source edits: four views and three measurement samples.
- [x] Tune four fixed lights/shared materials and static CSS cosmic background; geometry/cameras/content unchanged.
- [x] Preserve all 49 existing tests and add two live atmosphere/light-budget checks.
- [x] All required checks passed; 51 tests in 2.2m, clean production audit. Submit [M5-B report](M5B_IMPLEMENTATION_REPORT.md), 37 PNGs, five JSON files and comparison.
- [x] Commit and push completed M5-B under standing owner instruction; request owner review before M5-C/M6.
- [ ] Physical older-laptop/GPU review, final visuals and M5-C authorization remain outstanding.
