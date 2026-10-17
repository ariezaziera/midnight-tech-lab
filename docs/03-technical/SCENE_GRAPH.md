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

## M5-A procedural hierarchy

The camera rig and typed hotspot configuration remain unchanged. Procedural components replace the original block silhouettes with:

- Platform: retained 12-sided, 4m-radius top and narrow perimeter structure; one deterministic vertex-colored rock mesh with seven shrinking strata and a closed tapered base. Six restrained perimeter accents share one batch.
- Workstation target: chamfered warm desk, slim underframe/supports, dual blank monitors and stands, desk mat, abstract keyboard rows/mouse, shaped chair with arms/headrest/five spokes, constructed lamp retaining its original point-light output/position.
- Creator target: pedestal, structural side rails, layered frame and abstract empty plate/marks. No portrait/biography is depicted.
- Projects target: stepped plinth, inset spine and blank framed display. No project art or title is depicted.
- Inert console/globe: minor edge/base construction; globe remains a simple wireframe icosahedron.

`HubResources` shares small geometry templates and a material palette per mounted hub. `StaticParts` transforms and merges static primitives by surface **within** each logical group. This reduces draw calls without merging targets together. Merged mesh hits still resolve ancestor `hotspotId`, never mesh names. Static geometry and shared materials are disposed on unmount/recovery.

The full amber wireframe volume is replaced by small amber frame-corner marks anchored to each selected display (both workstation monitors). These batches skip diagnostic rays and pointer raycasting, and do not obstruct target geometry. HTML selection/focus controls are unchanged. No continuous animation or new camera feature is introduced.

## M5-B lighting/material layer

M5-A procedural geometry, dimensions, frame-corner selection and hotspot ancestry remain unchanged. World ambient is replaced by a hemisphere fill; the two directional lights and one local desk point light are retuned through `look-config.ts`. No extra light or star geometry is added. CSS atmosphere sits behind a transparent desktop canvas, outside the Three.js scene graph. Selection marks remain non-raycast decoration; console/globe remain inert.

## M6-A1 graph lifecycle

The only Canvas contains common PerspectiveCamera, hemisphere/key/rim lights, SceneHost and RendererLifecycle. SceneHost owns exactly one ready graph: the accepted CentralHub plus its existing CameraRig, or DevelopmentTechnicalReviewBay plus its fixed camera placement and one local point light. Loading/failure temporarily has no graph and a readable HTML cover; no two graphs coexist. The bay reuses per-mount shared primitive/material templates and merged batches; unmount disposes them. The console/globe and three hub targets remain unchanged. No other room, exhibit camera or spatial travel system is present.
