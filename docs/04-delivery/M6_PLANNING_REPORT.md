# M6 planning and architecture gate

Date: 2026-10-17 (Asia/Kuala_Lumpur). Audited base: `52e3845` on `main`, origin `ariezaziera/midnight-tech-lab`. Working tree was clean before planning. **M0–M5-C accepted; M6 planning only. No implementation, runtime change or deployment is authorized or performed.**

## Recommendation and decision summary

Adopt **Option C: one active, lazily loaded studio scene at a time**, with the existing Central Hub as entry point. Keep the accepted desktop split-screen layout and all core HTML routes. Make each room explain an authentic artifact and creative decision, rather than add decorative islands. Reuse the accepted warm/cool material language, static cosmic atmosphere, bounded cameras and HTML feedback. The panel can become a coherent studio experience through purposeful scene content without becoming fullscreen.

Request approval of the proposed architecture/state contract, performance targets and **M6-A1 only**: a one-scene-at-a-time host plus a visibly labeled local Development review bay, with no invented project content and no console/globe activation. Prove lifecycle, loading, restoration, keyboard behavior and integrated-GPU behavior before a real exhibit or other rooms. Project/identity/contact intake can be independently authorized under B1; it must not be fabricated to unblock technical work.

Companion deliverables:

- [Experience architecture](M6_EXPERIENCE_ARCHITECTURE.md): ten areas, user journeys, spatial/state contract and practical visual direction.
- [Batch plan](M6_BATCH_PLAN.md): A1–A4, B1–B2, C1–C2, proposed measurable profiles, tests/evidence and independent stops.
- [Owner decisions and intake](M6_OWNER_DECISIONS.md): explicit pending decisions, already-approved constraints and content checklist.

All proposed numerical limits, file structures, scene IDs and behavior changes remain subject to owner approval. Acceptance of M5-C does not silently approve new module architecture, final typography/art, portrait/media publication or release.

## Repository audit: evidence and status

Read AGENTS, product/design documents, experience/camera/accessibility documents, technical architecture/requirements/scene/assets/performance, delivery plan/acceptance/tasks/testing/release checklist and decision history. Reviewed [M0](M0_AUDIT_REPORT.md), [M1](M1_IMPLEMENTATION_REPORT.md), [M2](M2_IMPLEMENTATION_REPORT.md), [M3](M3_IMPLEMENTATION_REPORT.md), [M4](M4_IMPLEMENTATION_REPORT.md), [M5-A](M5A_IMPLEMENTATION_REPORT.md), [M5-B](M5B_IMPLEMENTATION_REPORT.md) and [M5-C](M5C_IMPLEMENTATION_REPORT.md). Historical report gate language reflects its delivery date, not the newly accepted status.

Inspected current scene components, typed configurations, resource disposal, camera math/rig, lazy loader and failure recovery; editorial types/data/selectors/presentation/routes; package pins and Playwright configuration/seven suites. No source or test was edited to conduct the audit. Revisited the Central Hub/module/production boards and accepted High overview for visual comparison; validated all ten board paths, image decode/dimensions and manifest hash prefixes.

### Implemented and accepted

