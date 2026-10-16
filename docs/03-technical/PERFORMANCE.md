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
