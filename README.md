# Midnight Tech Lab — Codex documentation pack v1.0

A greenfield portfolio and solo freelance storefront with a cinematic 3D cosmic world plus accessible editorial content.

**Status:** M3 functional prototype accepted; M4 accepted; M5-A accepted; M5-B accepted; M5-C accepted; M6-A1 one-scene host/review bay complete and awaiting owner review. The accepted M1 HTML foundation and M2 blockout remain usable. Final content/design remain unapproved. No actual Blender models or real portrait are included. Do not publish or implement M6 without explicit owner approval.

## Local development
Use Node 22 (tested with 22.14.0) and npm (tested with 11.16.0). Run `npm ci`, then `npm run dev` and open `http://127.0.0.1:3000`. The server binds to loopback only.

Validation: `npm run lint`, `npm run typecheck`, `npm run build`, then `npm test`. Browser tests start the production server themselves; port 3000 must be free. Install the matching browser with `npx playwright install chromium` if it is not already available. Current tests capture evidence under `docs/04-delivery/evidence/m6a1/after/`; historical M1/M2 evidence is retained. Run installation before starting servers or tests to avoid Windows native-file locks.

The sole project fixture is `/projects/placeholder`. It represents no actual project. Contact has no working destination or form. Styles and system fonts are provisional. See `docs/04-delivery/M1_IMPLEMENTATION_REPORT.md` for validation and limitations.

M2 introduced the procedural 3D view on screens at least 768 CSS px wide, with descriptive HTML on smaller screens and without JavaScript. Its static-scene implementation and validation remain documented in `docs/04-delivery/M2_IMPLEMENTATION_REPORT.md`. M3 extends that base as described below.

M3 makes Creator ID, Project Display and Workstation selectable with pointer or the HTML focus buttons. About Arieza and Browse projects work as normal links at any time. Back to overview, Reset view and Escape return to overview; Escape operates while focus is inside the studio. Stable views restore when returning from HTML pages; Reset clears the saved view. Reduced motion snaps rather than traveling. Mobile stays HTML-only. Current report: `docs/04-delivery/M3_IMPLEMENTATION_REPORT.md`; the M2 report above is historical.

Start with `AGENTS.md`, then `docs/00-project/PRD.md`, `docs/00-project/DECISIONS.md` and `docs/04-delivery/IMPLEMENTATION_PLAN.md`.

## Original documentation-pack setup (historical)
1. Create a new Git repository for Midnight Tech Lab.
2. Copy these files into the repository root, preserving paths.
3. Add approved reference images to `docs/05-references/` and update `WIREFRAME_MAP.md`.
4. Give Codex the first milestone from `IMPLEMENTATION_PLAN.md` and tell it to read `AGENTS.md`.
5. Review screenshots and test results before approving each milestone.

**Important:** AI-generated design boards are concept illustrations, not editable Figma layouts or existing GLB assets. Their depicted faces are placeholders, not Arieza's actual portrait.


## Pack v2 — Visual fidelity handoff
The v2 package bundles ten earlier concept boards under `docs/05-references/`. See `docs/01-design/WIREFRAME_MAP.md` for verified paths, `VISUAL_FIDELITY_CHECKLIST.md` for review gates, and `CODEX_VISUAL_HANDOFF_PROMPT.md` for Codex handoff. Concept art is illustrative and is not a substitute for user-approved final assets or per-screen designs.


M4 editorial data lives in `src/content/editorial.ts`, with schema in `src/content/model.ts` and validation/publication selectors in `src/lib/content.ts`. No authentic project has publication approval. `/projects` therefore shows an honest empty state and a separate local template; only approved published project tags become filters. `?category=...` filters server-rendered results without JavaScript. Draft details return 404. All routes retain noindex/nofollow; this is a prototype safeguard, not access control or permission to deploy. Test-only contract fixtures never enter application routes. M3 camera/framing styling remains subject to later visual review.


