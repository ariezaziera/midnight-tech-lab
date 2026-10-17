# M6-A1 — One-Scene Host & Development Technical Review Bay

Date: 2026-10-17 (Asia/Kuala_Lumpur). Base: accepted M5-C application plus M6 planning commit `66ff6fe`. **M6-A1 implemented for owner review only. No M6-A2, B1, other batch, deployment or publication is started.**

## Summary and authorization

Implemented the approved D1/D2/D3/D4 and F-profile portion of D6: one existing Canvas hosting either the accepted Central Hub or one on-demand Development technical review bay. Successful switches retain Canvas/renderer ownership. The bay is original procedural geometry, explicitly titled **Development Lab — Technical Review Placeholder**, with no project, language, skill, employer, outcome or screenshot claims.

The split-screen Home source, 440px viewport, editorial routes/content, global navigation, M3 camera configuration/rig, hub geometry and lighting config, DPR policy, draft exclusion, contact restrictions and noindex/nofollow remain unchanged. Console/globe stay inert. No dependency/lockfile, production artwork/model, shader/effect, physics, video, new room or URL/history feature was added.

Preparation included AGENTS, complete M6 planning package, accepted M5-C report/source/tests and installed Next client-boundary guide. Captured the unchanged application baseline before editing application source; only capture tooling and approval documentation changed beforehand.

## Files changed

New application files:

- `src/lib/scene/scene-registry.ts`: two typed scene IDs, lifecycle/request/event types, labels and separate fixed Development camera/bounds.
- `src/lib/scene/scene-session.ts`: validated stable-scene record, change subscription and denied-storage memory fallback.
- `src/components/three/world/scene-host.tsx`: request-scoped lazy loading, graph boundary, completed-draw watchdog and one graph slot.
- `src/components/three/zones/development-scene.tsx`: original procedural bench/display, local lamp and fixed camera placement.
- `src/components/studio/studio-directory.tsx`: explicit review-only description, native Enter/Retry controls, written lifecycle feedback and normal Projects link.

Existing application changes: `src/components/studio/studio-preview.tsx` owns scene requests/restoration/focus and passes them through the existing desktop loader; `src/components/studio/studio-controls.tsx` keeps hub controls in the hub, quality/Reset/direct links everywhere, and places bay Back next to Reset; `src/components/three/world/hub-canvas.tsx` retains the Canvas/common lights/camera and hosts the graph plus completed-draw/resource diagnostics. No `src/app/`, editorial data/presentation, accepted hub geometry/camera files, packages or lockfile changed.

Validation: new `tests/studio-zones.spec.ts` adds ten checks; five prior suites update evidence destinations. One retained reduced-motion test gains actual-moving-frame synchronization while preserving its real browser preference change and snap/target assertions. No test or guarantee is removed. `capture-hub.mjs` adds M6-A1/five-run support; `capture-review-bay.mjs` and `summarize-m6a1.mjs` collect entry/idle/responsive evidence and gate summaries. This report/evidence and relevant decision, architecture, camera/flow/accessibility, asset, performance, plan/task, README/CHANGELOG documents are updated.

Exact existing test files: `tests/foundation.spec.ts`, `scene.spec.ts`, `interactions.spec.ts`, `editorial.spec.ts`, `atmosphere.spec.ts` (all under tests). Exact script paths are under `scripts/`. Documentation: root README/CHANGELOG; `docs/00-project/DECISIONS.md`; experience ACCESSIBILITY/APP_FLOW/CAMERA_SYSTEM; technical ARCHITECTURE/ASSET_MANIFEST/PERFORMANCE/SCENE_GRAPH/TECHNICAL_REQUIREMENTS; delivery ACCEPTANCE_CRITERIA/IMPLEMENTATION_PLAN/TASKS/M6_BATCH_PLAN/M6_EXPERIENCE_ARCHITECTURE/M6_OWNER_DECISIONS, this report and `evidence/m6a1/`. Historical evidence is preserved.

## Architecture and graph ownership

The existing client-only world import remains the only renderer entry. Editorial pages remain Server Components. The StudioPreview boundary gains local typed state rather than converting the application to a client-rendered shell or adding a store/router dependency.

```text
StudioPreview: requested scene/sequence, matching status, quality, existing hub request
├── DesktopPreview: WebGL probe, world import, renderer fallback/watchdog/retry
│   └── one Canvas: demand, alpha, antialiasing, low-power preference
│       ├── shared PerspectiveCamera + hemisphere/key/rim lights
│       ├── SceneHost: zero graphs under loading/failure cover, one graph when ready
│       │   ├── CentralHub + unchanged M3 CameraRig, OR
│       │   └── lazy DevelopmentTechnicalReviewBay + fixed overview + one point light
│       └── RendererLifecycle: actual graph/draw/camera readiness and resource counters
├── existing HTML focus/quality/Back/Reset/route controls
└── HTML review directory and lifecycle message
```

