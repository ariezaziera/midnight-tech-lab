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

Audit delivered; M1-only conditional approval received. **Do not begin M2 without explicit owner approval.** Findings are detailed in `M0_AUDIT_REPORT.md`; only decisions explicitly recorded in DECISIONS.md are approved.

- [x] Read all 34 baseline docs and inspect all ten concept boards.
- [x] Validate all ten referenced image paths, PNG decoding and SHA-256 prefixes: 10/10 pass each check. No broken listed image paths.
- [x] **AUD-01 / P0 / owner:** acknowledged gaps and approved M1-only scope, labeled placeholders and provisional tokens.
- [ ] **AUD-02 / P0 / before final visual sign-off / owner:** supply approved per-screen desktop/mobile references and final palette/type/layout decisions.
- [ ] **AUD-03 / P0 / before publication / owner:** supply authentic biography, portrait permission, CV, project content/media/rights/links, services and verified contact destination. Define draft exclusion across routes, metadata and hotspots.
- [ ] **AUD-04 / P0 / before M5 / owner + implementer:** acquire approved production assets; extend manifest with licensing, provenance, runtime paths and asset budgets, including fallback/OG/favicon and editorial media.
- [x] **AUD-05 / P1 / owner:** direct-link-only contact approved; incomplete informational shell until verified link exists, no form/success state.
- [ ] **AUD-06 / P1 / release planning / owner:** confirm functional MVP boundary, defer intro/expansion, and require baseline hardening before any release.
- [ ] **AUD-07 / P1 / before M3 / owner + implementer:** agree hotspot/action/route matrix; resolve console timing, Creator ID behavior, service-detail journey and future Lab flow.
- [ ] **AUD-08 / P1 / before M2–M3 / implementer then owner review:** reconcile preset/state identifiers, restoration and interrupted transitions; measure camera paths in blockout and obtain camera approval.
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
- [ ] Owner review M1; explicit approval required before M2.
- [ ] Track lint-tooling maintenance: ESLint 9 support ended; current Next lint plugins do not support ESLint 10. Five high audit findings share the unpatched braces lint dependency chain. Production audit is clean.

## M2–M6
- [ ] Implement scene blockout.
- [ ] Implement camera/hotspots.
- [ ] Build editorial portfolio.
- [ ] Integrate approved cinematic assets.
- [ ] QA and deploy.
