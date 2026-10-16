# M2 — Central Hub 3D Blockout

Delivered: 2026-10-17 (Asia/Kuala_Lumpur), following M2 authorization on 2026-10-16. Base: accepted M1 commit `897da56`. **M2 implementation complete; owner review pending. M3 has not started.**

## Result and scope

Home now contains a recognizable procedural floating-island workstation blockout. It uses one fixed three-quarter overview, distinguishable future interaction zones and basic lighting. Existing editorial pages remain Server Components, with HTML navigation and local content placeholders preserved. The prototype uses no real portrait, project artwork, production nebula texture or supplied production models.

No interactive hotspots, orbit controls, camera travel, reset/back state machine, intro, satellite islands, mascot, physics engine or final cinematic asset work was added. Contact remains an incomplete informational shell. Nothing was published.

## Implemented hierarchy

```text
StudioPreview (HTML loading/failure/mobile boundary)
└── lazy HubCanvas (desktop WebGL 2; browser-only)
    ├── Dark cosmic-inspired color background
    ├── Fixed Drei PerspectiveCamera
    ├── Ambient + two directional lights
    ├── CentralHub
    │   ├── CH_001_Platform: upper slab, rim, inverted cone and seven rock facets
    │   ├── CH_002_Workstation: desk, supports, two monitors, keyboard/mouse blocks
    │   │   ├── CH_003_Chair
    │   │   └── CH_008_Lamp: basic shade/stem and amber practical light
    │   ├── CH_005_CreatorID: framed neutral screen, no likeness
    │   ├── CH_004_ProjectDisplay: distinct pedestal/monitor, no project art
    │   ├── CH_006_NavigationConsole: cyan console geometry
    │   └── CH_007_Globe: wireframe geometry on base
    └── RendererLifecycle: readiness/counters and context-loss observation
```

An HTML title and zone legend identify all objects collectively as placeholders and explicitly state that there are no scene interactions. Reusable `Block` and `Monitor` primitives support separate platform/workstation/display components. Colors, root zone positions, platform dimensions, desk dimensions, DPR and camera live in typed configuration. Local object proportions remain prototype estimates. The platform is approximately 8m across; its slab top is Y=0.16m, with low-poly rock geometry below it. The warm desk and twin monitors are the main focal point, with Creator ID/project zones to the left and console/globe to the right.

## Dependencies and browser boundary

Pinned additions: **Three.js 0.186.1**, **@react-three/fiber 9.8.2**, **@react-three/drei 10.7.9**, and development **@types/three 0.186.0**. Registry and installed package peer ranges were inspected:

- R3F requires React/React DOM `>=19 <19.4` and Three `>=0.156`.
- Drei requires React `^19`, R3F `^9.0.0` and Three `>=0.159`.
- Installed React/React DOM **19.3.1** and the selected versions satisfy those ranges. `npm ls react react-dom three @react-three/fiber @react-three/drei @types/three` exited 0 with no invalid peers.

Drei's `PerspectiveCamera` is imported directly from its camera module. Its package brings transitive helpers (including camera-controls and a stats-gl dependency with its own Three version); none of those controls/statistics features is imported or implemented. The runtime scene uses the direct Three version. No extra motion or physics dependency was added.

`StudioPreview` provides server-rendered HTML and uses a viewport subscription to mount the desktop loader at 768 CSS px and wider. An effect probes WebGL 2, then calls dynamic `import()` for the world module. It cannot execute during SSR. Only this client subtree owns scene lifecycle state; Home and editorial route components retain their existing server boundaries. The 768px threshold is a practical M2 choice, not final mobile art approval.