- **Shell/routes:** Next App Router, strict TypeScript, Tailwind; large-screen Home split grid with identity/CTAs and studio. Home's scene is 440 CSS px high, width follows the panel. Editorial Server Components cover `/projects`, `/projects/[slug]`, `/about`, `/services`, `/contact`; not-found behavior exists. Five ordinary global nav links, skip link and Return to studio are present. No canvas is required to read pages.
- **World:** original procedural 8m hub, deterministic layered rock, shaped desk/chair, dual monitors/peripherals/lamp, neutral Creator ID/project frames and inert console/globe. [Scene root](../../src/components/three/hub/central-hub.tsx), [geometry/resource ownership](../../src/components/three/hub/primitives.tsx) and [hub config](../../src/lib/scene/hub-config.ts) are actual source, not GLB imports. Static parts batch by material within target groups; templates/materials/merged geometry have explicit cleanup.
- **Look:** four fixed lights (hemisphere, two directional, one point), tuned shared standard materials, static original CSS gradients/twelve star marks behind a transparent canvas. No bloom, particles, shadows, custom effect shader, production nebula image or runtime texture artwork.
- **Interactions:** exactly `creator`, `projects`, `workstation`, typed metadata/nearest ancestor resolution; actual mesh pointer hits and semantic HTML controls. Creator offers `/about`, Projects offers `/projects`; Workstation focuses and returns. No featured case-study claim. Four hub presets, one cancellable exterior-waypoint transition, Back/Reset/scoped Escape, reduced-motion snap and validated stable preset restoration. [Canonical IDs/cameras](../../src/lib/scene/interaction-config.ts) and [rig](../../src/components/three/camera/camera-rig.tsx).
- **Quality/resilience:** [Low/Medium/High](../../src/lib/scene/quality-config.ts) DPR caps 1/1.5/2, Low default; local preference, no cookies/tracking. Demand rendering and diagnostics. [Desktop loader](../../src/components/studio/studio-preview.tsx) probes WebGL2, imports browser-only scene after mount and handles chunk rejection, initialization exception, 15s first-draw watchdog, real context loss and fresh retry. Mobile below 768px/no-JS uses descriptive HTML; desktop controls stay outside failure rendering. Antialiasing and low-power preference remain fixed.
- **Editorial mechanism:** [model](../../src/content/model.ts), [records](../../src/content/editorial.ts), [validation/selection](../../src/lib/content.ts), reusable case-study presentation, approved-only filtering/routing, draft/placeholder restrictions and prototype-wide noindex/nofollow. Projects query links work without JS. Publication flags require recorded approval but cannot authenticate facts independently.
- **Historical verification:** M5-C recorded 55 passing tests and successful ci/lint/typecheck/build/production audit. These are accepted prior results, **not runtime checks rerun for this documentation task**.

### Placeholders and incomplete capabilities

- Zero published genuine projects/case studies, approved project media, verified outcome/project links, confirmed service records, contact destinations or CV. Six profile sections are draft/missing-input messages. `/projects/placeholder` is explicitly a local template, never genuine work.
- No real portrait, photo gallery, personal artwork or tools/proficiency inventory. Current data has a project media contract, not a general portrait/personal-gallery model. Any later profile media integration needs a small explicit contract; do not assume a portrait path is already supported.
- Existing validators check statuses, approval records, categories/references, safe-link/media metadata and route eligibility. They do not verify rights, factual truth or actual local file existence. Populated content is tested using isolated synthetic fixtures, not approved real work; genuine media/download/inquiry paths need new positive tests once supplied. Published profile text and service completeness deserve intake checks rather than assuming structural typing proves editorial readiness.
- Development/Design/Media scenes, scene registry/host, module loading, cross-scene restoration, Services Terminal, Personal Corner and satellite navigation do not exist. Console/globe are inert. No free orbit, intro, modal exhibit preview, backend or deployment. Installed transitive controls/media packages are not implemented features.
- No `public/` directory exists at the audited base. Concept PNGs under docs are not runtime artwork. CH-009/CH-010 detailed props/mascot remain absent; portrait and cropped approved reference assets remain missing. Code-first procedural geometry supersedes old GLB acquisition assumptions for accepted work, not every future asset decision.
- System Arial/Helvetica typography and candidate design tokens remain; M5-C acceptance is not a font-source, high-fidelity or final camera-art approval. Accepted prototype focus views intentionally crop surrounding objects.

### Documentation conflicts to keep explicit

Older HOME-001 proposes fullscreen/six hotspots, USER_FLOWS includes lab/preview/service-detail routes, and generic M6 includes intro/deployment. These are conceptual or superseded by narrower approvals/current planning-only instruction. They must not be treated as implementation permission. The split-screen shell, three accepted hub targets, existing routes and no intro/deploy take precedence.

Old M2/M3 technical/camera prose names DPR1–1.5 and ambient/static behaviors; later M5-C config and latest report establish the actual three modes. Old amber wireframe wording is superseded by M5-A corner marks. Initial architecture tree includes overlays, islands, GLB loaders and `content/projects.ts`; actual current files differ. This plan cites actual paths and marks expected future files as proposed.

Reference README's "no approved binaries" statement does not mean the concept boards are absent; it is clarified in this documentation pass. Final crops and authentic assets remain absent. Development/Design reference mapping is still weak: `earlier-central-hub.png` visibly includes those panels, while `earlier-module-layouts.png` shows Media/Services/Personal. No crop is silently approved or map rewritten.

