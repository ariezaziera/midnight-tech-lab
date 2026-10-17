# Performance Strategy

## Initial targets (hypotheses, not measurements)
- Aim for responsive interaction on representative desktop hardware; explore 60fps desktop / 30fps mobile as initial targets, subject to measurement.
- Dynamic 3D import, adaptive quality tiers, reduced particles/shadows on mobile.
- Bake lighting where possible; compress GLB/texture assets, use LOD and instancing where appropriate.
- Pause or throttle scene rendering when hidden or covered by reading overlays when practical.
- Provide 2D fallback for low-end or unsupported devices.

## Measurement protocol
Record test device, viewport, browser, scene version, FPS distribution, GPU memory if available, load time, bundle size and failure modes. Do not claim optimized until measured.

## M2 initial observation — 2026-10-17

Windows, Node 22.14.0, Chromium 156.0.8078.4, local production server, 1440×900 viewport, no network throttling. The browser reports the masked renderer `WebKit WebGL`; physical GPU/hardware acceleration was not identified. See `docs/04-delivery/evidence/m2/initial-scene-measurements.json` for raw resource timings and counters.

One recorded run: 901ms from scene-loader mount through first completed draw; 49 draw calls, 866 triangles, 49 geometries and 1 renderer-reported texture. No external image texture was loaded; this counter is not a production texture inventory. Render count settled at 2 and remained unchanged during the observed 500ms idle interval. No sustained FPS distribution or GPU-memory measurement was collected, since this view renders on demand.

ResourceTiming recorded 387,471 transferred bytes across all JavaScript resources in the observation (framework/shell plus lazy scene, including reported transfer overhead). The large lazy chunk transferred 244,783 bytes (244,483 encoded-body bytes); this is not a production network budget. Local timing, startup invalidations and browser caching affect these numbers. No model/texture/font/network service assets are requested. Mobile's scene-chunk interception test recorded zero scene requests at 390px.

Tests impose draw-call/triangle regression guards (<120 calls, <12,000 triangles), not owner-approved performance budgets. Production device targets, quality thresholds, actual mobile GPU tests and final performance budgets remain unresolved. No 60/30 FPS or broad GPU-compatibility claim is made.

## M3 movement and rest observations — 2026-10-17

Same local Windows/Chromium environment; new initial overview sample: 867ms loader-to-draw, 49 calls/866 triangles, 390,249 transferred JavaScript bytes across shell/framework/scene. No dependency or asset changes. Raw values are in `evidence/m3/initial-scene-measurements.json` under delivery docs.

Demand rendering invalidates only while a camera plan is active. At 1024×900, three recorded transitions used 45 render frames, then remained at frame 47 during idle observation. At 1440×900 they used 44 frames, then held at 46. Browser-sampled transition durations were 1092/1006/1712ms and 1142/1014/1143ms respectively (creator/projects/workstation). The configured duration is 1000ms; local test load and the 100ms delta cap affect wall time. Reduced motion snaps with at most four extra draws per tested selection.

The camera evidence JSON files preserve moving poses, projection and conservative geometry-clearance diagnostics. No continuous idle loop, production FPS guarantee, physical-device compatibility or general collision-engine claim is implied. Existing dependency audit issues and real target-device budgets remain tracked.

## M5-A matched geometry comparison — 2026-10-17

Fresh before/after production captures use `scripts/capture-hub.mjs`, three new Chromium contexts per phase, 1440×900, unchanged lighting/camera/DPR, no throttling. Baseline readiness 951/868/669ms (median 868ms); final 795/718/825ms (median 795ms). Draw calls and renderer geometries each decrease 49→30; triangles increase 866→1680; textures remain 1; all-JS transfer increases 390239→392831 bytes (+2592). Every idle sample stays at frame 2 across 750ms. The extra triangles are an explicit trade-off for construction/silhouette, offset by static material batching; no general speedup, FPS or physical-GPU claim is inferred. Owner laptop review remains required before later effects work.

