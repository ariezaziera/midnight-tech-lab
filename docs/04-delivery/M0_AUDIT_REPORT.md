# M0 — Documentation & Asset Audit

Date: 2026-10-16 (Asia/Kuala_Lumpur). Status: audit delivered; owner gate pending. **M1 is not authorized or started.**

## Scope and evidence

Reviewed local checkout `C:/Users/User/Desktop/Portfolio3d` at baseline commit `c7465c6e4ab535767451ad5233858a453bedba74`. Its origin matches `https://github.com/ariezaziera/midnight-tech-lab.git`. The initial working tree was clean. This audits the local checkout, not an assertion that it matches the latest remote branch; no fetch, push or application setup was performed.

Read `AGENTS.md`, all 34 existing Markdown documents under `docs/`, the root README, changelog and both Codex handoff prompts. Visually inspected all ten bundled PNGs. The repository contains no application source, package manifest, lockfile, production media or runtime test setup.

Changes are limited to this report, `TASKS.md`, `DECISIONS.md` (unresolved findings only) and `CHANGELOG.md`. No approved architecture, navigation or art direction has been changed. Recommendations below are proposals, not owner decisions.

## Verdict

The documentation is sufficient to plan a small M1 foundation after explicit approval of scope and placeholders. Its architecture is appropriate for a single Central Hub with independent HTML content. It is not sufficient for final visual sign-off, factual portfolio publication or production asset integration.

Confirmed direction remains: independent project; Midnight Tech Lab; cinematic realism; purple/pink/blue cosmic atmosphere with amber practical lights; solo creator positioning; conventional HTML navigation plus 3D exploration. No database, authentication, payments or contact backend is required for the MVP.

Priority meanings: P0 = gate requiring owner action; P1 = ambiguity or risk to settle before the affected milestone; P2 = documentation maintenance. Missing final assets do not automatically block M1 or a labeled M2 blockout (`REFERENCE_REVIEW.md`).

## Prioritized findings

### AUD-01 — P0, before M1: owner gate remains open

Evidence: `IMPLEMENTATION_PLAN.md` M0 gate, `TASKS.md` and the explicit M0-only request. Owner must acknowledge reference/content gaps and approve the proposed placeholder foundation before any scaffold. Recommendation: authorize only M1 static route shells and provisional styling; preserve subsequent camera/art and high-fidelity approval gates.

### AUD-02 — P0, before final visual sign-off: no approved screen references or final tokens

Evidence: `DESIGN_SYSTEM.md`, `SCREEN_SPECIFICATIONS.md`, `REFERENCE_REVIEW.md`, `WIREFRAME_MAP.md`. All dimensions, fonts and colors remain provisional. Ten existing boards are not approved desktop/mobile layouts; spacing, type scale, panel widths and mobile composition are not measurable approved specifications. Recommendation: owner selects per-screen crops or separate layouts for Home, Projects, Case Study, About, Services and Contact, with approval status and target viewport. Approve candidate tokens only for a provisional M1 pass; retain contrast and visual review before finalization.

### AUD-03 — P0, before public content release: authentic content and contact are absent

Evidence: `CONTENT_GUIDELINES.md`, `SCREEN_SPECIFICATIONS.md`, `PRD.md`, `RELEASE_CHECKLIST.md`. Candidate project names are documented, but public naming/permission, roles, descriptions, outcomes, screenshots and live/repository URLs are unconfirmed. Actual portrait and permission, biography/education/experience, CV, service scope and verified contact/social links are absent. No functional contact acceptance test can pass without at least one verified destination.

Recommendation: owner supplies an approved content packet. Before then, show explicit draft/empty states locally; omit unsupported claims, CV download and contact actions. Do not copy board faces, sample addresses, years of experience, project counts, dates, response-time promises or invented project imagery. Define a publication-status policy so draft records cannot leak through detail URLs, featured hotspots, metadata or sitemap. M1 shells can proceed after AUD-01; public release cannot.

### AUD-04 — P0, before M5: production assets and rights are missing