There is no second scene Canvas or simultaneously mounted old/new graph. The existing short-lived detached capability probe is retained; its context is released before the world renderer is created. A zero-graph interval is intentional during replacement and covered by readable HTML in the same 440px viewport, matching the approved dispose-before-mount contract. The next graph is ready only after a nonzero completed draw with its requested camera settled; import resolution alone is insufficient.

SceneHost's effect owns one active flag, request/sequence and 15s timer. Cleanup invalidates old resolutions; graph rendering additionally requires the loaded request to match the current request. Parent event handling rejects stale IDs/sequences. Old graph error handlers capture their own invalidatable request, so a late error cannot fail a newer scene. The timer covers loading through completed draw and is cleared on readiness/failure/unmount. Timeout/failed imports cannot later silently become ready.

Shared primitive/material helpers instantiate resources per mounted graph, merge static parts per surface, and explicitly dispose templates/materials/batches on unmount. Existing rock ownership is unchanged. The bay has nine attached mesh materials; the reused helper constructs a twelve-slot palette, including unused slots, and disposes all of them. Both are below the material allowance. Renderer geometry counters describe uploaded/live renderer resources, not a complete CPU object/heap or VRAM inventory. Imported JavaScript stays browser-cached; disposing graphs does not unload JS modules.

## Bay geometry, lighting and camera

The bay contains a simple platform, warm chamfered desk/supports, one blank framed monitor, abstract blank peripheral blocks, lamp and two small cool accents. No object is an exhibit hotspot. All geometry/materials are authored in code and reuse the accepted material responses. Common hemisphere/key/rim lighting remains; the bay supplies one restrained point light, replacing rather than adding to the hub lamp. Four active lights maximum, one point, no shadows.

Camera: position **[5.6,4.6,6.8]**, target **[0,1,0]**, vertical FOV **38°**, clipping **0.1 / 40m**. Fixed configuration envelope: min **[5,4,6]**, max **[6,5,7]**. Placement happens directly before a demanded draw; no motion, orbit, exhibit preset or cross-world flight. Reduced motion is independent of quality and scene entry requires no travel. The four hub poses/targets/FOV/clipping/bounds/waypoint/duration and controller source are untouched and retain their tests.

## Navigation, restoration and accessibility contract

- Enter Development Review Bay is a native button. It starts a new scene request, releases the prior graph and loads Development only when requested or restored from a validated stable ID. Initial hub/mobile/no-JS paths do not request the bay chunk.
- Readiness focuses the named studio heading without forced scrolling. Explicit Back to Central Hub or scoped Escape restores the previous completed hub preset and entry-button focus. Bay Back sits beside Reset so it is discoverable near the scene controls.
- Loading is cancellable. Cancellation transitions back to hub and leaves a written cancellation notice after readiness; late imports cannot mount or save it. Failed download, graph construction failure and timeout have understandable feedback, Retry, Back and ordinary HTML links.
- Reset immediately removes the previous scene-session record, resets the memory default to hub, saves the existing overview preset and requests hub overview. An immediate route departure therefore cannot restore the bay. Completed readiness may save the hub record again. Reset retains quality and never creates a history entry. The normal About/Projects links stay usable before camera/scene readiness.
- Only completed ready scenes are saved under **`midnight-tech-lab:stable-scene:v1`**, with valid values `hub`/`development`. Unknown/removed IDs become hub; unavailable storage uses in-memory fallback. The existing **`midnight-tech-lab:stable-preset:v1`** key and validation are unchanged. No coordinates, pending loads, routes, tracking or cookies are stored.
- Reload restores a validated completed scene. Leaving during pending loading preserves the prior stable scene/preset; route reactivation discards unfinished choice. Normal route/browser Back behavior remains; scenes add no URL parameter, route or history entry.
- Global unsupported-WebGL/world-download/renderer-initialization/context-loss failures retain the existing explanatory HTML and fresh-renderer retry. A failed graph/renderer retry may recreate the renderer; successful switches retain it. Quality survives renderer retry and mobile→desktop remount within the component.
- Mobile below 768px and no-JS retain descriptive HTML/direct navigation, without bay entry or scene chunk dependency. Loading/failed/cancelled/ready messages are semantic HTML; no hover-only action, dialog/focus trap, autoplay or mandatory animation is added. Browser tests do not certify screen-reader behavior or WCAG conformance.

