# M6-A2 — Text-first Savvyra Development exhibit

Status: implemented and validated; submitted for owner review, not accepted automatically. Owner explicitly approved Specification v1.0 and implementation/validation/commit/push only. No deployment or other milestone is included.

## Recovered checkpoint and base

Accepted A1/B3 base: local and remote main `6e010a942923ab55a4111e361cabdcc8e6646041`. Resume on 2026-10-20 inspected Git, generated imports, scripts, complete evidence and actual processes before any further writes. Application source was unchanged. Only expected capture tooling/evidence and production-build next-env imports were present. No matching capture/server process remained.

The original baseline completed before interruption: five startup samples and fifteen first/warm Development pairs (five per quality), three extended idle observations, twelve PNGs and two measurement JSON files. Preserved all files; no duplicate baseline run or overwrite. [Checkpoint hashes](evidence/m6a2/baseline-checkpoint.json) identify the retained files.

Startup samples 1341/960/1590/897/831 ms: median **960**, range **831–1590**; initial JS **399367 bytes**. Approved matched threshold max(1000,960×1.2)=**1152 ms**. Original F initial-Home cap remains **405847 bytes** (393559+12 KiB), not another 12 KiB allowance above A1. Hub 30 calls/1680 triangles/30 geometries, idle stopped. Baseline Development 9 calls/424 triangles/9 geometries/9 attached mesh materials/one renderer texture, four lights/one point/shadows off.

Baseline first/warm medians: Low **222/167 ms** (ranges170–248/114–197), Medium **229/167** (171–363/146–201), High **206/162** (180–297/149–196). No captured page errors or responsive overflow; successful switches retained Canvas identity.

## Architecture and content safety

Home remains a Server Component. `zone-content.ts` selects only the approved/routable Savvyra Development record with required role, overview, contribution and approach. It returns six presentation fields: ID/title/summary/contribution/first approach subsection/local href. No record array, draft text, approval source, media, links or outcomes is passed to the client/scene. Published text remains in `editorial.ts`; no duplicated independently maintained Savvyra narrative. The HTML case study remains authoritative.

Missing/draft/placeholder/unapproved/non-Development/incomplete records produce null, the original technical review label and no authentic exhibit action. The fallback is verified through selector rejection and server-rendered component checks; no test-only runtime content override was introduced. Static local content still requires a new build when approval changes, consistent with existing publication architecture.

One lazy Canvas, one graph, original scene IDs, request-scoped loading/cancellation/watchdog and resource ownership remain. No new route, query/history entry, store, dependency or global scene engine. The same blank procedural monitor gets an original cyan marker when eligible, with amber selection corners. It is explicitly described as procedural, not a Savvyra screenshot, logo or interface reconstruction. Existing palette/geometry helpers own cleanup per mount; inactive graphs are unmounted.

## Camera and navigation

Overview preserved: [5.6,4.6,6.8]→[0,1,0]. Focus: [2.7,2.6,4.2]→[0,1.95,-0.17]. FOV38°, near/far0.1/40; convex position envelope min[2.7,2.6,4.2], max[5.6,4.6,6.8]. A 600ms smoothstep interpolation remains outside the bench, replans from the current pose on replacement, and invalidates only while moving. Reduced motion/initial recovery snaps; preference changes interrupt an actual moving plan. Diagnostics expose projection/corners/pick/bounds and conservative mesh-AABB clearance, not a collision engine.

Native Enter Development Lab and Focus Savvyra controls accompany explicit Development overview and Back to Central Hub actions. Marker selection uses typed exhibitId metadata, not mesh names. Visible aria-pressed/text plus amber corners represent selection. A native About Savvyra disclosure contains approved summary/contribution/first approach and opens only on explicit user request, independently of camera focus. It is keyboard-operable without JavaScript. The ordinary Read Savvyra case study link stays outside the disclosure, always available in the Hub, mobile, no-JS and renderer-failure paths; no camera is mandatory for content access.

Scoped Escape: focus→Development overview→Hub. Reset still means Hub overview and clears stable scene as before. Only scene ID and original Hub preset are persisted; exhibit focus is transient, discarded on entry and ordinary route reactivation. Browser Back returns to the stable Development scene at overview; renderer recovery may snap to the current requested focus. No pending camera coordinates or new session key. Focus returns to the focus control on overview and to Enter on Hub return; delayed focus is guarded against a removed/hidden control.

Hub geometry, material/light configuration, camera coordinates/controller, three hotspot IDs/routes, inert console/globe, split-screen shell, 440px viewport, DPR modes/Low default and prototype noindex remain protected. No Design/Media/Services/Personal, imagery/models/fonts, shaders, particles, shadows, backend, CMS or external Savvyra link.

## Exact source and validation file inventory

New: `src/lib/scene/zone-content.ts`, `src/lib/scene/development-config.ts`, `tests/development-exhibit.spec.ts`, `scripts/capture-development.mjs`, `scripts/summarize-m6a2.mjs` and this report/evidence.