Evidence: all 13 rows in `ASSET_MANIFEST.md` are Missing. These comprise CH-001–CH-010 (platform, desk, chair, monitors/display, Creator ID, console, globe, lighting, props and mascot/cozy objects), ENV-001 nebula, ID-001 portrait and REF-001 approved crops. No GLB, Blender source, runtime texture or actual portrait is bundled. Fonts are named candidates without a selected acquisition/source record.

Recommendation: use explicitly labeled primitives only at the authorized blockout milestone. Extend the future asset inventory with owner/source, license and attribution, approval, runtime path, file size, texture dimensions, mesh/material counts and export/compression requirements. Also track project media, CV, fallback artwork, favicon and OG media, which are not covered by the current manifest. Board images are reference evidence, not automatically licensed production art or fallback media.

### AUD-05 — P1, before M1: contact UI requirements disagree

Evidence: PRD MVP includes Contact UI and FR-07 allows a disabled/demo form; `SCREEN_SPECIFICATIONS.md` CONTACT-001 allows form UI only with secure functional delivery; `API_CONTRACTS.md` defers the backend. Recommendation requiring owner agreement: MVP uses a verified direct contact link with no form. Until a link is supplied, use a visibly incomplete contact shell. Defer provider, validation, abuse protection and privacy decisions until a separately approved backend milestone. Never simulate success.

### AUD-06 — P1, before planning release: MVP and later expansion are mixed

Evidence: `PRD.md` and `SCOPE.md` defer cinematic assets, full modules and possibly intro; M5 integrates final assets and M6 combines remaining islands/intro with accessibility, performance, SEO and deployment. This obscures whether MVP must wait for expansion. HOME-001 mentions skip intro although the intro is still an open decision.

Recommendation requiring owner agreement: treat M1–M4 as the functional MVP candidate; apply relevant release checks before any publication; retain M5 art and M6 expansion as separately approved work. Do not defer baseline accessibility, error handling, SEO or performance checks until expansion. Default proposal is no intro in MVP, subject to owner approval. This report does not rewrite the milestone plan.

### AUD-07 — P1, before M3: hotspot and route journeys need one scope matrix

Evidence: HOME-001 lists six conceptual hotspots; `INTERACTION_SPEC.md` maps Navigation Console to module selection without a later label; `SCENE_GRAPH.md` marks that console interactive later; MVP acceptance names Creator ID and featured projects. `USER_FLOWS.md` includes Development Lab and Service Detail, while architecture defines no service-detail route and the Lab is post-MVP. Creator ID is described as panel/route in some places but About in acceptance.

Recommendation: owner confirms active MVP objects and outcomes. Propose Creator ID to `/about`, featured project preview to a verified case study, and workstation as a focus preset. Keep console/globe/cozy/module travel deferred. Use `/services` sections for service details unless a new route is approved. Preserve HTML equivalents. Update flows after approval so future journeys cannot be mistaken for MVP tests.

### AUD-08 — P1, before M2/M3: camera and state contracts are incomplete

Evidence: `APP_FLOW.md` includes `selected-module` but omits `top`/`transition` from its preset list; `CAMERA_SYSTEM.md` defines the latter as optional view/intermediate waypoint and does not define `selected-module`. Serializable IDs are required, but world-shell unmount/return restoration is not specified. Collision-aware travel has no geometry or measured path yet.

Recommendation: distinguish stable camera presets, selected module IDs and transient travel state in a typed model; define a transition table for rapid reactivation, Escape, reset, route changes, load failure and reduced-motion changes. Specify validated session restoration with overview fallback when the shell remounts. Measure position/target/FOV/clipping and orbit limits in blockout; do not infer these from drawings. Seek camera approval after M3 evidence. No generic physics engine is justified by the present requirement.

### AUD-09 — P1, before final reference selection: paths are valid but some mappings are weak

Evidence from visual inspection: `earlier-central-hub.png` contains detailed Central Hub, Development Lab and Design Studio panels. `earlier-module-layouts.png` mainly details the world overview, Media Lab, Services Terminal and Personal Corner. `earlier-module-experience.png` mainly details the Central Hub, with surrounding modules. Yet `WIREFRAME_MAP.md` assigns Development/Design to the second board and Media to the third.

