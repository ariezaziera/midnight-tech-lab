# Camera System — Prototype Specification

## Presets
- `overview`: readable three-quarter view of full Central Hub.
- `workstation`: monitors and project hotspot framed clearly.
- `navigation`: console framed, no objects occluding labels.
- `cozy`: personal corner (later).
- `top`: optional layout map (later).
- `transition`: intermediate waypoint only, not a landing destination.

## Behavior
- Camera travels along bounded, collision-aware curves between tested presets.
- Save last stable preset before opening full HTML content; return action restores it where session state exists, otherwise overview.
- Limit orbit/pan/zoom to prevent clipping and disorientation.
- Disable controls during scripted travel; re-enable at stable destination.
- Reduced-motion: snap or near-instant move; no mandatory intro.

## Coordinates
**Not finalized.** Define scene coordinate convention (+Y up, meters as nominal Blender units), then determine actual camera `position`, `target`, `fov`, and near/far clipping in the blockout. Store them in typed config rather than scattering magic numbers.

## Tests
No geometry clipping, target stays visible, all actions have exit path, motion can be skipped, overlay focus is stable.
