# Midnight Tech Lab — Codex documentation pack v1.0

A greenfield portfolio and solo freelance storefront with a cinematic 3D cosmic world plus accessible editorial content.

**Status:** M3 functional prototype accepted; M4 accepted; M5-A procedural refinement complete and awaiting owner review. The accepted M1 HTML foundation and M2 blockout remain usable. Final content/design remain unapproved. No actual Blender models or real portrait are included. Do not publish or begin M5-B/M5-C/M6 without owner approval.

## Local development
Use Node 22 (tested with 22.14.0) and npm (tested with 11.16.0). Run `npm ci`, then `npm run dev` and open `http://127.0.0.1:3000`. The server binds to loopback only.

Validation: `npm run lint`, `npm run typecheck`, `npm run build`, then `npm test`. Browser tests start the production server themselves; port 3000 must be free. Install the matching browser with `npx playwright install chromium` if it is not already available. Current tests capture evidence under `docs/04-delivery/evidence/m5a/after/`; historical M1/M2 evidence is retained. Run installation before starting servers or tests to avoid Windows native-file locks.

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


M5-A uses original lightweight procedural geometry, shared materials and static batching to refine the existing hub. No Blender, paid/downloaded asset, new texture, lighting effect or camera feature is required. The same four presets and three target mappings remain. Fresh baseline and after measurements are captured with `node scripts/capture-hub.mjs before` / `after` against a running local production build; these commands intentionally write only their matching evidence folders. Do not overwrite the committed baseline when reviewing later changes. See `docs/04-delivery/M5A_IMPLEMENTATION_REPORT.md` and `docs/04-delivery/evidence/m5a/comparison.html` for owner review before any M5-B work.