## Matched performance and F gates

Environment: Windows; Node 22.14.0 / npm 11.16.0; Chromium 156.0.8078.4 headless; local production builds, no throttling; **1440×900, deviceScaleFactor 2**, fresh browser context per startup sample. Before/after use the same protocol and Low default, not the historical M5-C samples. Five startup runs each; startup capture is separate from concurrent two-worker browser tests.

- Fresh baseline readiness **1327 / 807 / 760 / 703 / 664 ms**: median **760**, range **664–1327**.
- Final readiness **823 / 905 / 641 / 632 / 663 ms**: median **663**, range **632–905**. Approved target `max(1000, baseline median×1.20)` = **1000 ms**. The local median is within the gate; variation between these samples does not demonstrate a general speedup or universal startup guarantee.
- Total JavaScript ResourceTiming transfer **393,559 → 399,367 bytes**, **+5,808 bytes (5.67 KiB)**, below **12 KiB**. Includes reported transfer overhead across framework/shell/scene resources. No dependency increase.
- Both overview phases: **30 draws / 1,680 triangles / 30 geometries / one renderer texture**, four lights/one point/shadows off. Final overview has **15 attached mesh materials**, matching the accepted M5-C material reference. The initial one-time graph mount adds two demanded startup frames: idle settles at **4**, versus baseline **2**; all ten startup idle samples remain unchanged over 750 ms. No continuous loop is introduced.
- Development: **9 draws / 424 triangles / 9 renderer geometries / 9 attached mesh materials / one texture**, four lights/one point/no shadows, within all F caps. There is no imported texture asset; the texture statistic is renderer-internal accounting.

- **Low, five first/warm entries:** first-entry median **139 ms**, range **134–178 ms**; warm median **120 ms**, range **112–149 ms**. Additional lazy JS **1,280 bytes** in every sample.
- **Medium, five first/warm entries:** first-entry median **177 ms**, range **161–210 ms**; warm median **133 ms**, range **131–268 ms**. Additional lazy JS **1,280 bytes** in every sample.
- **High, five first/warm entries:** first-entry median **215 ms**, range **187–260 ms**; warm median **175 ms**, range **158–270 ms**. Additional lazy JS **1,280 bytes** in every sample.

All first-entry medians pass ≤1,500 ms and all warm medians pass ≤750 ms. Maximum additional JavaScript is **1,280 bytes (1.25 KiB)**, below **20 KiB**. Timing uses browser-scripted native button activation through completed draw/ready UI commit; it is not OS mouse-to-photon latency.

All **15** quality/preset windows (three modes × four hub poses plus one bay overview) stay idle after 500 ms settling through 2 seconds and a further 10 seconds. All **20** hub→bay→hub cycles return exact hub resource counts and stable bay counts, with no monotonic growth. The same Canvas survives successful switches. All matched/entry captures have zero page errors. All five responsive widths have no overflow. Every automated F comparison gate passes; detailed booleans and raw observations are preserved.

Bay camera diagnostics place the target at viewport center with depth 0.98394, and record conservative mesh-AABB clearance **6.43 m**. This is fixed-scene geometric evidence, not a collision-engine or physical-GPU claim.

Raw evidence: [baseline](evidence/m6a1/before/measurements.json), [final hub](evidence/m6a1/after/measurements.json), [review-bay entries/idle](evidence/m6a1/review-bay-measurements.json), [twenty resource cycles](evidence/m6a1/after/resource-cycles.json), [gate comparison](evidence/m6a1/performance-comparison.json). Startup readiness uses loader mount→draw; entry measurements use browser activation→completed draw/ready UI and separately record import-host timing. These are intentionally distinct clocks.

## Visual and responsive evidence

Review [comparison PNG](evidence/m6a1/comparison.png) or [local HTML comparison](evidence/m6a1/comparison.html). Evidence contains **63 PNGs and eight measurement JSON files**, including matched before/after hub views, all four hub presets and the review bay at Low/Medium/High, loading/failure/cancellation/context-loss, responsive widths 320/390/768/1024/1440 and mobile/no-JS editorial paths. Desktop capture viewport is 1440×900 (device scale 2 produces 2880×1800 PNGs); mobile review is 390×844 with full-page captures as appropriate.

Inspected the bay/placeholder label, blank display, warm desk/lamp against cool static background and the loading cover. The controls retain focus/selected state; Back was moved next to Reset after visual review. No shell column, scene height, type system or global navigation redesign. Focused hub views still intentionally crop unrelated objects. No pixel-parity/final-cinematic claim is made against unapproved generated boards, and no unexplained blank settled frame was observed. Loading deliberately hides the empty graph interval; exhaustive frame-by-frame GPU presentation was not measured.