Changed application files: `src/app/page.tsx` only adds the server-selected prop; `studio-preview.tsx`, `studio-directory.tsx`, `studio-controls.tsx` under src/components/studio; `hub-canvas.tsx`, `scene-host.tsx` under three/world; `three/zones/development-scene.tsx`. Existing Hub sources/rig/config and editorial record/schema/validator/renderer are unchanged.

Changed validation: `scripts/capture-hub.mjs` adds M6-A2 capture destination/protocol; `tests/studio-zones.spec.ts` updates explicitly changed eligible labels and extends twenty cycles through focused state without weakening prior bounds; atmosphere/editorial/foundation/interactions/scene specs update evidence paths only. Documentation changes are recorded in the [exact changed-file inventory](evidence/m6a2/changed-files.txt), including retained baseline/iteration and final evidence paths. Scope/path/hash checks are recorded in [delivery validation](evidence/m6a2/validation.json).

## Validation and measurements

All required runtime commands passed against the final application revision. Node22.14.0/npm11.16.0; Windows local production build. The final complete suite used one worker to reduce concurrent browser contention; performance captures run separately with the original baseline protocol:

- `npm ci`: exit0,427 installed/428 audited in8m. Five high development-only advisories remain (production audit below clean); unsupported ESLint9 and pending unrs-resolver1.12.2 postinstall notice recorded. No dependency/lockfile change or blanket install-script approval.
- `npm run lint`: exit0, no lint errors/warnings on final source/tests/capture tooling.
- `npm run typecheck`: exit0, generated routes plus strict TypeScript.
- `npm run build`: exit0 after the final explicit native-disclosure change, nine generated pages including Savvyra/placeholder. Later source line-ending normalization changes no runtime semantics.
- `npm test`: exit0 via `npm.cmd test -- --workers=1`, **78 passed in7.4m**, one Chromium worker;69 retained guarantees plus9 focused checks. Twenty cycles include the focused state on every visit; previous Hub bounds, recovery and publication checks remain.
- `npm audit --omit=dev`: exit0, **found0 vulnerabilities**. No unauthorized dependency fix. A sandbox retry failed to reach the registry and could not write its npm cache log; the network-enabled retry exited0 with zero vulnerabilities.

[Baseline startup](evidence/m6a2/before/measurements.json), [baseline entry/quality](evidence/m6a2/before/review-bay-measurements.json), [final resource cycles](evidence/m6a2/after/resource-cycles.json) and the final performance comparison retain raw observations. Z maxima are45 calls/7000 triangles/45 geometries/20 live mesh materials/3 renderer textures; lazy JS≤20KiB, first median≤1500ms,warm≤750ms. No imported media.

Five final startup samples: **990/866/931/1025/942 ms**; median **942 ms**, range **866–1025**, within **1152 ms**. JS **399367→400160 bytes** (+793,0.77KiB), leaving5687 bytes under original F cap405847. Unvisited Development code is absent from Home transfer. Additional lazy module **1280→1921 bytes** (+641), below20KiB. Timing differences across the interruption do not establish a speedup.

Five first/warm pairs per quality (median; inclusive min–max):
- Low: first **332 ms** (183–423); warm **183 ms** (172–235).
- Medium: first **314 ms** (250–323); warm **232 ms** (213–286).
- High: first **297 ms** (269–354); warm **282 ms** (210–323).

Entry medians increased from the preserved baseline, particularly High warm entry162→282ms. They remain within1500/750ms gates. The added marker/camera/HTML introduce work; the date gap and uncontrolled environment prevent attributing the timing change to one cause. No FPS or optimization claim follows.

Hub retains **30 calls/1680 triangles/30 geometries/15 attached mesh materials/1 texture**. Development overview **10/436/10/9/1**; focus **11/532/11/9/1**, all below Z. The reused palette creates12 CPU material objects including unused slots and disposes them; attached-material counts are not heap/VRAM measurements. Four active lights/one point, shadows off throughout.

DPR remains Low1, Medium1.5, High2 (Low default). Measured buffers at this viewport:694×440,1041×660,1389×880. Geometry/material/light/camera values are identical across quality modes; differences are pixel density. Six extended Development idle windows (500ms settle+2s+10s) and startup idle observations stopped; twenty overview/focus/Hub cycles retain exact counts without monotonic growth and preserve Canvas identity. All14 comparison gates pass. Normal measurement contexts report zero page errors.

No overflow at320/390/768/1024/1440px; no Canvas below768px. Keyboard/pointer/native case-study journeys and browser Back restore correctly; no-JS mobile opens the native explanation and local detail link. Chromium156.0.8078.4 is covered. Firefox/WebKit binaries are absent; they were not installed or claimed as tested.