## Spatial alternatives

### Option A — Expand the current island with bounded modules

**Experience:** lowest loading friction; all functions close to the familiar desk. Good for a modest Services action or personal artifact. **Narrative continuity:** strongest literal continuity, but the 8m island can become a crowded shelf rather than distinct practice areas. **Complexity:** low for one small addition, increasing sharply when new objects interfere with current hit targets, four views or the exterior travel waypoint.

**Older integrated GPU:** all mounted modules accumulate draws/resources even if partly outside the current frame; offscreen objects still consume resident memory. Culling is not disposal. A few batched additions may be economical, but present smoothness does not demonstrate headroom for six modules. **Memory:** one ownership tree is simple; resource caps must apply to the entire expanded island. **Assets:** could reuse many materials, but new readable displays still need authentic work and camera tests.

**Mobile fallback:** straightforward same HTML links, no mobile scene expansion. **Accessibility:** compact directory can map objects to ordinary pages; crowded geometry increases pointer ambiguity, so HTML remains primary alternative. **Maintainability:** initially easiest, but spatial coupling grows; changing one object can invalidate old camera/hit/clearance evidence. **Verdict:** viable for small editorial attachments, not preferred for all disciplines within unchanged framing/layout.

### Option B — Connected studio zones with controlled travel

**Experience:** strongest sense of exploring one imaginative world; visible destinations can orient visitors. **Narrative continuity:** continuous spatial travel supports a studio universe, though long moves can delay work discovery and become repetitive. **Complexity:** highest now: world placement, new waypoints/bounds, visibility/occlusion, interrupted travel, far clipping and travel-state restoration all require new validation beyond M3's local controller.

**Older integrated GPU:** multiple resident islands multiply geometry/material/texture footprint; longer views expose more content simultaneously. Quality DPR alone does not reduce geometry memory. **Memory:** unloading distant zones can help but adds streaming/state complexity; once only one remains mounted it approaches Option C with more travel machinery. **Assets:** consistent distant silhouettes/connectors and local detail require more authoring than one-room proof.

**Mobile fallback:** HTML works, but the world map itself needs a separate readable directory. **Accessibility:** travel needs skip/reduced-motion paths, clear location context and nonvisual alternatives; spatial distance must never dictate navigation cost. **Maintainability:** tighter dependency among layouts, cameras, loading boundaries and asset budgets. **Verdict:** defer; current small panel and proven local camera system provide insufficient evidence to justify a connected-world rewrite.

### Option C — Central Hub plus on-demand scene swapping

**Experience:** entering distinct practice rooms gives artifacts room to explain their story while preserving the panel. A clear loading/room heading is less seamless than flight. **Narrative continuity:** shared light/material language, room title, directory and explicit Return to hub maintain coherence; no fake continuous travel is promised. **Complexity:** moderate: a typed scene host, stale-safe loading, scene-local cameras and restoration; avoids world-scale path planning and a new animation engine.

**Older integrated GPU:** exactly one mounted graph bounds resident scene resources independent of room count; lazy code/media limits initial work. This is a reasoned architectural advantage, not a measured future speed guarantee. **Memory:** dispose active graph before next mount; one renderer and explicit ownership. Imported JS stays cached, asset caches may retain data, shader compilation and upload can cause entry cost—these must be measured, not waved away. **Assets:** build one meaningful room at a time with reused procedural/material primitives; real exhibit media remains necessary.

**Mobile fallback:** same canonical HTML projects/services/About, no room chunks on mobile. **Accessibility:** native Enter buttons as progressive enhancement beside ordinary content links, clear heading/focus/back/error contract, no mandatory scene entry. **Maintainability:** room configs/resources can be measured and tested independently; host complexity stays bounded if it does not become a generic engine. **Verdict:** recommended primary architecture, pending D1–D4 approval. Keep services/personal initially editorial; do not make five scenes simply because five labels exist.

## Visual direction and portfolio value

The accepted High overview is recognizable but its blank frames and lack of real artifacts limit storytelling more than polygon count. The highest-impact change is authentic work/identity placed with intent, followed by readable contrast/material separation and consistent HTML scene context. Preserve warm desk against cool cosmic background, legible floating-rock silhouette and restrained amber selection. Do not enlarge the canvas or invent saturated effects to make the portfolio feel immersive.

