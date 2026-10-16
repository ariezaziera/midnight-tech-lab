# Performance Strategy

## Initial targets (hypotheses, not measurements)
- Aim for responsive interaction on representative desktop hardware; explore 60fps desktop / 30fps mobile as initial targets, subject to measurement.
- Dynamic 3D import, adaptive quality tiers, reduced particles/shadows on mobile.
- Bake lighting where possible; compress GLB/texture assets, use LOD and instancing where appropriate.
- Pause or throttle scene rendering when hidden or covered by reading overlays when practical.
- Provide 2D fallback for low-end or unsupported devices.

## Measurement protocol
Record test device, viewport, browser, scene version, FPS distribution, GPU memory if available, load time, bundle size and failure modes. Do not claim optimized until measured.
