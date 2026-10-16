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