Recommendation: review Development/Design crops from `earlier-central-hub.png` and Media from `earlier-module-layouts.png`. Owner must select approved crops; filenames and successful hashes alone do not establish semantic suitability. Boards also show inconsistent hub composition, personal-corner placement, illustrative form flows, stylized lighting and extra controls. Written cinematic-realism/MVP decisions retain precedence; do not import extra features or measurements.

### AUD-10 — P1, during M1 setup: dependency compatibility is not pinned

Evidence: `TECHNICAL_REQUIREMENTS.md` specifies families but no compatible versions; no package manifest or lockfile exists. Recommendation: choose supported stable Next.js/React/React DOM/TypeScript versions together, check R3F and Drei peer dependencies before adding 3D, and commit the npm lockfile. Do not install untested latest versions independently. Record Node/npm versions and use separate lint, typecheck, test and build scripts. No packages were installed in M0.

### AUD-11 — P1, before M2 and before release: performance/fallback criteria are hypotheses

Evidence: `PERFORMANCE.md` explicitly marks 60/30 FPS goals as hypotheses; target devices, network conditions, initial transfer budget, draw-call/texture budgets and quality thresholds are unspecified. `APP_FLOW.md` names quality tiers but not selection, user override or recovery. Rich lighting, translucent overlays, large textures and multiple islands could overwhelm mobile GPUs.

Recommendation: agree representative devices/browsers and a measurement protocol before setting budgets; prefer content-first 2D mobile as the provisional baseline. Test slow/failed chunk and model loading, WebGL initialization and context loss, low performance and disabled JS. Keep fallback/navigation server-rendered outside the scene boundary; an error boundary alone is not a complete failure strategy. Test keyboard, focus return, pause/reduced motion, contrast and zoom throughout implementation. No performance or WCAG conformance claim is established by this audit.

### AUD-12 — P2: handoff documentation is stale

Evidence: reference README says this package lacks approved binaries (true) but does not acknowledge the ten bundled concept boards; root README still instructs creating a repo/copying files/adding references despite this existing repository and v2 inventory. Recommendation: clarify concept-board presence versus missing approved/production assets and replace initialization instructions with the milestone gate process in a subsequent documentation cleanup.

## Reference validation results

All paths below are relative to `docs/05-references/`. Each file exists, decodes as a 1536×1024 image and matches the manifest SHA-256 prefix:

- `wireframes/phase-3-pages.png` — `7f46962850c1`
- `wireframes/phase-4-interactions.png` — `cd11570224a8`
- `visual-concepts/phase-5-design-system.png` — `989c1fb86831`
- `visual-concepts/phase-7-assets.png` — `c455ffda4754`
- `wireframes/phase-8-production.png` — `0f8d9ba20bfa`
- `wireframes/earlier-wireframe-overview.png` — `3e4a6ab7957e`
- `visual-concepts/earlier-portrait-placement.png` — `b36773eca88a`
- `wireframes/earlier-central-hub.png` — `a3c7c8cc3eac`
- `wireframes/earlier-module-layouts.png` — `369c42ba951d`
- `wireframes/earlier-module-experience.png` — `0c1ad344a33b`

Result: **10/10 unique referenced PNG paths present; 10/10 hash prefixes match; 10/10 decode; 0 broken listed visual paths.** REF-001 remains missing because existence is not owner approval. No screen crops at 1440×900 or 390×844 were supplied.

## Architecture review and proposed M1 boundary

