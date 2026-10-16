# M3 — Camera & Interactions

Date: 2026-10-17 (Asia/Kuala_Lumpur). Base: accepted M2 commit `29bc79e`. **Implementation and validation complete; owner review pending. M4 has not started.**

## Delivered behavior

The existing procedural hub now has exactly three selectable targets. Creator ID focuses its neutral display and highlights a normal `/about` link. Project Display focuses its placeholder and highlights `/projects`; no featured case study or project content was invented. Workstation focuses the desk/monitors and offers return to overview.

Selection works through actual mesh pointer hits and semantic HTML focus buttons. Selected geometry has an amber bounds outline; the HTML control has pressed state, a border and explicit Selected text. A non-modal section explains the current target, with About/Projects links available even during movement, loading or WebGL failure. Mobile retains the content-first 2D view and direct HTML actions.

Navigation Console, Holographic Globe, platform and future modules are inert. No production asset, new module, contact endpoint, intro, free-flight/orbit feature or new dependency was added. The M2 scene proportions, lighting and editorial layout are retained; changes to visual treatment are limited to selection/control affordances.

## Camera presets and transitions

Canonical source: `src/lib/scene/interaction-config.ts`, nominal meters, +Y up. All four presets use vertical FOV **38°**, near **0.1m**, far **60m**.

- **overview:** position `[8, 7, 10]`, target `[0, 0.25, 0]` (accepted M2 framing).
- **creator:** position `[-5, 3.5, 4.5]`, target `[-2.6, 1.36, -0.8]`.
- **projects:** position `[-5, 3.5, 7]`, target `[-2.4, 1.81, 1.7]`.
- **workstation:** position `[1, 4.5, 6.5]`, target `[0.25, 1.95, -0.65]`.

Normal movement takes a configured **1000ms**, using two smoothstep-eased exterior legs via **`[0, 8, 9]`**. Position is clamped to X **[-6, 9]**, Y **[3.2, 8.5]**, Z **[4, 11]**, with FOV guard **[35°, 45°]**. Targets interpolate across the entire journey. The waypoint keeps the camera above/outside current blockout geometry; no physics engine is needed for these fixed routes.

Every new request replaces the previous plan from the actual current pose. There is no accumulated travel queue. Back, Reset and Escape can interrupt a plan. Reduced motion snaps on the next demanded frame, including preference changes during travel. Initial restoration/recovery snaps to the stable preset, avoiding an arrival cinematic. Frame delta is capped at 100ms, so slow or background execution can take longer than the configured one second.

Tests cover all configured preset pairs and interrupted exterior paths; actual browser measurements sample moving poses and inspect final projection/clearance at **1024×900** and **1440×900**. All configured target-volume corners are inside the viewport/frustum at focus, and center rays reach the selected target geometry. Minimum recorded mesh-AABB camera clearances for creator/projects/workstation are approximately **3.416m / 4.418m / 5.009m**. These are basic conservative checks for this blockout, not a universal collision solution. Other objects may intentionally leave the focused frame.

## IDs, route mapping and state

- Typed IDs: `creator`, `projects`, `workstation`; stable preset IDs additionally include `overview`.
- Groups carry explicit typed metadata. A root hit handler resolves metadata from the nearest hit/ancestor, stops farther intersections and ignores inert objects. Raw mesh names never drive behavior.
- React state owns the latest requested preset plus request sequence. The rig stores only current pose and one active plan in refs.
- `studio-session.ts` saves only a validated stable preset ID under `midnight-tech-lab:stable-preset:v1`. Invalid stored values default to overview; denied storage uses memory fallback. No camera coordinates, unfinished travel, content or route state is persisted.
- A completed plan updates the stable ID. Reset explicitly clears restoration to overview. Leaving during travel keeps the previous completed ID. Route-view reactivation drops pending requests; the rig resets its initial-placement behavior.
- HTML pages expose Return to studio as an ordinary link. It restores the stable view and focuses the studio heading. Browser Back preserves its usual route semantics; focus selections do not create history entries.

## Accessibility and fallback

HTML focus controls are native buttons with Enter/Space activation, at least 44px height, `aria-pressed` and visible focus/selection. Keyboard activation retains its initiator; mesh selection focuses the equivalent HTML button without scrolling. Back to overview and Reset return focus to the last target control. Escape performs Back only when focus is inside the studio region, avoiding an application-wide key trap.