M5-A uses original lightweight procedural geometry, shared materials and static batching to refine the existing hub. No Blender, paid/downloaded asset, new texture, lighting effect or camera feature is required. The same four presets and three target mappings remain. Fresh baseline and after measurements are captured with `node scripts/capture-hub.mjs before` / `after` against a running local production build; these commands intentionally write only their matching evidence folders. Do not overwrite the committed baseline when reviewing later changes. Historical M5-A report/evidence: `docs/04-delivery/M5A_IMPLEMENTATION_REPORT.md` and `docs/04-delivery/evidence/m5a/comparison.html`; M5-A was subsequently accepted as the M5-B base.


M5-B retains the geometry/cameras and uses four fixed lights plus shared material responses in `src/lib/scene/look-config.ts`. Static CSS gradients/stars sit behind a transparent desktop canvas, without post-processing or continuous animation. Historical M5-B report: `docs/04-delivery/M5B_IMPLEMENTATION_REPORT.md`; comparison: `docs/04-delivery/evidence/m5b/comparison.html`. Matched capture commands against the correct local production build: `node scripts/capture-hub.mjs before m5b` / `after m5b`. Preserve the committed baseline; do not regenerate it from a later scene. Repository commit/push is authorized after completed validation; deployment and M6 are not.

## Graphics quality (M5-C)
Desktop studio controls include native Low/Medium/High radios, with Low as the conservative default. They cap DPR at 1/1.5/2 without changing lighting, geometry or cameras. At device DPR 1 they intentionally match. Reduced motion remains independent; mobile uses HTML only. Retry and responsive remount retain selection within the studio; a fresh document starts Low.

Accepted implementation report: `docs/04-delivery/M5C_IMPLEMENTATION_REPORT.md`; all-mode/four-camera comparison: `docs/04-delivery/evidence/m5c/comparison.html`. All 55 tests pass, preserving the 51 earlier checks. Production audit has zero vulnerabilities; existing development advisories remain tracked. Firefox/WebKit were unavailable. No real-device FPS claim is made.

Reproduce final captures against the matching production build with `node scripts/capture-hub.mjs after m5c`, then `node scripts/capture-quality.mjs` and `node scripts/review-quality.mjs`. Preserve committed before evidence: do not regenerate the M5-B baseline from M5-C. Owner review and explicit authorization are required before M6. Nothing is deployed.

## M6 planning and execution gates
The owner accepts M0–M5-C and reports smooth Intel HD Graphics 620 operation including High (qualitative feedback, not an FPS benchmark). The split-screen desktop layout remains approved. Only M6-A1 was authorized and is delivered for review; no later batch or deployment is authorized.

Review [M6 planning report](docs/04-delivery/M6_PLANNING_REPORT.md), [experience architecture](docs/04-delivery/M6_EXPERIENCE_ARCHITECTURE.md), [batch plan](docs/04-delivery/M6_BATCH_PLAN.md) and [owner decisions](docs/04-delivery/M6_OWNER_DECISIONS.md). D1–D4 and the F-only portion of D6 were subsequently approved for M6-A1 under explicit execution conditions. All other decisions/batches remain pending; acceptance does not authorize later expansion.

## M6-A1 local review
Desktop: use Enter Development Review Bay below the existing scene controls. The native control loads one explicitly labeled blank procedural review scene; Back to Central Hub beside Reset or scoped Escape restores the stable hub view. Reset selects hub overview. Browse Projects and all normal HTML routes remain available. No authentic portfolio/skill claims or active console/globe were added. Mobile/no-JS retains HTML only.

Current report: [M6-A1 implementation](docs/04-delivery/M6A1_IMPLEMENTATION_REPORT.md); visual comparison: [review sheet](docs/04-delivery/evidence/m6a1/comparison.html). All 65 checks pass (55 retained plus 10 new). F measurements pass: hub readiness median 663 ms against 1000 ms target; initial JS +5808 bytes; lazy bay 1280 bytes; twenty resource cycles and fifteen extended idle windows stable. Intel HD Graphics 620 feedback is qualitative; headless measurements do not replace real-device review. Stop before M6-A2/B1 or deployment.