Examples: [Low bay](evidence/m6a1/quality/low-development.png), [High bay](evidence/m6a1/quality/high-development.png), [loading](evidence/m6a1/after/development-loading.png), [download failure](evidence/m6a1/after/development-download-failure.png), [construction failure](evidence/m6a1/after/development-initialization-failure.png), [cancelled](evidence/m6a1/after/development-cancelled.png), [context loss](evidence/m6a1/after/development-context-lost.png), [mobile](evidence/m6a1/after/mobile-2d.png), [unsupported WebGL](evidence/m6a1/after/desktop-unsupported-webgl.png).

## Exact validation results

- `npm ci`: exit 0; **427 installed / 428 audited in 6m**. Existing five development-only high advisories, unsupported ESLint 9 and pending `unrs-resolver@1.12.2` script notice remain tracked; no forced update or blanket script approval.
- `npm run lint`: exit 0, no lint errors/warnings in the final run.
- `npm run typecheck`: exit 0, route generation plus strict TypeScript.
- `npm test`: exit 0, **65 passed in 4.1m** against the final application source, two Chromium workers: **55 retained + 10 new**.
- `npm run build`: exit 0 after the final application/test changes; all eight generated pages and existing request-rendered Projects route retained.
- `npm audit --omit=dev`: exit 0, **found 0 vulnerabilities**.
- Reduced-motion temporal synchronization focused repeat: **3 passed in 24.1s**; real browser media changes, moving-frame proof and original snap/target assertions retained.
- Documentation/Git checks verify current references, approved scope, no unintended source/asset/package changes and whitespace before commit.
- Restored local development preview smoke: HTTP200, ready Development entry and return to hub, zero page errors. Preview remains at `http://127.0.0.1:3000/` for owner review; production measurements above are separate.

The ten new checks cover lazy loading/single Canvas/graph, actual readiness, rapid/stale cancellation, Back/Reset/Escape and keyboard focus, download/watchdog/construction failures and retry, quality during loading/context-loss/resize recovery, invalid/denied session values, completed reload/route/browser Back restoration, pending-route departure, mobile/no-JS/WebGL-off HTML and twenty resource cycles/quality idle. Existing inert console/globe, camera bounds/clipping/pointer/keyboard, responsive/no-JS, publication/noindex, contact and all recovery guarantees remain.

Earlier attempts are not final passes: lint caught new hook-value mutation and an effect dependency; fixed by placing the static bay camera in the demanded-frame callback and stabilizing dependencies. The first fault injection threw only once and React recovered; persistent construction failure then correctly tested the boundary/retry. A subsequent full run passed 64/65 because the retained remote moving assertion started 1.15s after a one-second transition. Trace-backed moving-frame signaling now invokes the real browser preference change; no assertion guarantee is removed. Strict typing caught the new test binding cast; corrected before final typecheck/build. Final full suite passes 65/65. Existing Three Clock/CommonJS deprecations and environment color notices are not suppressed.

## Device/browser limitations and remaining decisions

**The owner's Intel HD Graphics 620 laptop is a qualitative compatibility reference, including their accepted High-quality M5-C feedback. Local automated measurements do not replace real-device testing.** The masked renderer is `WebKit WebGL`; physical active GPU, driver/acceleration, VRAM, power, thermal behavior and sustained frame-time/FPS were not established. Resource counts do not prove total heap/VRAM cleanup or broad GPU support. Owner review on the actual laptop remains required; no 60/30 FPS or WCAG conformance claim.

Chromium is the automated baseline. Firefox/WebKit binaries remain absent, so no cross-engine pass is claimed and no large browser download was performed. Real Safari, physical mobile and assistive-technology review remain open. The optional throttled network/device exercise in the broader plan was not substituted for these unthrottled local numbers.

Only D1–D4 and D6's F profile are approved for this slice. All other M6 decisions remain pending. Authentic identity/projects/media/services/contact/CV and final visual references are still absent/unapproved; this bay is a local technical exception, not a finished portfolio area or publication approval.

## Owner review and hard stop

Please review the technical bay framing, native navigation/focus/recovery, Low/Medium/High presentation and recorded F results, including actual Intel HD 620 behavior. Completed M6-A1 code/evidence/documentation are committed and pushed under the standing instruction. **Stop here: M6-A2, B1, every other batch and deployment/publication require new explicit authorization.**
