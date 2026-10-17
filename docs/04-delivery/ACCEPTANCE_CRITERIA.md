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
