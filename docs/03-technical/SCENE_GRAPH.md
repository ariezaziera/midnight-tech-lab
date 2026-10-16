# Scene Graph — Central Hub

```text
World
├── Environment (nebula backdrop, stars, ambient)
├── Lighting (baked lighting + selective practical emissives)
├── CentralHub
│   ├── Platform (rock underside, top, stairs)
│   ├── Workstation (desk, chair, monitors, peripherals)
│   ├── CreatorID (display surface + accessible HTML action)
│   ├── ProjectDisplay (screen + accessible HTML action)
│   ├── NavigationConsole (interactive later)
│   ├── HolographicGlobe (interactive later)
│   └── CozyCorner (personal props; later)
├── SatelliteIslands (future)
└── CameraRig
```

## Units and naming
Nominal meters, +Y up. Suggested GLB node prefixes `CH_`, `DL_`, `DS_`, `ML_`, `ST_`, `PC_`. Do not hard-code click behavior by raw mesh names; use explicit metadata and IDs.

## Prototype scale (unvalidated)
Central platform approx. 8m across, top level approx. 2.5m above rock underside reference. Treat these as blockout estimates, not production engineering dimensions.

## Implemented M2 hierarchy — procedural placeholders

```text
Canvas (desktop only; demand rendering)
├── Dark color background
├── Fixed PerspectiveCamera
├── Ambient + two directional lights
├── CentralHub
│   ├── CH_001_Platform (12-sided top, violet rim, inverted low-poly cone, seven rock facets)
│   ├── CH_002_Workstation (desk, supports, two monitors, keyboard and mouse blocks)
│   │   ├── CH_003_Chair (seat, back, stem and base)
│   │   └── CH_008_Lamp (basic stem/shade and restrained amber point light)
│   ├── CH_005_CreatorID (neutral framed display, no face)
│   ├── CH_004_ProjectDisplay (separate pedestal/monitor, no project art)
│   ├── CH_006_NavigationConsole (simple cyan console)
│   └── CH_007_Globe (wireframe icosahedron on base)
└── RendererLifecycle (readiness counters/context-loss listener; no animation)
```

Platform radius 4m; upper slab centered at Y=0, depth 0.32m, walkable top Y=0.16m. Desk size 3.4×0.16×1.45m. Props use local coordinates above the upper surface. No stairs, cozy area, satellites, mascot, hotspots or camera controls were implemented. Names identify geometry only, with no click behavior. Geometry is original procedural blockout, not supplied production assets. Configuration values are prototype measurements awaiting owner review.

## M3 additions

The M2 geometry is preserved. Workstation, Creator ID and Project Display groups carry explicit typed `hotspotId` metadata. A root selection handler resolves that metadata from the nearest hit without using mesh names; the platform, console and globe remain inert. A selected target receives a non-raycast amber bounds outline. CameraRig controls the four approved poses without free orbit or additional geometry. Loading/failed renderers retain HTML target explanations and links outside the canvas.
