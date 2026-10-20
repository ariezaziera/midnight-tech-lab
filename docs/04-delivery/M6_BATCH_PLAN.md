# M6 delivery batches — proposed, not execution authorization

Base: accepted M5-C `52e3845`. Owner accepted A1/B3 and subsequently authorized M6-A2 Specification v1.0 only under its explicit execution conditions. A2 uses text-first Savvyra, keeps console/globe inert and does not approve other rooms or media. Other batches remain proposed. Every batch below ends in a report/commit and owner review; completion never authorizes the next. [Architecture](M6_EXPERIENCE_ARCHITECTURE.md), [decisions](M6_OWNER_DECISIONS.md) and [planning report](M6_PLANNING_REPORT.md) govern this proposal. Proposed file paths below are not present implementation.

## Common scope and validation contract

Keep the split-screen shell, 440px scene panel, global routes/navigation, small client boundary, mobile HTML below 768px, reduced motion, demand rendering, DPR caps 1/1.5/2 and Low default. Preserve existing hub presets, typed target IDs and route mappings. No dependency addition is expected for A1–A4. No backend, deployment, intro, free-flight, expensive effects or imported production model is included.

For each future implementation batch: read current AGENTS/installed framework guidance, inspect accepted base, capture fresh matched before evidence, implement only the approved slice, run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm audit --omit=dev`, then capture after evidence and report exact results. Stop servers before clean install on Windows. Recheck audit findings rather than assuming the historical production result remains current. Preserve historical evidence and record any accepted trade-off explicitly.

Retain the 55 existing checks and their guarantees. A1 should not require changed behavioral assertions. Later explicit console activation or genuine content approval necessarily changes old assertions such as "console inert", "zero published projects" and "six draft sections". Change those only in the batch specifically approving the new behavior, preserve equivalent negative tests with isolated fixtures, and add positive real-content/console tests. Do not remove failure, keyboard or publication safeguards to get a pass. Keep exact hub geometry assertions scoped to the unchanged hub; new rooms receive their own budgets, rather than weakening hub limits globally.

## Performance profiles — F retained; Z counts/transfer/common gates approved for A2 only

All counts are **absolute resident totals per active scene**, including selected-state geometry, not additive allowances for every module. A hidden scene is unmounted, not merely invisible. These are cautious planning caps selected above current measured complexity; they are not measured future results or established GPU limits.

**F — A1 foundation:** hub stays at measured overview 30 draws / 1,680 triangles / 30 geometries / 15 live mesh materials / 1 renderer texture, with the accepted selection batch. Development review bay ≤35 draws, 3,000 triangles, 35 geometries, 16 live mesh materials, 1 renderer texture; no image assets. Initial Home JavaScript ≤M5-C 393,559 bytes +12 KiB; first lazy bay's additional transfer ≤20 KiB after shared shell/renderer code. No unrelated scene requests before entering it. If independently accepted B1 content has already established an I-profile hub, A1 must preserve that accepted hub cost rather than restore empty displays; its added shell JS is still at most 12 KiB and total growth must also stay within the cumulative I cap.

**Z — one meaningful discipline:** A2 execution approves the count/JS/timing/rest/resource contract for the text-first Development exhibit only. The image/texture-media inventory below remains a future proposal, not permission to ingest media or build Design/Media rooms. active Development, Design or Media scene ≤45 draws, 7,000 triangles, 45 geometries, 20 live mesh materials, 3 renderer textures (up to two authored image surfaces above the observed internal texture baseline). Each newly approved room adds ≤20 KiB incremental lazy JS, ≤512 KiB encoded static image transfer and ≤12 MiB estimated additional decoded RGBA8 texture storage including planned mip allowance. Largest scene texture ≤1024×1024. These texture estimates are inventory arithmetic, not measured VRAM; reject assets whose actual dimensions/formats/mips exceed the inventory. No WebGL video. Initial Home JS stays within the currently approved F or I cap; an unvisited scene adds no eager module transfer.

**I — identity/editorial integration:** hub ≤35 draws, 3,000 triangles, 35 geometries, 18 live mesh materials, 3 renderer textures after portrait/project surfaces. Retain exact original hub values until such an addition is approved. Initial Home JS ≤baseline +32 KiB cumulative across all authorized work, not +32 KiB per batch. Initial encoded identity/project media ≤256 KiB combined, lazy detail gallery ≤1 MiB per case study before optional further user-requested media. Hub image textures obey Z's dimension/decoded-storage caps. No new font transfer until separately budgeted; retaining system fonts costs zero font downloads.

**R — QA/readiness:** no new rendering allowance; satisfy the approved F/Z/I profiles actually used. Media/font budgets are not permission to acquire assets. A budget exception requires measured justification and explicit owner acceptance; reduce complexity or defer the exhibit first.

**Common timing/rest/resource gates for every profile:**

- Same local production protocol as M5-C: 1440×900, deviceScaleFactor 2, same browser/version/quality/build conditions, at least five fresh-context runs, report median and range. Re-capture M5-C-equivalent base rather than compare different hardware or concurrent two-worker timings. Initial hub readiness target ≤max(1,000 ms, matched-base median ×1.20). Reference was 807 ms median, range 776–861; do not turn this small sample into an SLA.
- New-zone first entry, measured from activation through completed draw: local median ≤1,500 ms, warm re-entry ≤750 ms; compare all three qualities and record range. A later 5 Mbps/100ms RTT cold-network exercise has a proposed median ≤3,000 ms for scene readiness. Record actual throttling and cache state; this differs from the unthrottled reference and cannot establish regression alone. The existing 15s recovery watchdog is not a performance target.
- Idle: after 500 ms settling, no frame-count increase during 2s and then 10s without intentional input/resize in every mode/preset. Camera movement may invalidate only until settled. Page errors zero outside deliberately injected failure cases; those must produce readable recovery.
- Stability: 20 hub↔zone cycles plus repeated exhibit/quality changes. Record live counters at equivalent stable checkpoints; no monotonic growth after warm-up. Hub return must match its accepted counts (plus explicitly approved media), and all inactive graph resources must be released. Browser module cache is expected to retain imported JS; do not misreport that as disposed GPU content or promise JS unloading. Record optional heap/process measurements only where available, with GC limitations.
- Keep DPR upper bounds independent of reduced motion. At DPR1 all tiers may coincide. Measure actual backbuffer dimensions; High is not a license for extra effects/lights. One active renderer, ≤four active scene lights with ≤one point, shadows off. No preload-all, duplicate hidden canvas or simultaneous old/new graph during a switch.

## M6-A1 — Scene host and one Development review bay

**Objective:** prove meaningful expansion can be loaded and recovered within the current shell before investing in multiple rooms.

**Exact scope:** typed scene registry for hub and Development review bay only; parent-owned stable/pending scene selection; explicit lazy imports; exactly one mounted graph; labeled desktop Enter review bay/Back to hub controls with direct Projects equivalent; readable fixed-size loading/failure/cancel states. Preserve existing three hub mesh targets and all four M3 camera values. Console/globe remain inert. The bay contains only a minimal original procedural bench/display, visibly a technical placeholder, no work/skills/tools claims. One stable local bay overview is sufficient; new exhibit focus is deferred to A2. Keep quality outside the graph and validate restoration/cancellation/focus contracts from the architecture document.

**Dependencies:** approval of Option C, A1, local-review placeholder exception and F targets (D1–D4/D6). Authentic assets are not a prerequisite for this technical proof. Public scene/content publication is not authorized by an A1 approval. Do not build a general scene engine or new router/store library.

**Expected files/components:** new proposed `src/lib/scene/scene-registry.ts`, `studio-state.ts`, `src/components/three/world/scene-host.tsx`, `src/components/three/zones/development-scene.tsx`, `src/components/studio/studio-directory.tsx`; minimal changes to existing preview/world loader to host the graph and preserve lifecycle. Keep `interaction-config.ts`, hub geometry and camera rig behavior unchanged. If a versioned scene session helper is needed, keep hub's existing key/validation intact. Add `tests/studio-zones.spec.ts`; update technical docs and asset provenance for authored code geometry only.

**Testing:** all 55 prior tests; lazy chunk absence until activation; actual completed bay draw; latest-request wins, Escape/Back/Reset during load and after readiness; denied/corrupt storage; route leave/return and browser Back; failure/timeout/context loss while bay selected; quality during switching; one canvas/one graph; 20-cycle counters; no-JS/mobile HTML paths. Distinguish zone readiness from the old first-renderer watchdog: each switch needs its own stale-safe completion/timeout policy.

**Evidence/performance:** proposed `docs/04-delivery/evidence/m6a1/` with hub before/after, bay, loading/failure/cancel, 390×844 mobile, five responsive widths and Low/Medium/High. Apply F and common gates, including lazy bay transfer and hub-return resource counters. No change to desktop column proportions or scene height.

**Owner gate/stop:** review functional lifecycle, framing and F results on Intel HD 620. Stop after report/commit/push. A2, console activation, further rooms and content integration require separate authorization.

## M6-A2 — One authentic Development exhibit and studio directory

**Objective:** establish the first complete studio → evidence → case study → return journey.

**Exact scope:** one approved Development project, one explicit exhibit selection with locally measured overview/exhibit camera pair, concise HTML contribution/process explanation, normal case-study/library links. Activate existing console to open the same non-modal directory only if separately approved. No new hub console camera or interactive globe. Approved category and project references derive from content, never raw mesh names. Reuse the current case-study renderer; no code editor, live terminal or invented stack logos.

**Dependencies:** A1 accepted; at least one approved project/content packet from B1 or separately authorized project intake; D5 console behavior and Z budgets. If content is absent, do not progress beyond A1's labeled review bay or mark A2 complete.

**Expected files:** development scene/local camera config, registry/directory/preview, optional explicit console navigation-action metadata in existing hub display/root handlers; `src/content/editorial.ts`, `src/lib/content.ts` only as approved intake requires. New proposed `src/lib/scene/zone-content.ts` selects approved public exhibit data. No new public route required.

**Testing:** retained guarantees, real pointer/keyboard exhibit journey, approved-only category/slug/media selection, invalid/missing exhibit fallback, directory focus/Escape, all camera paths/clearance at 1024/1440, direct HTML/no-JS journey. Explicitly replace the console-inert assertion only after its new behavior is approved; keep globe inert and preserve the original three focus IDs. Add rejection tests for draft exhibit references.

**Evidence/performance:** `evidence/m6a2/`, all local camera states/qualities, complete genuine route journey, mobile and failure; Z profile, unchanged hub or approved I profile, common gates and Intel HD 620 comparison. **Owner gate/stop:** approve authentic narrative and local framing; do not expand another discipline automatically.

## M6-A3 — Design Studio, one exhibit only

**Objective/scope:** add one on-demand design room explaining one real visual decision, with overview/exhibit poses, one or two approved static images and the existing HTML case study. No generic mood board, fabricated brand, large gallery or duplicate project used only to fill a room.

**Dependencies:** A2 accepted, demonstrated portfolio value, approved design packet and a fresh authorization. **Expected files:** proposed `three/zones/design-scene.tsx`, local config, registry/zone-content mappings, approved editorial records; small parameterized additions to zone tests rather than another interaction system.

**Tests:** Z/common gates, new-scene-only lazy transfer, no additional initial Home load, approved artifacts/alt/captions, local camera visibility/clearance, keyboard/pointer/reduced motion, switching between visited rooms and resource disposal. **Evidence:** `evidence/m6a3/`, all poses and qualities, HTML case study, responsive/fallback captures. **Owner decisions:** project/process permissions, static image selection and framing. **Stop:** submit report; if no qualifying work exists, defer this whole batch. Media is not authorized by Design acceptance.

## M6-A4 — Media Lab, static evidence first

**Objective/scope:** add a separate lazy poster/exhibit scene for one approved media/interactive project. Native HTML case study carries explanation; no video texture, autoplay, audio, AR launch or complex runtime demo.

**Dependencies:** prior single-zone lifecycle proven, A2 accepted, approved media project/poster and new authorization; A3 is optional, not an artificial prerequisite if Media content is ready first. **Expected files:** proposed `three/zones/media-scene.tsx`, local config, registry/zone-content and approved data; shared test matrix extended.

**Tests/evidence:** same Z/common gates and fresh viewport/quality/camera/failure/route evidence under `evidence/m6a4/`; poster has meaningful alternative text. Any desired video is a separate scope request with native controls, captions/transcript, bandwidth and decoder testing. **Owner decisions:** artifact rights, static versus separately scoped playback, distinct value from Development/Design. **Stop:** report/review; do not infer permission for player, animations or more rooms.

## M6-B1 — Authentic identity, project and services integration

**Objective:** replace missing factual inputs with approved records while retaining the accepted layout. This can be authorized independently before or alongside A1; A2's authentic exhibit depends on the project portion.

**Exact scope:** intake one complete case study first, approved biography/skills/professional identity, verified contact destination, confirmed service offerings, optional real portrait/CV/socials. Use current publication/rights contracts; integrate only supplied approved items. Missing optional fields stay omitted or honestly incomplete. Validate media files and CV existence in addition to schema fields. Reuse approved media on 3D surfaces only under I/Z caps. Approve a small visual token/type specification, then tune existing material/UI consistency within the current layout. No replacement page layouts or claims of exact board parity.

**Dependencies:** owner packet and item-specific publication/rights approval, D7 identity/art boundaries, D8 services/contact, I budget. Final font acquisition is optional, separately budgeted; system fonts can remain. **Expected files:** existing content/model/selectors, editorial presentation/routes as required, shared CSS tokens/look config only with art approval; future approved media under proposed `public/images/` and CV under proposed `public/documents/`. These directories are absent now. Update asset manifest with provenance/size/rights/alt/decoded texture estimates.

**Testing:** validators reject draft/unapproved references and nonexistent files; actual positive category/card/case-study/contact journeys without JS/WebGL; safe verified destination; portrait alt/media dimensions/rights; no confidential data in rendered HTML or client bundles; noindex remains. Existing zero-content assertions move to isolated negative fixtures only after real content approval; preserve the tests' exclusion guarantees. Required commands/common gates apply, I for hub and Z for active rooms. Capture approved content at desktop/mobile and all existing camera poses if texture/material changes.

**Owner decisions/stop:** approve each factual record/media, modest typography/palette changes and working destination; report exact items still missing. No service pricing, response SLA, CMS or backend is implied. Stop after B1; release remains gated. Independent technical A1 work must not invent data to unblock B1.

## M6-B2 — Personal Corner, optional small story

**Objective/scope:** approved personal interests or original artwork in an About section, optionally one small hub display only after a separate composition/budget review. Start with HTML; no standalone island, mascot or guessed photos/interests. Proposed `/about#personal` anchor is new and needs explicit content placement approval.

