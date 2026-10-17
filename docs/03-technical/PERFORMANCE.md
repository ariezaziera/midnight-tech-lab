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