The [experience document](M6_EXPERIENCE_ARCHITECTURE.md) distinguishes essential composition/material/feedback/type decisions from optional personal artwork, static process stages and user-initiated HTML video. Boards inspire relationships and mood; their faces, project screenshots, metrics, fonts, camera dimensions, packages and form UI are not approved content. A new room is worthwhile only if a visitor learns something specific about actual work there.

## Performance reference and proposed expansion strategy

Accepted [M5-C comparison data](evidence/m5c/performance-comparison.json), re-read during planning:

- Overview: 30 calls, 1,680 triangles, 30 geometries, 15 live mesh materials, 1 renderer-reported texture; selected geometry 31 returns to 30. Four lights, one point, no shadows.
- Local Low readiness samples 807 / 776 / 861 ms; median 807 ms, range 776–861. Total JS transfer 393,559 bytes. Windows Chromium 156.0.8078.4, production build, 1440×900, deviceScaleFactor 2, fresh contexts/no throttling; masked renderer `WebKit WebGL`, actual physical GPU not identified by that capture.
- Low/Medium/High measured buffers 694×440 / 1041×660 / 1389×880 = 305,360 / 687,060 / 1,222,320 pixels. High roughly quadruples Low pixels without adding lights/geometry. Device DPR 1 tiers coincide by design.
- All 36 quality/preset observations idle-stable over 750 ms, no page errors. Existing four-cycle checks found no live material/geometry growth. These short observations are not complete heap/VRAM or sustained frame-time measurements.

The owner now specifically reports smooth **Intel HD Graphics 620** operation including High. Record this as qualitative real-device acceptance, not an agent measurement, frame-rate number, known driver/browser setup or evidence that any proposed room will remain smooth. Retain Low default unless separately changed by approval.

Proposed F/Z/I/R profiles in the [batch plan](M6_BATCH_PLAN.md) cover each batch's draw/triangle/geometry/material/texture counts, JS/media transfer, readiness, idle and repeated-resource stability. They keep core invariants, allow measured room/content growth, and specify numerical caps **for owner approval**. Neither old 35-draw regression guards nor board 50k-polygon claims are production device budgets. A cap does not authorize acquiring an asset or adding an effect.

### Intel HD 620 real-device protocol — future work, not executed here

1. Record owner laptop OS, browser/version, CPU/RAM if owner supplies them, screen resolution/scaling/DPR, GPU acceleration/driver evidence where available, AC/battery/power mode and competing workload. Do not infer actual active GPU from laptop branding; label unavailable readings. No private identifiers needed.
2. Run accepted M5-C and each proposed batch's production build on the same device/browser/local-server conditions. Five fresh runs per mode with explicit cache state; collect loader-to-draw/entry-to-draw median/range, resources, pixel buffer, calls/triangles/live geometry/material/texture counters, errors and 2s/10s idle windows. Use standard window size and actual laptop size, logging both. Initial and later scene readiness are distinct timers.
3. Exercise every camera/zone journey, rapid cancellation, keyboard/Back/Reset/Escape, reduced motion, route return, resize and 20 hub↔zone cycles. Verify resources return to equivalent checkpoints. Let the machine warm for a 10-minute repeated-use check; document any thermal/power change rather than extrapolate from a short smooth run.
4. If frame-time profiling is available and approved, record a browser trace for a defined set of transitions, separate scripting/render/long-task observations from GPU timings, and report actual distributions with limitations. Demand idle has no meaningful continuous FPS target. No 60/30 FPS guarantee or threshold is proposed as already accepted. If profiling is unavailable, keep quantitative counters and clearly labeled owner observations.
5. Compare Low/Medium/High; investigate quality-specific stalls, compilation/uploads, texture dimensions and JS/graph retention before loosening caps. Reduce/defer offending complexity or present HTML fallback. Request owner acceptance of any measured exception; do not autodetect a higher default from one laptop.

### Browser and accessibility plan — future work

Current executable inventory was rechecked read-only: Chromium present; Firefox/WebKit absent. Existing Playwright configuration targets Chromium. No new browser binary was installed and no browser test was run in this planning task.