**Dependencies:** owner privacy/rights decision and meaningful supplied material; B1 identity accepted. **Expected files:** profile schema/data and About presentation; asset manifest. Any new hub object/camera is excluded from the HTML-first authorization and requires a revised scope. **Testing:** no-JS section/anchor, keyboard/media alternatives, rights and draft exclusion, no private content leak. **Evidence/gates:** `evidence/m6b2/`; I/R, no rendering growth for HTML-only version. **Stop:** optional owner review; omission does not block a credible release.

## M6-C1 — Compatibility, accessibility and performance hardening

**Objective/scope:** close measured issues on the approved implemented subset, not force completion of every conceptual room. Test Intel HD 620, Chromium/Firefox and WebKit where supported; real Safari/device coverage labeled separately. Review keyboard/screen reader/zoom/reduced motion, native routes, quality, context recovery, responsive layout, bundle/asset budgets, resource cycles and tracked dependency maintenance. Fix demonstrated faults only, no visual expansion. Upgrade pins only after compatibility/audit review, never forced audit fixes.

**Dependencies:** accepted earlier batches chosen for the release candidate, device/browser access, D9/D10 budgets and test coverage. **Expected files:** tests/config/capture scripts and targeted implicated implementation files; performance/testing docs, dependency files only if specifically justified. Preserve baseline comparisons when dependency changes alter build output.

**Testing/evidence:** all retained and newly added tests plus manual Intel protocol from the planning report, production audit, cross-engine failure/navigation smoke, assistive-technology observations; `evidence/m6c1/`. Apply R with approved per-scene profiles and document any exceptions before acceptance. **Stop:** report blockers/limits; no claim of WCAG conformance or universal GPU support. No release/deployment permission follows from tests passing.

## M6-C2 — Release-readiness package, no deployment

**Objective/scope:** assemble an owner-reviewable release candidate checklist: approved content and rights, working direct contact, relevant metadata/OG/favicon sources, canonical/domain proposal, selected supported browser/device matrix, dependency/security/privacy review, final visual sign-off, rollback and hosting proposal. Retain prototype noindex until a separate publication approval; removing it and actual hosting changes are not included automatically.

**Dependencies:** C1 accepted, critical content complete, agreed release boundary and D11. Optional rooms/Personal/video/intro need not ship. **Expected files:** release checklist, asset/content inventory, final report and proposed deployment/runbook documentation; tests for actual SEO changes only if explicitly included later. **Evidence/gates:** no new scene allowance; all approved R gates and unresolved risks stated. **Stop:** owner accepts readiness separately from authorizing deployment. This planning request does not authorize even C2 implementation, let alone publication.
