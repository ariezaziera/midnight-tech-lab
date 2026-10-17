# M5-C — Graphics Quality, Performance Optimization & Visual QA

Date: 2026-10-17 (Asia/Kuala_Lumpur). Base: accepted M5-B `3addbfc`. **M5-C delivered for owner review. M6 is not started; nothing is deployed.**

## 1. Summary

The existing Central Hub now has a native desktop Low/Medium/High graphics selector. It changes only pixel density on the existing renderer. Low is the conservative default; the cinematic lighting, static atmosphere, geometry, four cameras, three typed hotspots and editorial experience are preserved. No dependency or production asset was added.

Reviewed AGENTS, product/decision/design/experience/technical/delivery documents, M5-A/B reports, source, installed Next client-boundary guide, R3F DPR update implementation and all existing browser tests. Inspected fresh baseline images before application edits. Source audit is recorded in [AUDIT.md](evidence/m5c/AUDIT.md).

The baseline did not expose excessive geometry or continuous rendering. Existing shared resource cleanup was explicit; tests found no growing live resource counts. Therefore no speculative batching, camera rewrite or renderer replacement was warranted. Pixel buffer dimensions provided a measurable cost that can be reduced without altering the approved composition. This is not evidence of a proven GPU bottleneck or measured FPS improvement.

## 2. Files changed

- `src/lib/scene/quality-config.ts`: typed quality IDs, labels, DPR ranges and default.
- `src/components/studio/studio-controls.tsx`: native labeled radio group and density explanation.
- `src/components/studio/studio-preview.tsx`: component-local quality state passed through retry/responsive mounts.
- `src/components/three/world/hub-canvas.tsx`: existing Canvas DPR update and completed-demand-draw diagnostics.
- `src/lib/scene/hub-config.ts`: removed superseded DPR setting, retaining spatial/material configuration.
- `tests/quality.spec.ts`: four focused regressions. Five existing test files change evidence destinations only; their 51 checks remain intact.
- `scripts/capture-hub.mjs`: M5-C baseline/final captures, fixed device scale factor and raster dimensions. `capture-quality.mjs` and `review-quality.mjs`: repeated modes, responsive evidence and comparison generation.
- Architecture, performance, decisions, implementation plan, acceptance criteria, TASKS and CHANGELOG; this report and `evidence/m5c/`.

No package/lockfile, camera, geometry, lighting, editorial data or route change. Dependencies remain Next 16.4.2, React 19.3.1, Three 0.186.1, R3F 9.8.2 and Drei 10.7.9.

## 3. Quality policy and default rationale

- **Low:** DPR range `[1,1]`, default. Conservative resolution, especially on dense displays.
- **Medium:** `[1,1.5]`, matching the previous density range.
- **High:** `[1,2]`, opt-in bounded pixel detail. No extra effects.

The sampled M5-B renderer was stable and the owner reported acceptable older-laptop behavior, but neither establishes broad hardware safety. Low therefore remains the initial default. There is no screen-width, user-agent or device-memory performance inference. Width still determines the previously approved desktop versus mobile HTML presentation, not quality selection.

All modes retain antialiasing, alpha, low-power preference, four lights, shared materials, geometry and static CSS background. R3F updates DPR/backbuffer through its existing renderer. No renderer recreation, page reload or camera reset is needed. No expensive feature was introduced to distinguish High.

At device DPR 1, all modes intentionally resolve to 1 and look the same. At device DPR 2, density differs measurably. Labels describe density rather than claiming different lighting or geometry. Reduced motion remains a separate media preference. Quality state is not written to storage: it survives retry and responsive canvas remount within the studio component, while a fresh document starts Low. No cookies, analytics or tracking.

## 4. Renderer and lifecycle

Existing geometry/material ownership and disposal remain unchanged. The Canvas keeps its identity during switching, including an actual camera transition. Retry still replaces a failed renderer; mobile unmounts the Canvas and preserves HTML. Existing context-loss, unsupported probe, initialization exception, chunk failure and watchdog paths remain distinct.

