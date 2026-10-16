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
