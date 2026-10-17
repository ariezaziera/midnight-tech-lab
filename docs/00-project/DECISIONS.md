# Decisions and Open Questions

## Confirmed by user
- Build a **fresh, independent** project from scratch, not a migration.
- Name/concept: **Midnight Tech Lab**.
- Art direction: **Cinematic Realism (Option C)**.
- Atmosphere: midnight cosmic purple/pink/blue nebula, warm amber lamps, cozy lived-in workstations.
- Central Hub: workstation, Creator ID with actual portrait when provided, featured projects, navigation, personal details.
- Hybrid navigation: 3D exploration **plus** conventional global HTML navigation.
- Portfolio also functions as a solo freelance creative storefront.
- User wants Codex to develop from project documentation.

## Agreed concept direction (not final measurements)
- Modules: Central Hub, Development Lab, Design Studio, Media Lab, Services Terminal, Personal Corner.
- 3D showroom plus clean editorial 2D project library and case studies.
- Camera presets, bounded orbit, smooth focus, back/reset and reduced-motion support.
- Intro concept: Studio Awakens, skippable.

## Proposals pending validation
- Platform diameter ~8m; scene dimensions and camera coordinates.
- Fonts: Space Grotesk + Inter; all hex values and spacing tokens.
- Technology details beyond framework selection; contact delivery service.
- 3D geometry, lighting approach, performance budgets and exact interaction durations.

## Open decisions
- Personal Corner separate island vs embedded in Central Hub.
- Actual headshot, verified portfolio text and project images.
- Final services/packages and contact links.
- Approved reference images and per-screen measurements.
- Whether to ship 3D intro at MVP or later.

## M0 audit conflicts awaiting owner resolution — 2026-10-16

These are audit findings, **not new approved decisions**. See `docs/04-delivery/M0_AUDIT_REPORT.md` for evidence and recommendations.

- **AUD-05:** PRD permits disabled/demo form UI; CONTACT-001 permits form UI only with secure delivery. Proposed MVP resolution: verified direct link only; visibly incomplete shell until supplied.
- **AUD-06:** PRD/SCOPE defer final assets and full modules, while M5/M6 precede the plan's release hardening/deployment. Confirm functional MVP release boundary and intro deferral; baseline quality must be checked before any release.
- **AUD-07:** Navigation Console is interactive later in scene graph but mapped to module selection in interaction spec. Confirm active MVP hotspots, Creator ID panel/route behavior and Services detail destination; Development Lab flow is future scope.
- **AUD-08:** App flow and camera specification use different preset/state identifiers. Reconcile stable presets, module selection and transition waypoints before implementation; coordinates remain blockout measurements.
- **AUD-09:** Existing reference paths are valid, but Development/Design/Media screen assignments need crop review. Do not treat the current map as final visual approval.
- Additional open choices: Services Terminal separate island versus attachment; provisional mobile 2D baseline; candidate-token use for M1; representative performance devices and release budgets.

M0 audit delivered. The owner gate was subsequently resolved by the conditional approval below; other audit decisions remain open.

## Owner gate — M1 conditional approval (2026-10-16)

- Owner reviewed M0 and authorized M1 only: Next.js App Router, TypeScript strict and Tailwind CSS; content-first responsive HTML shells and reusable UI/navigation.
- Provisional tokens are permitted but remain non-final. Explicitly labeled local content/asset placeholders are approved.
- Contact is direct-link-only. Until a verified destination is supplied, render an incomplete informational shell without a working contact action. No form or simulated success state.
- No Three.js, React Three Fiber or Drei installation during M1. No Central Hub, cameras, hotspots or intro animation.
- Do not publish or invent portfolio content. Unresolved final visuals, hotspot behavior and release decisions stay open.
- M1 must include lint, typecheck, tests, production build, direct/invalid-route and mobile checks, screenshots where possible, committed lockfile and implementation report.
- Stop for M1 review. M2 requires explicit owner approval.

## Owner gate — M2 execution authorization (2026-10-16)

- Owner accepted M1 as the base and authorized M2 only: a procedural Central Hub floating-platform/workstation blockout with distinguishable display, Creator ID, console and globe zones.
- Pinned compatible Three.js, React Three Fiber and Drei dependencies are authorized; retain a small browser-only scene boundary and the existing HTML portfolio.
- Approximate 8m scale is a prototype estimate. Use one stable overview camera; record position, target, FOV and clipping. Composition and camera remain subject to review.
- No portrait/production artwork, satellite islands, mascot, detailed props, expensive environment effects or production models.
- No hotspots, menu selection, orbit exploration, camera transitions/travel, back/reset state machine or intro. M3 remains unauthorized.
- Mobile may use a practical simplified scene or retain HTML; M2 implementation uses a descriptive 2D view below 768 CSS px as a reversible prototype choice, not a final mobile design decision.
- Require WebGL unsupported/initialization/context-loss handling, recoverable loading failure, reduced-motion behavior, tests and review screenshots.
- No publication. Submit M2 report and evidence, then stop for owner review before M3.