For each implementation slice, Chromium remains baseline. On available Firefox/WebKit, smoke direct pages, scene readiness, quality, pointer/keyboard, cancellation, no-JS, context/error recovery and route restoration; capture explicit outcomes and engine versions. Request download-cost/environment approval if binaries are still unavailable. Real Safari on Apple hardware and physical mobile remain separate coverage; a renderer string is not browser coverage.

Preserve widths 320/390/768/1024/1440, desktop 1440×900 / mobile 390×844 captures, 200% text enlargement and real browser zoom. Add keyboard-only and screen-reader navigation/status/focus review for the directory/new rooms and actual media/contact. Include mobile touch/no-JS/WebGL-off paths. Automated smoke tests do not establish WCAG conformance.

## Content readiness and sequencing

The [owner checklist](M6_OWNER_DECISIONS.md) covers biography, skills/identity, real projects, media/case studies, actual services, verified contact, personal artwork and optional CV/socials/portrait. Start with one publication-cleared project and contact destination; optional portrait/video/Personal Corner must not hold up independent lifecycle proof. Current candidate project names and synthetic tests are not public evidence.

B1 can be independently authorized and supply approved public content to A2. Technical A1 can use an explicitly labeled local bay without claims. Design/Media wait for distinct real work; do not create redundant galleries from the same one screenshot. Before enabling media/downloads, verify actual file paths, dimensions, rights, redactions and content contract completeness. Keep draft/private approval material out of client props and public repository data. Noindex is not confidentiality protection.

## Prioritized risk register

Priority means order to resolve before affected work, not a claim the planning deliverable is blocked.

- **P0 R1 — Authorization drift.** Trigger: generic old M6/board descriptions treated as permission for world travel, intro, fullscreen or deploy. Impact: unapproved product/architecture change. Owner+implementer mitigate with D1/D2 and separate batch gates; preserve shell and stop after each report.
- **P0 R2 — Empty or fabricated portfolio.** Trigger: building five rooms before approved artifacts. Impact: impressive scenery with no credible evaluation/inquiry path. Owner supplies B1 packet; implementer enforces eligibility and draft exclusion. A1 technical exception is explicit; A2 cannot pass as genuine without content.
- **P0 R3 — Rights/privacy/contact release gap.** Trigger: board portrait, confidential case study or guessed destination enters runtime. Impact: false identity/work claims or broken inquiry. Owner verification/rights/publication per item; actual file/destination checks; noindex retained but not relied on for privacy. Release blocked until critical inputs approved.
- **P1 R4 — Multi-scene resource retention.** Trigger: hidden graphs, duplicate renderers, loader caches or stale loads survive swaps. Impact: growing memory/context loss despite low draw counts. A1 one-graph ownership, generation IDs, explicit cleanup,20-cycle counter/optional heap checks; acknowledge cached JS and do not promise it unloads.
- **P1 R5 — GPU headroom inferred from smooth High.** Trigger: owner's qualitative Intel feedback used to approve many rooms/effects. Impact: first-entry/thermal/VRAM regressions. Preserve caps, measure same-device production builds and separate pixel workload from GPU time. Owner decides budgets after evidence.
- **P1 R6 — Camera assumptions carried across rooms.** Trigger: old waypoint/bounds reused for new geometry. Impact: clipping/occlusion/disorientation. Keep hub rig/config intact, measure zone-local poses/bounds/clearance and reduced motion before each acceptance. No invented board coordinates.
- **P1 R7 — Lost focus or confusing navigation.** Trigger: Escape/history/Reset meanings diverge between pending scenes and routes. Impact: keyboard user stranded or wrong restoration. D3 state contract, focus initiator references, scoped keys, ordinary links and cancellation/re-entry tests. Directory non-modal initially.
- **P1 R8 — Transfer/startup regression.** Trigger: eager registry imports, preload-all, large images/fonts or video textures. Impact: slow initial hub even when room unused. Explicit lazy modules, F/Z/I caps, bounded static images, no video texture or new fonts without budget; compare fresh base and feature builds.
- **P1 R9 — Content contract overconfidence.** Trigger: flags/types mistaken for factual permission or real file checks. Impact: draft leak, missing media/CV, empty published profile/service. B1 adds intake checks and actual-file/positive-route validation while retaining negative fixtures; owner source review remains necessary.
- **P1 R10 — Uncovered engines/assistive devices.** Trigger: Chromium success generalized to Safari/Firefox/screen readers. Impact: undiscovered WebGL/loading/focus faults. C1 inventory/results and manual device/AT review; list untested environments instead of claiming coverage.
- **P1 R11 — Dependency/tooling maintenance.** Trigger: ignored dev advisories, incompatible forced upgrade or blanket script approval. Impact: unsafe tooling or broken lockfile. Track existing five development-only findings, ESLint 9 support, pending resolver script and Three deprecations; re-audit in authorized code batches and review compatible changes separately. Historical production audit 0 is not a fresh audit.
- **P2 R12 — Visual ambition becomes clutter.** Trigger: neon text, transparent panels, generic props or scene count substituted for storytelling. Impact: weak silhouette/readability and redundant rooms. Use one artifact/decision per room, current light envelope and real-content review; optional decorative work must demonstrate value and budget.
- **P2 R13 — Excessive framework abstraction.** Trigger: generic scene engine/store/router replacement before two scenes prove requirements. Impact: larger client bundle/state bugs. A1 minimal typed host, existing router/server boundaries, no new dependency; expand only after measured need.
- **P2 R14 — Historical documentation mistaken for current state.** Trigger: old asset/renderer/state examples used without source check. Impact: unnecessary Blender/assets or wrong architecture changes. Current audit/source links and approval log take precedence; future batches update only affected documents.

