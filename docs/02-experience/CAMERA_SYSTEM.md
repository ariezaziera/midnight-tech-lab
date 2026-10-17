# Camera System — M3

M2's fixed overview is the accepted base. M3 camera/interaction functionality is accepted. Final framing, selection visuals and cinematic styling remain subject to later owner review.

## Stable presets

Canonical typed configuration: src/lib/scene/interaction-config.ts. Nominal meters; +Y up. Each preset uses FOV 38°, near 0.1m and far 60m.

- overview: position [8, 7, 10], target [0, 0.25, 0] — unchanged M2 composition.
- creator: position [-5, 3.5, 4.5], target [-2.6, 1.36, -0.8] — neutral Creator ID frame.
- projects: position [-5, 3.5, 7], target [-2.4, 1.81, 1.7] — project placeholder display.
- workstation: position [1, 4.5, 6.5], target [0.25, 1.95, -0.65] — desk and monitors, aimed at monitor geometry rather than the gap.

Canvas height remains 440 CSS px, DPR 1–1.5, with responsive width. Preset coordinates and focus-volume projection are tested at 1024×900 and 1440×900. Mobile below 768px remains HTML only.

## Bounds and transitions

- Position bounds: X [-6, 9], Y [3.2, 8.5], Z [4, 11]; FOV guard [35°, 45°].
- Normal travel: two exterior legs through elevated waypoint [0, 8, 9], total configured duration 1000ms, smoothstep easing per leg. The target interpolates smoothly over the full journey.
- No free movement, orbit controls, zoom or pan. Bounds clamp every generated pose; paths stay above/outside the blockout.
- A new request replaces the existing plan from the actual current pose. Repeated requests cannot queue unbounded travel. Back/Reset/Escape can interrupt movement.
- Reduced motion snaps on the next demanded frame. Changing the preference during travel also snaps to the requested destination.
- Initial scene creation/recovery restores a stable preset directly, without an arrival cinematic.
- Demand rendering invalidates while a plan is active and stops at rest. Large frame deltas are capped at 100ms to avoid an uncontrolled jump after a pause; real elapsed travel may exceed 1000ms on a slow/hidden tab.

## Recovery and restoration

Back to overview requests overview and returns focus to the last selected HTML control. Reset also clears the saved preset to overview. Escape performs Back while focus is inside the studio region; it does not hijack keys elsewhere on the page.

Only a validated stable preset ID is saved under midnight-tech-lab:stable-preset:v1 in sessionStorage, with memory fallback if storage is denied. No positions, intermediate waypoints, route state or unfinished travel are persisted. Invalid values use overview. Route-view reactivation discards pending requests and restores the stable ID. Explicit Return to studio links focus the studio heading; normal browser Back restores the prior stable view.

## Validation boundaries

Tests project configured target volumes into the viewport, inspect center-ray visibility, measure conservative camera clearance from mesh bounding boxes, sample moving poses, and cover preset pairs/interrupted paths. These are basic clipping/visibility checks for this fixed procedural scene, not a general collision engine. Other objects may intentionally leave the frame in a focused view. Future production geometry requires new path/visibility validation.

Navigation/cozy/top/module presets, island travel and intro remain deferred. M3 implements only overview, creator, projects and workstation. M4 editorial work is authorized; no new camera features are approved in M4.

## M5-A geometry compatibility

All four preset positions, targets, FOV/clipping, transition waypoint/duration and bounds remain unchanged. Refined geometry stays within the original platform/target-space constraints and is rechecked for focus projection, target hits and clearance. Selection-corner batches are excluded from diagnostic rays. The camera architecture is not rewritten. Final framing remains an owner visual-review gate.