## Owner gate — M3 execution authorization (2026-10-17)

- Owner accepted M2 and authorized M3 only: controlled camera movement and three targets, Creator ID, Project Display and Workstation.
- Approved stable presets: `overview`, `creator`, `projects`, `workstation`, centrally typed with position/target/FOV/clipping/bounds. Respect reduced motion, support Back to overview, Reset and Escape, handle rapid selections, and restore stable state across HTML routes.
- Creator ID focuses its neutral display with a normal `/about` action. Project Display focuses its placeholder with a `/projects` action; no featured case study is implied. Workstation focuses desk/monitors and returns to overview.
- Typed IDs/metadata govern selection; pointer, keyboard and touch-friendly HTML equivalents are required, with visible focus/selection. Content access must not require camera travel or WebGL.
- Navigation Console, Holographic Globe, Cozy Corner and satellite islands remain non-interactive. No free-flight/orbit exploration, intro, production art, fictional content, backend or new modules.
- Keep the existing mobile content-first HTML presentation. Preserve demand rendering at rest and track existing dependency audit issues.
- Deliver tests, camera/interaction evidence and M3 report. Stop for owner review; M4 requires explicit authorization. No publication is authorized.

## Owner gate — M4 execution authorization (2026-10-17)

- Owner accepted M3 as a functional prototype. Final camera framing, selection visuals and cinematic styling remain reserved for later visual review.
- M4 only: typed local editorial content, Projects/filtering, reusable case studies, About, provisional Services and verified direct-link-only Contact. Preserve M1–M3 and existing routes/navigation.
- Content defaults to draft or labeled placeholder unless owner verification and explicit public-presentation approval are recorded. Candidate names in CONTENT_GUIDELINES are not publication approval.
- Retain `/projects/placeholder` as a clearly labeled local template demonstration. Draft and other placeholder slugs are excluded from portfolio listings and detail routes. Prototype-wide noindex/nofollow remains; it is not access control.
- No CMS, database, authentication, contact backend, deployment, production art, new 3D modules or camera features. Stop after M4 and request owner review before M5.

## Owner gate — M5-A authorization (2026-10-17)

- Owner accepted M4 and authorized only procedural geometry/material/composition refinement of the existing Central Hub. Prior GLB/Blender assumptions do not govern this code-first workflow; Blender, paid assets and external modeling software are not required.
- Preserve approximately 8m island, existing four camera presets/bounds, three typed hotspot/route mappings, HTML equivalents, editorial publication safeguards, mobile 2D and all failure/retry behavior.
- Refine rock strata/taper, workstation construction, Creator ID/project exhibition frames and minor inert console/globe geometry. Lightweight integrated selection marks may replace the debug bounds outline if tests and cost permit.
- Simple shared materials, limited emissive geometry and static batching are permitted. No new lighting system, bloom, volumetrics, particles, expensive shaders/shadows, textures, dependencies, islands or modules.
- Fresh before/after measurements and all four camera views are required. Do not silently accept material rendering/responsiveness regressions. Commit/report and stop for M5-A owner review. M5-B/M5-C/M6 and publication remain unauthorized.

## Owner gate — M5-B authorization (2026-10-17)

- Owner accepted M5-A and authorized only lighting, selective materials and lightweight cosmic atmosphere. Keep the procedural geometry, four camera presets, target metadata/route actions, selection corners and M4 content safeguards.
- Use conservative fixed lighting, warm amber workstation focus, cool purple/blue separation and muted pink atmosphere. Static CSS gradients/stars behind a transparent canvas are permitted; no continuous animation, heavy shaders/post-processing, shadows, nebula downloads, new models/dependencies or hardware requirement.
- Preserve demand rendering, mobile 2D, no-JS HTML, WebGL loading/failure/retry, reduced motion and keyboard/pointer/Back/Reset/Escape/restoration.
- Capture fresh M5-A baseline and repeated comparable M5-B measurements/screenshots. Document trade-offs and simplify any material cost regression.
- Standing owner instruction: after completed implementation and validation, commit and push directly. This authorizes repository delivery, not deployment or proceeding past milestone approval gates.
- Stop after M5-B report/evidence for owner review. M5-C/M6 and public deployment remain unauthorized.
