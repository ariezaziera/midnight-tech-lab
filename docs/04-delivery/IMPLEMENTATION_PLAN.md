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

M3 owner authorization narrows this slice to overview/creator/projects/workstation presets and three targets only. Creator ID offers `/about`; Project Display offers `/projects`; Workstation focuses desk/monitors. The selection panel is non-modal. No featured case study, module travel or intro is included. Implementation and 40 passing checks are documented in `M3_IMPLEMENTATION_REPORT.md`; owner review remains pending. M4 is not authorized.

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
