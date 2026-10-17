# Technical Requirements

## Preferred stack
- Next.js App Router, React, TypeScript strict, Tailwind CSS.
- Three.js + React Three Fiber + Drei for 3D rendering.
- Blender authoring; glTF/GLB for runtime 3D assets.
- Motion library for HTML UI; camera tweening with one selected system (GSAP or a small custom controller) after prototype testing.
- Vercel-compatible deployment; local structured content in MVP.

## Runtime boundaries
- Server components for static/editorial content by default.
- 3D canvas dynamically loaded client-side; do not SSR browser-only Three.js code.
- Avoid hydrating the entire application as one client component.
- Typed config for scene nodes, camera presets, content and routes.
- Static fallback works if WebGL or JavaScript 3D path fails (core navigation still functional).

## Security and quality
- Validate external links and form input; keep secrets server-side.
- Lint, typecheck, production build and tests required per milestone.
- No backend/database unless a user-facing requirement justifies it.

## M5-A workflow supersession

For the authorized procedural refinement, use Three/R3F code geometry and lightweight shared materials. Blender/external modeling software and paid assets are explicitly outside this workflow. Preserve existing framework boundaries and camera controller. Later external assets/effects require separate owner authorization.

## M5-B conservative rendering defaults

Maintain demand rendering, DPR 1–1.5, antialiasing, low-power preference and four fixed lights (one point light). The context now supports alpha to compose over static CSS atmosphere. Shadows and post-processing remain disabled/absent. No graphics-settings UI, adaptive quality controller or new package is introduced; broader quality policy belongs to separately authorized M5-C.

## M6-A1 current runtime clarification

The accepted M5-C policy supersedes the older M5-B DPR/no-quality-UI description above: Low/Medium/High caps 1/1.5/2, conservative Low default. M6-A1 retains those settings and one demand-rendered Canvas, adds only one lazy procedural Development technical bay and validated scene restoration, and leaves the hub rig/editorial architecture intact. No Blender, model/image download, animation/physics package, backend or dependency update is required. Detailed behavior/measurements: docs/04-delivery/M6A1_IMPLEMENTATION_REPORT.md. Later batches and deployment remain gated.