RendererLifecycle now reports live renderer counters, DPR/backbuffer, program count and unique mesh material count after demanded draws in a canvas data attribute. The callback does not invalidate frames or update React state each frame; its pending callback/listener are cleaned up on unmount. Readiness still follows the first completed draw. No continuous loop was added.

Four repeated three-target cycles plus quality changes return to 30 overview geometries, 15 live mesh materials and one texture. Selected states have 31 geometries: one intentional selection-corner batch. This is live renderer/scene evidence, not proof of complete browser heap reclamation or physical GPU memory accounting.

## 5. Performance before/after

Environment: Windows, Node 22.14.0, npm 11.16.0, Chromium 156.0.8078.4 headless, local production builds, no network throttling. Viewport 1440×900, **deviceScaleFactor 2** for both phases, three fresh contexts each. Baseline application source was unchanged; only capture tooling was extended beforehand. Historical M5-B measurements were not substituted for the new baseline.

- Fresh M5-B readiness: **1353 / 944 / 828 ms**, median **944**, range **828–1353**.
- M5-C Low-default readiness: **807 / 776 / 861 ms**, median **807**, range **776–861**.
- JS transfer: **393,066 → 393,559 bytes**, +493 bytes (about 0.13%), including browser-reported transfer overhead across shell and scene resources. No dependency increase.
- Both phases: **30 draws, 1,680 triangles, 30 geometries, one renderer texture**, four lights/one point, shadows off, alpha on.
- All six matched startup samples: render count **2 → 2** over 750 ms; zero page errors.

Same browser/build conditions, but default density intentionally differs. Startup samples show no regression here; they do not establish a causal or general speedup. Medium/High measurements below are switches after readiness, not independent cold-start timing claims. Masked renderer is `WebKit WebGL`; physical GPU, acceleration, GPU timing, sustained FPS, power and actual owner-device performance were not measured.

Raw [before](evidence/m5c/before/measurements.json), [after](evidence/m5c/after/measurements.json) and [performance comparison](evidence/m5c/performance-comparison.json) preserve timings/resources/camera data.

## 6. Quality-mode comparison

At the same approximately 694.7×440 CSS-pixel canvas (clientWidth rounds to 695), all three repeated observations per preset/mode were deterministic:

- Low DPR 1: **694×440 = 305,360 pixels**.
- Medium DPR 1.5: **1041×660 = 687,060 pixels**.
- High DPR 2: **1389×880 = 1,222,320 pixels**.

Low reduces buffer pixels **55.6%** versus baseline/Medium and about **75.0%** versus High. High uses about four times Low's pixels, with no additional geometry/light/effect pass; it is opt-in. Integer backbuffer rounding explains ratios computed from clientWidth. Pixel counts quantify raster workload potential, not actual GPU time or total browser work; CSS atmosphere/compositing is outside Three draw counters.

Three contexts × three modes × four presets = **36 observations**. Every 750 ms idle window was stable with zero page errors. Overview remains 30 geometries; selection adds one and return removes it; materials remain 15 and texture count 1. Camera positions are identical across modes for every preset. [Raw mode results](evidence/m5c/quality/measurements.json).

## 7. Visual QA

[Comparison PNG](evidence/m5c/comparison.png) and [local HTML review](evidence/m5c/comparison.html) present all 12 matching mode/preset images. Inspected the sheet and individual Creator/workstation/mobile captures against the fresh baseline. Island silhouette, warm desk, cool background, blank displays and amber selected corners remain consistent. Differences are primarily edge density; Low is visibly softer. No visual redesign is implied.

All four targets remain visible in existing camera diagnostics, with identical poses across quality modes. Minimum sampled conservative clearance: overview 9.94m, creator 3.18m, projects 4.60m, workstation 5.01m. These are prototype bounding-box diagnostics, not physical collision certification. Existing focus views crop surrounding objects at viewport edges; this was retained rather than changing cameras. No new target occlusion, clipping, blank settled frame or background jump was observed. Exhaustive frame-by-frame transient blank detection was not performed.

