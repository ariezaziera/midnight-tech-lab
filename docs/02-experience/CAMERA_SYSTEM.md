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

## M2 measured overview — pending owner review

M2 implements only a fixed perspective view in `src/lib/scene/hub-config.ts`:

- Position: `[8, 7, 10]` nominal meters.
- Target: `[0, 0.25, 0]`.
- Vertical FOV: `38°`.
- Near / far: `0.1m / 60m`.
- +Y up; platform centered at origin. Canvas height 440 CSS px; width follows its responsive container.

Desktop 1440×900 evidence frames the full platform/rock underside and all required zones without visible camera clipping. The camera has no controls, travel, preset switching, reset or saved state. Reduced motion uses the same static view. The specification above describes future M3 behavior, not completed M2 behavior. Owner composition/camera review remains open.