Evidence: [comparison sheet](evidence/m6a2/comparison.html), [comparison PNG](evidence/m6a2/comparison.png), [raw gates](evidence/m6a2/performance-comparison.json), [final entries/poses/journeys](evidence/m6a2/after/review-bay-measurements.json), [keyboard explanation](evidence/m6a2/after/quality/approved-explanation.png), [mobile/no-JS explanation](evidence/m6a2/after/quality/no-js-mobile-expanded.png), [unsupported WebGL](evidence/m6a2/after/desktop-unsupported-webgl.png), [loading](evidence/m6a2/after/development-loading.png), [failure](evidence/m6a2/after/development-download-failure.png) and [context loss](evidence/m6a2/after/development-context-lost.png).

Visual review: the preserved Hub and Development focus captures retain the warm bench/cool cosmic palette. The procedural cyan marker and amber focus corners are distinguishable; no project artwork is implied. The focus view deliberately emphasizes the monitor and crops the lower platform; full bench/platform composition remains in overview. Additional HTML controls increase document height, but grid/column/440px viewport CSS is unchanged. The native disclosure limits the long explanation to explicit reading. Final composition remains an owner review gate.


## Intermediate findings and test corrections

Visual review of the first completed after capture found that always-expanded contribution/approach text enlarged the studio column and shifted the vertically centered left intro. The final native disclosure keeps the default explanation compact without changing the grid, 440px viewport or approved wording. All first-pass after files are preserved under `evidence/m6a2/iterations/expanded-explanation/`; final after measurements and tests were repeated because application markup changed.

Earlier runs are not final passes: the first focused run passed 6/7 and an intermediate full run passed 76/77 because pointer activation lost HTML focus to a later native mouse event. Native preventDefault alone did not solve it. Guarded next-frame focus restoration fixes the application issue. A subsequent focused run passed 7/8 but exposed an incorrect new-test expectation of a focus-visible ring immediately after pointer input; the test now checks pointer focus, then actual Tab/Shift+Tab keyboard ring visibility. Repeating the long combined journey initially passed 1/3 with two default-timeout failures caused by per-frame assertion trace volume; identical bounds/clearance predicates are now batched across all samples, and rapid requests are a separate independent test. The corrected original journey then passed **3/3 in57.2s** with the same default timeout and bounds.

A later full run passed77/78; its existing unsupported-WebGL assertion started while the desktop page still had the server-rendered 2D snapshot. The trace later showed the actual unsupported fallback. The test now waits for its injected capability probe to actually run after hydration, then retains the original five-second fallback assertion. The corrected check passed **3/3 in27.3s**. No product fallback delay was increased or check removed. One diagnostic npm invocation consumed filter/repeat flags rather than forwarding them, running eight tests instead of three; direct Playwright CLI was used for the actual repeated checks. Intermediate failures and forwarding warnings are disclosed rather than treated as successful validation.

A repeat after adding automatic disclosure expansion passed 77/78 checks but stalled one focused camera during the twenty-cycle check (camera-moving remained true for the unchanged five-second assertion). That run was interrupted during slow teardown after the reported failure. The automatic expansion was removed: the native disclosure now opens only when explicitly requested, avoiding automatic page-height changes during camera selection. The failure snapshot is retained under `evidence/m6a2/iterations/automatic-disclosure-failure/`. Final serial validation above supersedes that run; the observed correlation is not a browser-engine root-cause claim.

The next two-worker repeat passed the twenty-cycle check but reported 77/78: an unchanged denied-storage route journey stayed on Projects after Return to studio instead of reaching the viewport within its existing 20-second assertion. No application/test change was made for that result. The failure snapshot is retained under `evidence/m6a2/iterations/route-restoration-failure/`; process inspection found no old task-owned browser remnants. The unchanged check passed 3/3 in2.0m in isolation, including slow teardown. Sandbox server cleanup stalled; terminating only the verified test-owned Next process let the runner exit0. The final complete run uses npm.cmd with one worker and normal local process permissions. A PowerShell npm-shim attempt consumed --workers and still started two workers; it was stopped early and is not counted as validation.

## Conditions, limitations and owner gate

Baseline was captured before the October17 interruption; final capture follows October20 resumption. Compare pinned build/browser, viewport1440×900/deviceScaleFactor2, quality, fresh contexts and unthrottled protocol; document the date gap and uncontrolled background/power/cache variation. This is not a continuous controlled device session or proof of a general speedup.

Owner Intel HD Graphics620 laptop feedback is a qualitative compatibility reference. Local automated Chromium evidence does not replace real-device testing or identify physical GPU/VRAM/FPS. Firefox/WebKit, actual Safari/mobile and assistive-technology coverage remain subject to environment availability and explicit limitations. No accessibility conformance, physical-GPU performance or final cinematic fidelity claim.

Owner review requested: accept or revise the procedural marker/focus framing, native explanation flow and unchanged-shell integration; optionally verify the journey on the actual Intel HD Graphics620 laptop. Commit SHA/push/remote verification are reported in the delivery handoff (not embedded into its own commit). Stop: no M6-A3, M6-B4, polish/release batch or deployment.