Evidence includes **54 PNGs**, eight JSON files and the HTML comparison: fresh baseline/final four views, 12 quality/preset views, route/failure/reduced-motion/mobile images, five responsive captures and combined review. Examples: [Low overview](evidence/m5c/quality/low-overview.png), [Medium projects](evidence/m5c/quality/medium-projects.png), [High workstation](evidence/m5c/quality/high-workstation.png), [mobile](evidence/m5c/after/mobile-2d.png), [unsupported WebGL](evidence/m5c/after/desktop-unsupported-webgl.png).

## 8. Accessibility and resilience

Native fieldset/legend/radios expose the Graphics quality group, labels and checked state. Full labels are clickable; existing visible focus applies to inputs. Arrow-key selection, focus retention and Escape from a quality input were tested. Quality controls do not alter layout dimensions when selected or trap focus; Back/Reset and native About/Projects links remain available.

All prior skip-link, focus, no-JS editorial, reduced-motion, keyboard/pointer/touch, storage failure, navigation/restoration and fallback tests passed. Unsupported WebGL, initialization exception, download failure, 15-second watchdog and real context-loss retry remain usable. High selection survives context-loss recovery and desktop→mobile→desktop remount. Mobile has no graphics controls or scene-chunk dependency. No WCAG conformance claim is made.

## 9. Responsive and cross-browser results

Chromium: 320, 390, 768, 1024 and 1440px checks pass without overflow; all core routes also pass existing responsive checks. 320/390 use HTML only; 768 and wider retain the existing scene breakpoint. Camera visibility/clearance checks pass at 1024/1440. Mobile review evidence remains 390×844; responsive sweep uses height 900.

Firefox and WebKit executable paths were inspected: binaries are absent. Their smoke tests were **not run** and no browser downloads were performed. Chromium's renderer string containing WebKit does not constitute WebKit-browser coverage. [Browser inventory/results](evidence/m5c/cross-browser.json). Real touch hardware, older laptop GPU and other browser engines remain review limitations.

## 10. Exact validation results

- `npm ci`: exit 0; 427 packages installed, 428 audited, approximately 6 minutes. Five previously tracked high development-only advisories and pending `unrs-resolver@1.12.2` script notice remain.
- `npm run lint`: exit 0, no lint errors/warnings.
- `npm run typecheck`: exit 0, route generation and strict TypeScript passed.
- `npm test`: exit 0, **55 passed in 2.6 minutes**, two Chromium workers. All 51 prior checks retained plus four quality tests.
- `npm run build`: exit 0, optimized production build and all eight generated pages completed. An earlier attempt caught a new test's missing HTMLCanvasElement cast; corrected before the successful final build/suite.
- `npm audit --omit=dev`: exit 0, **found 0 vulnerabilities**.
- Focused quality run before full suite: **4 passed in 30.7 seconds**.
- `capture-hub ... before/after m5c`, `capture-quality.mjs`, `review-quality.mjs`: completed; matched/mode captures zero page errors, all observed idle windows stable.

Existing Three CJS/Clock deprecations, unsupported ESLint 9 warning and tracked dev dependency findings were not hidden or resolved through forced updates. No install script was blanket-approved. Browser FORCE_COLOR/NO_COLOR notices are environmental. No failed browser test was removed or weakened.

## 11. Remaining risks

Low trades edge sharpness for pixel reduction on dense displays; on standard DPR1 screens modes intentionally coincide. High is bounded but more expensive and has no broad-device guarantee. Timing variance, local caching/build conditions and software versus hardware rendering limit comparisons. Resource counters do not measure heap/GPU reclamation. Firefox/WebKit and physical-device measurements are outstanding. Authentic portfolio/identity assets, contact destination, final framing/art direction and release decisions remain open.

## 12. M6 readiness

The current prototype passes its Chromium regression and bounded-density gates and is ready for **owner review**. It is not release-approved or universally performance-certified. M6 scope and device/browser budgets require a separate explicit decision; no modules, intro, production assets, backend or deployment were started.

## 13. Owner review request

Please review the Low default and density trade-off, all four camera views and preserved cinematic direction. Confirm acceptance of M5-C before authorizing any M6 work. Completed code, documentation and evidence are committed/pushed under the standing repository-delivery instruction; this does not authorize deployment or expansion.
