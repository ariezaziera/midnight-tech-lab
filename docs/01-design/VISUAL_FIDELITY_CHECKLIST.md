# Visual Fidelity Checklist

## For each screen
- [ ] Record reference ID and source image path
- [ ] Record target viewport (desktop 1440x900, tablet 768x1024, mobile 390x844 as **test candidates**)
- [ ] Capture implementation screenshot at matching viewport
- [ ] Check content order, visual hierarchy, grid, spacing, and readability
- [ ] Check header/nav and CTA placement
- [ ] Check hover, focus, loading, error and empty states
- [ ] Verify mobile interaction without hover
- [ ] Verify no horizontal overflow and no essential content obscured
- [ ] Verify reduced motion and 2D fallback
- [ ] Log discrepancies and classify: blocker / major / minor
- [ ] Obtain human visual approval before marking design-complete

## 3D scene-specific
- [ ] Camera preset starts at intended composition
- [ ] Hotspot click and keyboard equivalent reach same content
- [ ] Return restores expected camera context
- [ ] Camera avoids geometry collisions and disorienting movement
- [ ] Creator ID uses user-provided approved portrait, not concept art placeholder
- [ ] No missing assets are misrepresented as complete
- [ ] FPS, memory, load time measured on actual target hardware

## Note
Concept-board typography and measurements are not reliable enough for pixel-level evaluation. Use human-approved crops or separate mockups for tighter fidelity.
