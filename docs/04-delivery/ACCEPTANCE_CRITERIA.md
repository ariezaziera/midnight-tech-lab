# Acceptance Criteria

## Global
- No critical content is locked behind WebGL.
- No fabricated biography, results, social links or portfolio images.
- Keyboard access and visible focus across all HTML controls.
- Reduced-motion preference honored; no unavoidable cinematic intro.
- All required routes have appropriate loading/error/empty states.
- Build, lint, typecheck and relevant tests pass.

## Central Hub MVP
- Scene displays placeholder floating platform, workstation and creator display.
- Overview and workstation focus presets operate without camera clipping.
- Creator ID opens About; featured project display opens preview/case study.
- Back/reset always returns to a stable viewpoint.
- Equivalent HTML controls available for hotspot actions.
- WebGL failure produces usable 2D navigation.

### M3 owner-approved interpretation

- Four tested presets: overview, creator, projects and workstation; all travel is bounded and cancellable, with reduced-motion snapping.
- Creator ID focus provides a normal `/about` link. Project Display focus provides `/projects`; a featured case-study action is not approved or implemented.
- Three explicit typed targets only; console/globe and future modules stay inert.
- Back to overview, Reset, scoped Escape and route restoration work through HTML controls. Direct content access never waits for travel.
- Mobile remains the existing content-first 2D experience. Production asset/visual approval and M4 content work are separate gates.

## Projects
- Filters function with actual project tags; case-study links resolve.
- Media includes alt text; missing content is visibly draft/placeholder, not invented.

## Contact
- Never display successful form submission unless server confirms delivery.
- Use verified direct contact option if secure form is not implemented.

## Visual QA
- Compare desktop 1440x900 and mobile 390x844 against approved per-screen reference images once provided.
- Log deviations rather than silently declaring pixel-perfect equivalence.

## M4 editorial checks

- Only explicitly approved content can enter published listings and detail routes; the reserved local template is unmistakably labeled.
- Filters reflect actual published tags, expose current state and work without JavaScript; empty results have a clear recovery action.
- About/Services lead to Contact; core journeys do not depend on the scene.
- Retain noindex/nofollow, 404 restrictions, direct-link-only Contact and the complete M3 regression suite.

## M5-A geometry and cost gate

- Retain 8m top footprint and the accepted four preset coordinates/targets/FOV/clipping, three hit targets and HTML equivalents.
- Layered rock mesh is deterministic, finite, outward facing and within the retained footprint; camera views keep targets visible and basic clearance checks pass.
- Small integrated selected-frame accents replace debug volume lines without affecting hit tests.
- Compare new same-condition before/after readiness, draws, triangles, geometries, textures, JS transfer and idle behavior; optimize or revert responsible changes if costs materially regress.
- Added 35-draw/geometry and 3,000-triangle test caps are implementation regression guards, not owner-approved production hardware budgets or FPS claims.

## M5-B lighting/atmosphere checks

- Fixed four-light budget with one local point light, no shadow maps or extra render loop.
- Background is static and decorative; it cannot intercept scene input or cover essential HTML controls.
- Geometry counts, camera coordinates/hotspots and all M1–M5-A checks remain protected.
- Fresh repeated before/after measurements include readiness, geometry/draw/texture counts, transfer, idle frames and page errors. CSS compositing cost is not represented by WebGL counters and needs real-device review.
- Keep mobile HTML, reduced motion, all failure/retry states, noindex and direct-link-only Contact. No M5-C UI or unapproved content.

## M5-C regression gates

- Native keyboard-accessible Low/Medium/High, Low default; device DPR capped at 1/1.5/2 with no forced upscaling above device DPR 1.
- No canvas recreation, camera reset or reduced-motion coupling on quality selection, including during travel.
- Low measurably reduces high-density buffer pixels; High remains bounded, with no new effect/asset/geometry/light cost.
- Demand rest in all modes; repeated selections return resource counts to baseline; recovery and responsive remount retain chosen quality.
- All prior checks retained; fresh matched production evidence, responsive 320/390/768/1024/1440 and honest browser/device limitations. Owner review required before M6.

## M6-A1 acceptance results

- One existing Canvas and one ready graph, with zero-graph loading/failure interval covered by HTML; Development imports only on explicit/validated entry. Late/stale imports and errors cannot replace a newer request or stable state.
- Native Enter/Back/Reset/scoped Escape, focus restoration, ordinary links, separate validated scene-session and all accepted hub/restoration/recovery/mobile/no-JS rules work. Existing hub preset key, geometry/light/camera source and split-screen/440px shell are unchanged; console/globe inert.
- F gates verified: exact hub overview counts; bay 9 calls/424 triangles/9 geometries/9 attached mesh materials/one texture with four lights/one point/no shadows; JS/readiness/entry/idle/twenty-cycle targets pass. No imported assets or new packages.
- Final complete suite 65 passes, preserving55 guarantees plus10 checks. Report/evidence delivered for owner review; local results are not real-device/FPS/VRAM or accessibility certification. No M6-A2/B1 or deployment authorization follows.
