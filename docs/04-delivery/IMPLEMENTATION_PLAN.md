# Implementation Plan — Codex Milestones

**Do not execute all milestones in one autonomous pass.** Deliver and verify each slice before proceeding.

## M0 — Documentation and asset audit
- Read AGENTS and all P0 docs. Identify unresolved references/assets.
- Produce a short implementation risk list; do not fabricate missing content.
- Gate: owner acknowledges reference gaps and proposed placeholders.

## M1 — Foundation
- Create fresh Next.js + TypeScript + Tailwind project, global nav, routes, tokens, lint/typecheck/build.
- Add responsive static shells for key pages.
- Gate: all routes accessible and no build errors.

## M2 — Central Hub blockout
- Lazy-loaded R3F canvas with placeholder platform, desk, monitors and creator display.
- Basic lighting, camera overview, WebGL error fallback.
- Gate: stable scene on desktop and simplified/mobile fallback.

## M3 — Camera and interactions
- Preset controller, bounded controls, project and Creator ID hotspots, accessible HTML equivalents, overlay state.
- Gate: keyboard/pointer/touch journeys and back/reset pass.

M3 owner authorization narrows this slice to overview/creator/projects/workstation presets and three targets only. Creator ID offers `/about`; Project Display offers `/projects`; Workstation focuses desk/monitors. The selection panel is non-modal. No featured case study, module travel or intro is included. Implementation and 40 passing checks are documented in `M3_IMPLEMENTATION_REPORT.md`; owner accepted the functional prototype and authorized M4 on 2026-10-17. Final framing, selection visuals and cinematic styling remain separate gates.

## M4 — Editorial portfolio
- Projects library and case studies, About, Services, Contact, typed content and verified links.
- Gate: recruiter/client journeys work without 3D.

## M5 — Cinematic asset integration
- Import approved, licensed GLB/texture/portrait assets; refine lighting/materials and scene composition.
- Gate: side-by-side visual review and asset licensing audit.

## M6 — Expansion and hardening
- Remaining floating modules, intro, performance tuning, accessibility, responsive QA, SEO and deployment.
- Gate: release checklist complete.

## Codex reporting format per milestone
Summary; changed files; assumptions; missing assets; tests run and exact results; screenshots; visual differences; outstanding tasks; request for owner approval.


### M4 authorized scope clarification
Typed local editorial content and publication safeguards only. Preserve M1–M3, no new 3D behavior or backend. Zero approved projects means an honest portfolio empty state with the existing separate local template preview. Validate recruiter/client route journeys without JavaScript/WebGL and all previous regressions. Commit and submit report/evidence for owner review; do not begin M5/M6 or deploy.

## M5-A — Procedural refinement (authorized slice of M5)

Owner accepted M4 and authorized geometry, materials and composition only, prioritizing an older laptop. Capture fresh M4 baseline and refined views/measurements under the same production-browser conditions. Preserve all M1–M4 functionality, interaction metadata, camera architecture, mobile/failure paths and publication safeguards. No Blender, GLB download, expensive effects, new modules or deployment. Stop after M5-A report/commit; M5-B lighting/atmosphere/effects, M5-C and M6 remain unauthorized.

## M5-B — Lighting/materials/atmosphere (authorized)

M5-A accepted as base. Refine the existing light/material response and a static lightweight cosmic background while retaining geometry, cameras, content and all fallbacks. Capture a fresh baseline before application changes. Do not introduce post-processing, animated particles, shadows, models or graphics settings. Commit and push the completed validated slice per standing owner instruction; stop for review before M5-C/M6. No deployment.
