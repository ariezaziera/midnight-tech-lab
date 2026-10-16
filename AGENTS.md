# AGENTS.md — Midnight Tech Lab

## Mission
Build a new, independent, cinematic-realism 3D portfolio and solo creative-studio storefront for Arieza. Do not modify or migrate the existing Arieza Studio repository.

## Required reading (in order)
1. `docs/00-project/PRD.md` and `DECISIONS.md`
2. `docs/01-design/DESIGN_SYSTEM.md`, `SCREEN_SPECIFICATIONS.md`, `WIREFRAME_MAP.md`
3. `docs/02-experience/APP_FLOW.md`, `CAMERA_SYSTEM.md`
4. `docs/03-technical/ARCHITECTURE.md`, `TECHNICAL_REQUIREMENTS.md`, `SCENE_GRAPH.md`, `ASSET_MANIFEST.md`
5. `docs/04-delivery/IMPLEMENTATION_PLAN.md`, `ACCEPTANCE_CRITERIA.md`, `TASKS.md`

## Authority and ambiguity
- Explicit user-approved decisions in `DECISIONS.md` take precedence over illustrative mockups.
- Approved per-screen specifications and acceptance criteria govern implementation; design tokens govern visual styling.
- Reference images are inspiration unless accompanied by approved measurements and actual assets.
- Never invent factual biography, project results, testimonials, client work, contact information, or personal photos.
- If a required asset or decision is missing, implement a visibly labeled placeholder and log the gap in `TASKS.md`; do not silently substitute.
- Ask for approval before changing approved architecture, navigation, art direction, or major scope.

## Engineering constraints
- Next.js App Router, TypeScript strict, Tailwind CSS, React Three Fiber, Three.js and Drei.
- Keep critical content reachable through normal HTML navigation independent of WebGL.
- Use semantic HTML, keyboard support, visible focus, reduced-motion behavior and mobile fallback.
- Never commit credentials; no production contact endpoint without spam prevention and server-side validation.
- No unnecessary database, authentication, CMS or payment system in MVP.

## Execution protocol
1. Identify current milestone and inspect existing code before editing.
2. State scope, files to change, assumptions, dependencies and acceptance tests.
3. Implement the smallest working vertical slice. Do not build all islands at once.
4. Run lint, typecheck, build and relevant tests; report exact outcomes (never claim tests were run if not).
5. Capture desktop/mobile screenshots where possible and compare against approved references.
6. Update `TASKS.md`, `CHANGELOG.md`, and decision log if applicable.
7. Stop at approval gates for camera/art direction and high-fidelity assets.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