Raw evidence is under `docs/04-delivery/evidence/m5a/{before,after}/measurements.json`. Full-suite measurements are separate and affected by concurrent tests. The 35-draw/geometry and 3000-triangle assertions are regression guards, not approved production device budgets. No texture request, continuous idle animation, extra light/shadow or new dependency was added.

## M5-B matched atmosphere comparison — 2026-10-17

Fresh M5-A baseline and final M5-B use the same capture protocol, production-browser environment, 1440×900 viewport, retained geometry/cameras/DPR and three fresh contexts per phase. Readiness samples: 1436/789/1103ms → 1672/1003/837ms, medians 1103 → 1003ms; startup variance prevents general speed claims. Draws/triangles/geometries/textures remain 30/1680/30/1. JS transfer 392831 → 393066 bytes (+235); first-sample CSS 4773 → 5120 (+347). All idle samples stay at frame 2 across 750ms; all matched contexts have zero page errors.

Four lights remain (one hemisphere, two directional, one desk point), with shadows off and no extra geometry/effect pass. Canvas alpha now composes over static CSS gradients/stars. This browser CSS/compositing work is outside WebGL counters and is not a measured zero-cost effect. Real older-laptop performance remains an owner review gate. Raw data: `docs/04-delivery/evidence/m5b/{before,after}/measurements.json`. M5-C quality UI/broader optimization is not implemented.

## M5-C measured quality policy — 2026-10-17

Fresh accepted M5-B baseline and M5-C use Windows/Chromium 156.0.8078.4 production builds, 1440×900, deviceScaleFactor 2, three fresh contexts per phase, no throttling. Baseline source was unchanged. Readiness 1353/944/828ms (median 944, range 828–1353) versus Low-default 807/776/861ms (median 807, range 776–861). This is no startup regression in the sampled conditions, not proof of a general speedup. JS transfer 393066→393559 bytes (+493, about 0.13%); no dependency changes. Both phases: 30 draws, 1680 triangles, 30 geometries, one texture, frame 2 unchanged over 750ms and zero page errors.

DPR-only policy: Low cap1 (default), Medium cap1.5 (old upper bound), High cap2. At the measured fractional CSS canvas width (~694.7px), buffers are 694×440 / 1041×660 / 1389×880, or 305360 / 687060 / 1222320 pixels. Low is 55.6% fewer pixels than baseline/Medium and ~75.0% fewer than High. Integer rounding explains width ratios using clientWidth695. DPR getter reports exact 1/1.5/2. On device DPR1 all modes intentionally resolve to1; no artificial effect distinguishes them.

Three contexts × three modes × four presets = 36 stable samples, all idle for750ms with zero page errors. Overview geometry30, selected geometry31 (one selection batch), returning overview30; 15 live mesh materials and one texture remain stable. Four-cycle regression tests found no growing live resources. Physical GPU memory/browser heap reclamation and GPU execution cost remain unmeasured. High has no extra lights, geometry, effects, shaders or assets, but its pixels cost more and it is opt-in. No proven geometry bottleneck justified further batching or lifecycle rewrite.

Evidence: delivery/evidence/m5c/performance-comparison.json and raw before/after/quality measurements. Responsive 320/390/768/1024/1440 passed without overflow; mobile keeps HTML only. Firefox/WebKit binaries absent, so no coverage claim. Owner older-laptop feedback is qualitative only. No FPS, GPU compatibility, power or WCAG conformance claim. M6 remains gated.

## M6 planning reference — targets not yet approved

Owner accepted M5-C and reports smooth High-quality operation on Intel HD Graphics 620. This is qualitative feedback, not an instrumented device benchmark. No fresh runtime measurements were made for planning; M5-C saved measurements remain the reference.

Proposed per-batch F/Z/I/R caps, median/range protocol, resource-cycle and idle gates are in [M6 batch plan](../04-delivery/M6_BATCH_PLAN.md). They require explicit owner approval and do not supersede accepted limits automatically. The [planning report](../04-delivery/M6_PLANNING_REPORT.md) defines future Intel HD 620/browser tests and distinguishes measured pixel/resource counts from FPS/VRAM claims. Demand rendering, bounded DPR, explicit cleanup, lazy WebGL, HTML fallback and reduced motion remain unchanged.