Relevant official references: [R3F Canvas and failure handling](https://r3f.docs.pmnd.rs/api/canvas), [R3F demand rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance), [Drei PerspectiveCamera](https://drei.docs.pmnd.rs/cameras/perspective-camera). Package peers were verified against the registry before installation.

## Fixed camera measurements

Configuration: `src/lib/scene/hub-config.ts`, +Y up, nominal meters.

- Position `[8, 7, 10]`; target `[0, 0.25, 0]`.
- Vertical field of view `38°`.
- Near/far clipping `0.1m / 60m`.
- Canvas height 440 CSS px, width responsive to the page layout; DPR capped at 1.5.

The desktop captures show the complete platform/rock underside and all required zones without visible camera clipping. The camera is static, including under reduced-motion preference. Geometry/camera measurements are ready for owner composition review, not approved final art measurements. No camera preset transition or interaction system exists.

## Fallback and recovery behavior

- **Mobile / disabled JavaScript:** descriptive HTML studio layout and all portfolio navigation; at 390px the scene chunk is not requested and no canvas is created.
- **Unsupported WebGL 2:** capability probe returns an explanatory HTML fallback. A retry can recheck support; persistent lack of support remains readable.
- **Initialization/rendering exception:** the isolated React boundary displays an explanatory fallback and retry. Rest of the application remains navigable.
- **Rejected scene download:** the lazy-import rejection displays a fallback; releasing the network block and retrying successfully renders the scene.
- **Slow/unresponsive load:** a 15-second mount-to-first-draw watchdog replaces loading with a timeout message and retry. A delayed-download test successfully retries after the delay is released.
- **Context loss:** a listener catches a real `webglcontextlost` event, prevents default, removes the failed canvas and presents HTML recovery. Retry mounts a new renderer rather than depending on a lost context restoring itself.
- **Readiness:** only a completed draw with nonzero draw calls marks the viewport ready; merely creating a canvas is insufficient.

All failure paths preserve normal HTML routes. This is explicitly more than an error boundary. Timers/listeners are cleaned up on unmount. Retry is a renderer-recovery control, not a scene hotspot. No motion is mandatory; demand rendering and the fixed camera apply to all motion preferences.

## Validation — exact outcomes

Environment: Windows, Node **22.14.0**, npm **11.16.0**; Playwright **1.64.1**, Chromium **156.0.8078.4**, two workers against a local production server. Existing workspace dev processes were stopped temporarily to release Windows native dependency locks; the local preview is restored after validation.

- `npm ci`: **PASS, exit 0**, 427 packages installed, 428 audited.
- `npm run lint`: **PASS, exit 0**, zero warnings.
- `npm run typecheck`: **PASS, exit 0**, `next typegen` and strict `tsc --noEmit`.
- `npm run build`: **PASS, exit 0**, all existing route patterns generated, including the placeholder detail and not-found handling.
- `npm test`: **PASS, exit 0**, **25 passed in 54.3s** (17 preserved M1 checks plus eight M2 checks).
- `npm audit --omit=dev`: **PASS, exit 0**, zero production dependency vulnerabilities. The existing five high development-only lint-chain findings and ESLint support limitation remain; npm ci continues to report them. No forced fix or blanket install-script approval was applied.
- `git diff --check`: checked before delivery; no whitespace errors.
- Restored `npm run dev` at `http://127.0.0.1:3000`; a separate development-mode browser smoke check returned HTTP 200 and observed one ready canvas. The local preview remains running for review.

M1 navigation, six direct HTML routes with JavaScript disabled, invalid slugs/unknown pages, current-route state, keyboard focus/skip link, contact restrictions, reduced motion, 200% root text enlargement and responsive widths 320/390/768/1024/1440 remain covered. The M1 screenshot check now writes current evidence to M2, preserving historical M1 images.

M2 checks verify actual desktop rendering with no page errors, low geometry counts, idle rendering stops, pointer/scroll does not animate the scene, mobile creates no canvas/download, unsupported WebGL, initialization exception, failed chunk retry, timed-out chunk retry, real context loss/retry, and reduced-motion/viewport switching. Failure screenshots are captured before recovery. Browser tests required permissions allowing their own server-process cleanup on Windows.

Earlier attempts are not counted as passes: npm ci first hit a native file locked by the existing dev server; lint caught a reserved variable name and renderer-reference mutation; strict checking caught missing `this` annotations in test mocks. The first browser run passed 23/25: a scroll-triggered redraw was removed by disabling scroll size observation/raycast events; retry evidence was corrected to use viewport capture after full-page WebGL capture produced stale content. Focused reruns passed before the final full suite. A filtered npm test invocation parsed its arguments incorrectly and found no tests; direct Playwright invocation ran the intended focused checks. No check was silently skipped.

## Rendering and loading observation

Raw evidence: [initial-scene-measurements.json](evidence/m2/initial-scene-measurements.json).

One final local sample recorded **901ms** from desktop loader mount through first completed draw; **49 draw calls**, **866 triangles**, **49 geometries** and **1 renderer-reported texture**. That texture count is a renderer statistic, not evidence of an external texture asset. The counter settled at two frames and remained unchanged during an observed 500ms idle interval. No animation loop was required.

ResourceTiming recorded **387,471 transferred JavaScript bytes** across framework/shell and scene resources. The largest lazy scene chunk reported **244,783 transfer bytes / 244,483 encoded body bytes**. These include local server/browser accounting and are not a production performance budget. No external assets or media services were loaded.

No sustained FPS distribution, GPU memory, physical GPU identification or real mobile-device rendering was measured. The browser exposes the masked renderer `WebKit WebGL`. Therefore no 60/30 FPS, broad GPU compatibility or accessibility-conformance claim is made. The smoke-test caps (<120 calls/<12,000 triangles) are regression checks, not owner-approved performance targets.

## Screenshots and visual review

- [Rendered desktop overview — 1440×900](evidence/m2/desktop-rendered.png).
- [Mobile 2D view — 390×844 viewport, full page](evidence/m2/mobile-2d.png).
- [Unsupported WebGL](evidence/m2/desktop-unsupported-webgl.png).
- [Initialization failure](evidence/m2/desktop-initialization-failure.png).
- [Download failure](evidence/m2/desktop-download-failure.png).
- [Loading state](evidence/m2/desktop-loading.png).
- [Context-loss recovery state](evidence/m2/desktop-context-lost.png).
- [Reduced-motion static overview](evidence/m2/desktop-reduced-motion.png).

The evidence folder also includes current desktop/mobile captures of all six HTML shells. Desktop scene/failure captures use the established 1440×900 viewport; mobile full-page PNGs preserve the 390px layout and may be taller than the 844px viewport. Full-page WebGL capture produced stale content in this browser run, so verified viewport captures are the scene evidence. They were visually inspected along with the mobile layout and failure screens.

Against `earlier-central-hub.png` and `phase-8-production.png`, the prototype retains the workstation-centered arrangement, left Creator ID/project displays, right console/globe, warm lamp and violet-edged floating platform. It intentionally has simple surfaces, neutral displays, no personal imagery, no cozy corner, no detailed props/stairs and no cinematic environment. Rock placement was adjusted below the top surface after visual inspection. The complete layout is recognizable, but it is not a fidelity match to the boards. Approved per-screen crops still do not exist.

## Changed files

- Added `src/lib/scene/hub-config.ts`.
- Added `src/components/studio/studio-preview.tsx`.
- Added `src/components/three/world/hub-canvas.tsx`.
- Added `src/components/three/hub/{central-hub,primitives,platform,workstation,display-zones}.tsx`.
- Updated `src/app/page.tsx`, `package.json`, `package-lock.json` and `tests/foundation.spec.ts`; added `tests/scene.spec.ts`.
- Added this report and `docs/04-delivery/evidence/m2/` screenshots/measurement JSON.
- Updated README, CHANGELOG, DECISIONS, TASKS, ARCHITECTURE, SCENE_GRAPH, CAMERA_SYSTEM, ASSET_MANIFEST and PERFORMANCE documentation.
- Retained Next.js's automatically generated `AGENTS.md` documentation-reading block after verifying its source in `node_modules/next/dist/server/lib/generate-agent-files.js`. Read the bundled lazy-loading and server/client-boundary guides; the original project instructions are unchanged.

## Remaining review gates

Owner review of M2 composition, scale and fixed-camera framing is pending. Final assets, portrait/content, approved references/tokens, final mobile presentation, hotspot behavior, release scope and performance/device targets remain unresolved. Browser coverage is Chromium on Windows with emulated viewports; Safari/Firefox, physical mobile hardware, assistive-technology review and production deployment were not tested.

Production asset manifest rows remain missing; procedural geometry does not complete them. Future M3 behavior described elsewhere in the docs is not implemented by this milestone. **Stop here: M3 requires explicit owner approval.**