The selection panel is a named non-modal section, with a polite announcement on selection changes rather than every frame. No dialog/focus trap/scroll lock was introduced. Normal About/Projects links stay available without completing camera travel. Reduced motion removes the travel requirement.

Below 768 CSS px, no canvas or scene chunk is loaded. The descriptive HTML view, page links and a same-page workstation-overview anchor remain available with touch and JavaScript disabled. The camera buttons are omitted there. All six original route patterns, not-found behavior and Contact restrictions are preserved.

The M2 WebGL probe, initialization exception boundary, chunk rejection handling, 15-second first-draw watchdog, context-loss listener and fresh-renderer retry remain. M3 additionally tests HTML target actions without WebGL and recovery while Project Display is selected. A fresh renderer restores that selection; no critical content depends on WebGL. No accessibility conformance claim is made from browser smoke tests.

## Dependencies and performance observations

No package or lockfile change was needed. Existing pins remain Next.js **16.4.2**, React/React DOM **19.3.1**, Three.js **0.186.1**, R3F **9.8.2**, Drei **10.7.9**, TypeScript **5.9.3** and Playwright **1.64.1**. No GSAP, physics, controls or other animation package was added. The custom controller uses the existing R3F frame/invalidation API; see official [R3F events](https://r3f.docs.pmnd.rs/api/events) and [demand rendering guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

Demand rendering is preserved at rest. Camera travel explicitly invalidates subsequent frames until completion; stationary scenes do not maintain an animation loop. Prototype diagnostic attributes expose camera poses, projected volumes, clearance and render counters for verification. They are not alternate navigation controls or test-only feature switches.

Recorded environment: Windows, Node **22.14.0**, npm **11.16.0**, Chromium **156.0.8078.4**, two test workers, local production server, no network throttling. Physical GPU/hardware acceleration was not identified; masked renderer is **WebKit WebGL**.

Final initial overview sample: **867ms** from loader mount to completed draw; **49 draw calls**, **866 triangles**, **49 geometries**, **1 renderer-reported texture** and two frames after settling. No external image texture or model was requested. All JavaScript resource transfers in that sample total **390,249 bytes**, including shell/framework and scene with browser transfer accounting.

Three successive focus transitions at 1024px used **45 observed render frames**, then held steady at frame **47** across the idle check. At 1440px they used **44 frames**, then held steady at **46**. Sampled durations at 1024px were **1092ms / 1006ms / 1712ms** for creator/projects/workstation; at 1440px **1142ms / 1014ms / 1143ms**. The sample is affected by local test load and delta capping. Reduced-motion tests require no more than four extra draws per selection and verify preference changes interrupt movement. These observations are not a sustained FPS benchmark, production budget or GPU-compatibility claim.

Raw evidence: [initial loading/render sample](evidence/m3/initial-scene-measurements.json), [1024px camera samples](evidence/m3/camera-measurements-1024.json), [1440px camera samples](evidence/m3/camera-measurements-1440.json).

## Exact validation outcomes

- **`npm ci`: PASS, exit 0.** 427 packages installed / 428 audited. The workspace dev server was stopped first to avoid Windows native-file locks.
- **`npm run lint`: PASS, exit 0.** Zero warnings.
- **`npm run typecheck`: PASS, exit 0.** Route generation and strict TypeScript checking.
- **`npm run build`: PASS, exit 0.** All existing routes and placeholder detail generated successfully.
- **`npm test`: PASS, exit 0.** **40 passed in 1.8m**: 17 M1 checks, eight retained/adapted M2 checks, 15 M3 checks.
- **`npm audit --omit=dev`: PASS, exit 0.** Zero production vulnerabilities. Required clean installation still reports the existing five high development-only lint-chain findings and ESLint 9 support limitation; they remain tracked. No forced dependency changes or blanket script approval was applied.
- **Development preview smoke check: PASS, exit 0.** HTTP 200, Creator ID selection and Escape to overview. Preview restored at `http://127.0.0.1:3000` for review.
- **Restored-view watchdog check: PASS, exit 0.** After selecting Creator ID, navigating to About and returning, the development view remained ready beyond a further 16-second observation interval.

M3 coverage includes actual pointer hits for all three targets; Enter/Space and visible focus; Back/Reset/Escape; rapid replacement and cancellation during travel; reduced-motion snapping/preference changes; normal link and browser-Back restoration; corrupt/denied storage; inert console/globe; HTML links without WebGL or JavaScript; selected-state renderer recovery; sampled movement bounds and final target visibility/clearance. M1/M2 direct routes, mobile overflow, HTML navigation, not-found, loading/network errors, WebGL initialization/context loss and recovery remain covered.

Earlier results were used to correct implementation or timing checks, not reported as passes: the first full run passed 29/37, primarily failing workstation center-ray checks because its target pointed between monitors; the aim was adjusted. A loading test was scoped to distinguish its status from the new selection status. Timing-sensitive tests were corrected after traces showed normal click actionability waits could consume the whole transition before an intended interruption. Those temporal tests now observe an actual moving frame and dispatch the following action within the browser; separate pointer/keyboard tests retain real input. Route-view cleanup/restoration was hardened for interrupted requests. Focused checks then passed before the final full suite.

Screenshot-only test paths were subsequently made unique to avoid Project Display overwriting the Projects route image. The four affected screenshot/journey checks were rerun: **4 passed in 22.6s, exit 0**, regenerating separate evidence. An initial regeneration attempt correctly refused to start while the restored preview occupied port 3000; the preview was stopped briefly for the production capture run and restored afterward. No application behavior changed after the passing full suite.

## Visual evidence

Current evidence contains **25 PNGs and three measurement JSON files** under `docs/04-delivery/evidence/m3/`, preserving historical M1/M2 captures:

- [Overview](evidence/m3/desktop-rendered.png).
- [Creator ID selected](evidence/m3/desktop-selected-creator.png).
- [Project Display selected](evidence/m3/desktop-selected-projects.png).
- [Workstation selected](evidence/m3/desktop-selected-workstation.png).
- [Reduced-motion selection](evidence/m3/desktop-reduced-motion-selected.png).
- [Selected-state context loss](evidence/m3/desktop-selected-context-loss.png).
- [Mobile HTML view](evidence/m3/mobile-2d.png).
- [Unsupported WebGL](evidence/m3/desktop-unsupported-webgl.png), [initialization failure](evidence/m3/desktop-initialization-failure.png), [download failure](evidence/m3/desktop-download-failure.png), [loading](evidence/m3/desktop-loading.png).

Desktop captures use 1440×900, including scrolled views that show the scene and complete control panel together. Mobile uses the 390×844 viewport with full-page images where useful. All six route shells are also captured. Selected views were visually inspected: the target is recognizable, the amber outline matches selection, controls/actions remain readable, and no camera passes through geometry. Focused views intentionally crop unrelated objects. Final art/reference crops remain unapproved; there is no pixel-parity claim.

## Changed files and remaining gates

New implementation files: `src/lib/scene/interaction-config.ts`, `studio-session.ts`, `src/components/three/camera/camera-rig.tsx`, and `src/components/studio/studio-controls.tsx`.

Updated: `studio-preview.tsx`, `hub-canvas.tsx`, CentralHub/DisplayZones, `hub-config.ts` (camera data moved to canonical interaction config), global navigation, focus-control CSS, foundation/scene tests. Added `tests/interactions.spec.ts` and M3 evidence/report. Updated DECISIONS, camera/interaction/app-flow/accessibility specs, architecture, scene graph, performance, implementation plan, acceptance criteria, TASKS, CHANGELOG and README. Original procedural production-asset gaps remain unresolved.

Development output can also show Three.js's Clock deprecation from the pinned R3F implementation (`events-e51d7528.esm.js` instantiates `THREE.Clock`). The application does not instantiate it directly. This upstream maintenance item is tracked without suppressing warnings or changing the accepted dependency pins.

Owner review of M3 framing, transition feel and interaction behavior is pending. Physical mobile hardware, Safari/Firefox, screen readers, actual GPU memory/FPS distributions and final production assets were not validated. Basic fixed-scene path checks must be revisited when geometry changes. Final visual/content, service offerings, contact destination, expansion and release decisions remain open. **No publication or M4 implementation was performed. Stop here pending explicit owner authorization.**