The six proposed layers, URL-based navigation, typed local records and narrowly scoped interaction state fit this project. Server Components should retain static content; a small client wrapper should later own the dynamically loaded scene. `ssr: false` belongs inside a Client Component, not a Server Component. See the official [Next.js lazy-loading guidance](https://nextjs.org/docs/app/guides/lazy-loading).

Keep TypeScript strict and fail on type errors; validate slugs, route references, category arrays and publication state at content boundaries. Next.js supplies TypeScript integration, but configuration and successful checks still need implementation evidence. See [Next.js TypeScript documentation](https://nextjs.org/docs/app/api-reference/config/typescript).

Tailwind is suitable for the editorial shell and shared candidate CSS tokens. Select its major version deliberately; the current Next.js installation guide uses `@tailwindcss/postcss` and a CSS import. Avoid mixing instructions from different Tailwind generations. See [Tailwind's Next.js guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

R3F is appropriate for React-owned scene composition. Official guidance pairs Fiber 8 with React 18 and Fiber 9 with React 19; verify the chosen stable release and Drei/Three peer requirements at setup. See [R3F introduction](https://r3f.docs.pmnd.rs/getting-started/introduction). These sources were checked on 2026-10-16; no dependency matrix has been installed or build-tested here.

Proposed M1 files, for approval only:

- Root: `package.json`, `package-lock.json`, `tsconfig.json`, `next-env.d.ts`, Next/PostCSS/ESLint configuration.
- `src/app/layout.tsx`, `page.tsx`, `globals.css`, `not-found.tsx`; page shells for `projects`, `projects/[slug]`, `services`, `about`, `contact`.
- `src/components/navigation/` and `src/components/ui/`: semantic navigation and minimal reusable shell UI.
- `src/types/` and `src/lib/`: only route/shell types and utilities needed by M1; typed editorial records arrive with their slice.
- `tests/`: direct-navigation and shell accessibility smoke checks; no camera tests until camera logic exists.

Proposed M1 dependencies: Next.js, React, React DOM; TypeScript and matching types; Tailwind/PostCSS integration; ESLint with matching Next config; a selected navigation test runner. Defer Three.js/R3F/Drei until M2 and animation tooling until demonstrated need. No database, CMS, authentication, payment or contact-provider dependencies. Exact versions and test tooling remain setup choices after authorization.

Proposed M1 acceptance checks:

1. Record `node -v` and `npm -v`, compatible dependencies and committed lockfile; clean dependency installation succeeds.
2. Define and run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`; each exits 0. Document failures rather than bypassing them.
3. Direct-load all six route patterns, including an explicitly labeled local case-study placeholder if approved; unknown slugs produce a clear not-found state. Do not fabricate a real project to exercise routing.
4. Main navigation and core shell content remain reachable with JavaScript disabled; keyboard focus is visible, current route is conveyed, mobile navigation works and no link points to invented contact/CV/project assets.
5. Check widths 320, 390, 768, 1024 and 1440, zoom and reduced motion; capture 1440×900 desktop and 390×844 mobile shell screenshots. Record provisional styling differences; no parity claim without approved references.
6. Confirm there is no canvas/scene implementation, submit endpoint or public unverified biography. Stop for the M1 gate; do not automatically begin M2.

## Owner decisions requested

- **Now:** acknowledge the missing references/assets/content and authorize M1 only, with labeled local placeholders and candidate tokens. This is the M0 exit gate, not final visual approval.
- **Before M1 UI choices:** accept or revise direct-link-only contact, with an incomplete shell until a verified link is provided; approve provisional fonts/colors and content-first mobile shells.
- **Before M2/M3:** confirm active MVP hotspots, intro deferral, mobile 2D baseline and camera review procedure.
- **Before publication/art integration:** approve authentic content and rights, final screen references/tokens, final assets and measured release targets.
- **Before expansion:** resolve Personal Corner location and whether Services Terminal is an island or attachment; approve new routes/modules separately.
- **Release planning:** confirm the proposed functional MVP boundary and early hardening checks in AUD-06.

## Verification and limitations

- Read all 34 baseline Markdown documents under `docs/` (4 project, 9 design, 5 experience, 10 technical, 5 delivery, 1 reference), plus root instructions/handoffs. Visually inspected all 10 concept boards.
- PowerShell `Test-Path`, `Get-FileHash -Algorithm SHA256`, regex extraction of reference paths and `System.Drawing.Image.FromFile`: all ten references pass existence/hash/decode checks.
- Git status/remote/commit inventory read with per-command `-c safe.directory=C:/Users/User/Desktop/Portfolio3d`; no persistent Git configuration was changed.
- Lint, application typecheck, build, unit/E2E tests and desktop/mobile application screenshots: **not run / not available**, because there is no application or package manifest. No tooling was scaffolded merely to run them.
- No deployment, public-content publication, architecture change or owner approval is implied. M0 audit work is delivered; its owner approval gate remains open.