## Reference/path validation and documentation-only verification

All ten PNGs under `docs/05-references/` exist, decode as 1536×1024 and match WIREFRAME_MAP SHA-256 prefixes:

- `visual-concepts/earlier-portrait-placement.png`: `b36773eca88a`.
- `visual-concepts/phase-5-design-system.png`: `989c1fb86831`.
- `visual-concepts/phase-7-assets.png`: `c455ffda4754`.
- `wireframes/earlier-central-hub.png`: `a3c7c8cc3eac`.
- `wireframes/earlier-module-experience.png`: `0c1ad344a33b`.
- `wireframes/earlier-module-layouts.png`: `369c42ba951d`.
- `wireframes/earlier-wireframe-overview.png`: `3e4a6ab7957e`.
- `wireframes/phase-3-pages.png`: `7f46962850c1`.
- `wireframes/phase-4-interactions.png`: `cd11570224a8`.
- `wireframes/phase-8-production.png`: `0f8d9ba20bfa`.

Validation uses read-only PowerShell file inventory, Get-FileHash and System.Drawing image decode, current source inspection, saved JSON evidence parsing and documentation link checks. Proposed future source/asset paths in the batch plan are explicitly marked as absent proposals; they are not failed existing references. There are zero production assets to validate in an existing public directory because none exists. Concept validity is not production asset approval.

This change set creates the four requested planning documents and updates the current gate pointers in README, DECISIONS, IMPLEMENTATION_PLAN, TASKS, ARCHITECTURE, PERFORMANCE, reference README and CHANGELOG. It does not modify application source, tests, assets, dependencies, lockfile, layout, framework configuration or runtime behavior. No application screenshots are recaptured; existing accepted evidence is reused and labeled historical.

Documentation verification: **57 local Markdown links checked, zero missing destinations; 10/10 concept PNG paths/decode/hash prefixes valid; all 12 changed/new files are Markdown documentation.** Proposed future source paths are intentionally not existing-file assertions. Git source/test/script/package/lockfile/AGENTS diffs are empty. Decision consistency review preserves accepted constraints and labels every new architecture/budget/batch choice proposed. Git whitespace checks pass before commit.

`npm ci`, lint, typecheck, runtime/browser tests, build and audit were **not run** for this documentation-only change. No performance measurement was newly collected. Documentation references/consistency and Git whitespace/scope checks are the validation for this task; current application test outcomes remain those recorded by M5-C.

## Approval request and stop

Approve or revise D1–D4/D6 and authorize **M6-A1 only** if the proposed architecture, review-only content exception and numerical targets are acceptable. Other decisions are requested before their affected batches, not as permission to implement them now. Commit/push this planning package under the standing instruction, then stop. **Do not implement M6-A1, start any other batch or deploy without a new explicit owner authorization.**
