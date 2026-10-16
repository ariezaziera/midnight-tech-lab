# Midnight Tech Lab — Codex documentation pack v1.0

A greenfield portfolio and solo freelance storefront with a cinematic 3D cosmic world plus accessible editorial content.

**Status:** M1 local HTML foundation; owner review pending. Final content/design remain unapproved. No actual Blender models or real portrait are included. Do not publish or begin M2 without owner approval.

## Local development
Use Node 22 (tested with 22.14.0) and npm (tested with 11.16.0). Run `npm ci`, then `npm run dev` and open `http://127.0.0.1:3000`. The server binds to loopback only.

Validation: `npm run lint`, `npm run typecheck`, `npm run build`, then `npm test`. Browser tests start the production server themselves; port 3000 must be free. Install the matching browser with `npx playwright install chromium` if it is not already available. Tests capture route screenshots under `docs/04-delivery/evidence/m1/`. Run installation before starting servers or tests to avoid Windows native-file locks.

The sole project fixture is `/projects/placeholder`. It represents no actual project. Contact has no working destination or form. Styles and system fonts are provisional. See `docs/04-delivery/M1_IMPLEMENTATION_REPORT.md` for validation and limitations.

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
