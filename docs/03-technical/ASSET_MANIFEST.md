# Asset Manifest — v1

No production assets are bundled. Every row is planned, not complete.

| ID | Asset | Priority | Target format | Status |
|---|---|---|---|---|
| CH-001 | Floating platform and rock underside | P0 | GLB | Missing |
| CH-002 | Main desk | P0 | GLB | Missing |
| CH-003 | Chair | P0 | GLB | Missing |
| CH-004 | Monitors and project display | P0 | GLB + UI texture | Missing |
| CH-005 | Creator ID frame | P0 | GLB + user photo | Missing |
| CH-006 | Navigation console | P1 | GLB | Missing |
| CH-007 | Holographic globe | P1 | GLB + shader | Missing |
| CH-008 | Lamp and practical lights | P1 | GLB | Missing |
| CH-009 | Plants, books, mugs and props | P2 | GLB | Missing |
| CH-010 | Robot mascot and cozy objects | P2 | GLB | Missing |
| ENV-001 | Nebula background | P0 | Image/texture | Missing |
| ID-001 | Arieza actual portrait | P0 for final art | User-supplied image | Missing |
| REF-001 | Approved cropped reference screens | P0 for visual sign-off | PNG | Missing |

## Rules
- Use license-cleared or original assets; record source/license before publishing.
- Keep GLB files optimized and use compressed textures where supported.
- Avoid generating a fake likeness or substituting mockup portrait as actual owner image.
- Blockout may use simple geometry labeled as placeholder.

## M2 status clarification

CH-001–CH-008 now have original procedural placeholder geometry in `src/components/three/hub/`; ENV-001 uses only a background color. This does **not** complete any production GLB/texture/image row above. CH-009/CH-010 detailed props/mascot remain unimplemented. The actual portrait, project imagery, approved screen crops and licensed production assets are still missing. All scene objects are labeled collectively as placeholders with an HTML zone legend; no board artwork or depicted identity was reused.

## M5-A code-first assets

The owner explicitly approved original procedural refinement rather than a Blender/GLB workflow. CH-001–CH-008 now have refined authored code geometry; this is a reviewable procedural art study, not final photorealistic or high-fidelity approval. Source is `src/components/three/hub/` and typed configuration in `src/lib/scene/hub-config.ts`. Geometry is authored locally; no third-party artwork/model, image texture or asset download is used. Existing concept boards guide broad composition only.

Actual portrait/project media, final references, licensed image content and any future external production assets remain missing/unapproved. The original GLB target-format rows above are historical planning, not a requirement to obtain GLBs for M5-A. Detailed props, mascot, new modules and environment effects remain deferred.
