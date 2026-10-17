# M6 experience architecture — proposal for owner approval

Planning base: accepted M0–M5-C, repository commit `52e3845`. This document proposes behavior; it does not authorize implementation. The desktop split-screen shell, 440px studio viewport, existing editorial routes, mobile HTML experience and M3 hub camera values remain the starting constraints. See [owner decisions](M6_OWNER_DECISIONS.md), [batch plan](M6_BATCH_PLAN.md) and [audit](M6_PLANNING_REPORT.md).

## Experience principle

The studio should explain the work through objects: identity at the Creator ID, a discipline through a purposeful workstation, and a real artifact through a display. Each spatial action must lead to information or a useful choice. A visitor can enter through the world or bypass it through ordinary links. No collectible, puzzle, camera journey or loading screen is a prerequisite for evaluating Arieza or making contact.

The proposed explorer journey is arrival → hub orientation → choose a discipline → inspect one approved exhibit → read its HTML case study → return to the same studio context → services/contact or another discipline. The recruiter shortcut remains About → Projects → genuine case study → Contact. The client shortcut remains Services → relevant work → Contact. The last two journeys cannot be completed authentically until content and a verified destination exist.

## 1. Arrival at Midnight Tech Lab

**Existing:** server-rendered Home identity/CTA column alongside the studio panel on large desktop; ordinary global links; no intro. Below the existing large-screen layout breakpoint the columns stack. WebGL starts only at 768px and wider. No-JS visitors see the descriptive studio HTML.

**Proposed purpose/story:** enter a working midnight studio with a clear invitation to inspect real work, rather than sit through a cinematic. The first visual focal point stays the warm desk, secondary Creator ID/project structures, then optional discipline choices.

**Interaction and HTML:** retain Explore projects/About links and immediate overview. A brief owner-approved orientation sentence and a compact studio directory below existing controls may explain the world. No auto-start, forced fullscreen or scroll takeover.

**Camera/navigation:** preserve overview `[8,7,10] → [0,.25,0]`, FOV 38°, clipping .1/60; no arrival travel. The accepted 1000ms hub transitions remain separate from future scene changes.

**Dependencies/content:** approved identity wording and navigation contract; no portrait required for the technical foundation. **Cost:** no new scene geometry; directory shell JS budget in A1. **Accessibility:** same skip link, visible focus and non-blocking loading message. **Priority:** P0, A1; no shell redesign.

## 2. Orientation inside the Central Hub

**Existing:** three typed focus targets, semantic buttons, written selected state, non-modal explanation, amber corners, Back/Reset/scoped Escape, quality radios and stable hub preset restoration. Console/globe are inert.

**Proposed purpose/story:** a studio reception point that makes the disciplines understandable. Add a named HTML directory before making any additional mesh interactive. In a later separately approved slice, the existing console may open that same non-modal directory. The globe remains a visual orientation symbol, not a second competing navigation system.

**Interaction and HTML:** directory lists eligible zones, their purpose and ordinary editorial links; native desktop Enter zone buttons load spatial views. Empty/unapproved zones have honest status text, with no dead Enter action. On mobile/no-JS, keep direct editorial links and descriptions, not camera controls.

**Camera/navigation:** opening the directory needs no new focus preset; preserve the four hub presets and return focus to the initiating control. No hover-only module map, orbit or world-travel path. **Dependencies:** explicit console approval, typed zone registry, loading and eligibility rules. **Content:** short approved descriptions and eligible work. **Cost:** HTML negligible in draw counters; console reuses existing geometry, no globe animation. **Accessibility:** logical tab order, one announcement per action, Escape closes directory before leaving a selected scene. **Priority:** P0 foundation; console activation P1/A2, not A1.

## 3. Creator ID / About

**Existing:** creator focus `[-5,3.5,4.5] → [-2.6,1.36,-.8]`, empty framed display, normal `/about` link, six missing-input profile sections; no portrait/CV.

**Proposed purpose/story:** introduce the person and explain the connection between disciplines. **Interaction:** keep focus then explicit About action; never replace readable biography with tiny mesh text. Approved portrait can occupy the physical frame later, using the same approved source as About.

**HTML equivalent:** `/about`, with optional approved local CV and verified social destinations. **Camera/navigation:** existing pose/Back; ordinary route history, no modal biography or new portrait zoom. **Dependencies/content:** verified introduction, professional identity, skills/background/approach, portrait permission and optional CV; candidate board identity text is excluded. **Cost:** at most one bounded portrait texture if approved; omit it until supplied. **Accessibility:** portrait alt text, correct reading order, CV labeled by format; no camera requirement. **Priority:** P0 content integration/B1, independent of new zones.

## 4. Project discovery

**Existing:** project focus `[-5,3.5,7] → [-2.4,1.81,1.7]`, neutral display, `/projects`, URL category filtering, approved-only detail selection. One local template is not real work; no featured project is configured.

**Proposed purpose/story:** a curated doorway into evidence, with the full HTML library as source of truth. **Interaction:** first retain Browse projects; only later show a specific project action when the owner selects an approved record. Display selection is explicit, not a random carousel. No automatic slideshow.

**HTML equivalent:** `/projects`, eligible category query links and `/projects/[slug]`. Categories must derive from approved records; do not assume proposed discipline IDs already exist. **Camera/navigation:** preserve existing hub project pose; inside a zone use that zone's bounded exhibit preset and explicit normal case-study link. **Dependencies/content:** approved role, overview/contribution/process, tools/categories, media/rights and optional verified outcomes/links. **Cost:** one or two bounded static exhibit textures, loaded for the selected zone only. **Accessibility:** same title/actions in HTML, alt/captions, no hover-only preview. **Priority:** P0 for first authentic exhibit/A2+B1.

## 5. Development Lab

**Existing:** conceptual only; no scene, category, tools inventory, content mapping or camera.

**Proposed purpose/story:** explain how an approved application was built: problem, technical decision and contribution. A single code-oriented bench/exhibit supports one real project instead of generic tool logos implying skills.

**Primary interaction:** enter zone → select approved project display → read short contribution/decision in HTML → open case study or library. A1 may prove loading/cleanup with an explicitly labeled local procedural review bay and no work claims; it is not a finished portfolio zone.

**HTML equivalent:** approved Development category link if populated, otherwise `/projects` with honest empty state. No new `/development` route proposed. **Camera/navigation:** zone-specific overview and one exhibit pose, measured during its implementation; return hub restores prior stable hub ID. No coordinates borrowed from boards or reuse of hub bounds for another scene.

**Dependencies/content:** scene host and first project approved for this discipline; actual tools/decisions/media with rights. **Cost:** one lazy scene under A1/A2 budgets, no code editor/terminal simulation, physics or continuous screen animation. **Accessibility:** plain-language explanation, native controls, no need to understand a code image. **Priority:** P1; first technical scene in A1, meaningful curated journey in A2.

## 6. Design Studio

**Existing:** conceptual only; no approved design work or scene.

**Proposed purpose/story:** show visual reasoning and iteration through an approved design artifact. One drafting/display arrangement, not a decorative duplicate desk. **Interaction:** choose one artifact/decision, read process, open case study; side-by-side static stages can explain before/after only when genuinely supplied.

**HTML equivalent:** actual approved Design category query or `/projects`; case-study gallery carries full alt/captions. **Camera/navigation:** separate zone overview/exhibit pair, controlled and cancellable; no panorama drag required. **Dependencies/content:** approved design project, process permission, images, captions and any tool claims. **Cost:** same single-zone cap; at most two static textures, no giant mood-board atlas. **Accessibility:** color is never the only explanation; image descriptions and readable text outside canvas. **Priority:** P2/A3, after first-zone proof and owner content readiness. Skip rather than fill with fabricated branding.

## 7. Media Lab

**Existing:** conceptual only; installed transitive libraries do not constitute a media player or AR demo.

**Proposed purpose/story:** explain an approved motion/interactive-media artifact through its visual result and contribution. **Interaction:** static poster/exhibit → HTML case study; any video playback is a separate optional, user-initiated enhancement, not a WebGL video texture.

**HTML equivalent:** eligible Media category or `/projects`; future HTML media has native controls, captions/transcript and a static fallback. No autoplay/audio ambience. **Camera/navigation:** independent overview/exhibit pair, same return contract. **Dependencies/content:** real work, poster rights, approved description; video requires encoding, captions/transcript and explicit bandwidth/playback approval.

**Cost:** static-poster budget only in A3; streaming/video and interactive AR are excluded until separately scoped and measured. **Accessibility:** pause/controls, transcript, reduced-motion respect and equivalent still/text. **Priority:** P2/A3 conditional; do not create an empty theater merely to complete the map.

## 8. Services Terminal

**Existing:** `/services` renderer supports approved offerings, but data is empty; console is not a services terminal.

**Proposed purpose/story:** connect demonstrated capabilities to confirmed solo offerings. Recommend reusing the existing console/directory for a Services action, rather than a separate island with no distinct content. This is a placement proposal, not approval.

**Interaction and HTML:** ordinary `/services` link → confirmed scope/deliverables/process → related approved work → `/contact`. No booking, packages/pricing or response promises unless verified. **Camera/navigation:** no extra hub preset or scene required; selection does not delay the link. **Dependencies/content:** approved offerings and contact destination before claiming an inquiry journey works. **Cost:** no extra 3D module; reuse HTML cards. **Accessibility:** link semantics, clear incomplete state and no simulated success. **Priority:** P1/B1; terminal placement approval before any mesh activation.

## 9. Personal Corner

**Existing:** no cozy geometry, personal gallery, pet/mascot, personal photos or published interests. About's interests section is draft.

**Proposed purpose/story:** make the studio personal through a small amount of approved creative practice, not invented domestic detail. Recommend an About section first and, only if valuable, one small authored object/display on the hub. No separate island at first.

**Interaction and HTML:** read approved interests or personal artwork at a proposed `/about#personal` section; anchor does not exist yet. A hub link may use the existing Creator ID action rather than another focus target. **Camera/navigation:** no added camera until the object/content need is demonstrated and reviewed. **Dependencies/content:** explicit privacy/publication approval, authentic personal work/photos and rights of any depicted people. **Cost:** zero geometry initially; any later object needs a new budget/framing gate. **Accessibility:** equivalent HTML text/gallery; no secrets or hover easter eggs required for understanding. **Priority:** P3/B2 optional and independently gated.

## 10. Contact and exit paths

**Existing:** `/contact` is an incomplete information page, no destination/action/form. Native global navigation allows exit to any editorial route at all times.

**Proposed purpose/story:** end with a credible next step. **Interaction:** case study/services/About → `/contact` → explicitly verified direct destination. No inquiry claim until that exists. External destinations must have clear labels; no forced new tab or tracking is needed.

**HTML equivalent:** the Contact page itself. **Camera/navigation:** no contact scene/travel; browser Back and Return to studio keep predictable behavior. **Dependencies/content:** exact destination, owner control/verification and permission, optional availability wording. **Cost:** no WebGL cost or backend. **Accessibility:** purpose-readable link, keyboard focus, native navigation; missing destination stays visibly incomplete. **Priority:** P0/B1 and required before a release-ready claim. Deployment remains separately unauthorized.

## Recommended spatial architecture: Option C

Use one lazy desktop Canvas and exactly one mounted scene graph: hub or one discipline. Preserve the split-screen columns and studio dimensions; change the content inside the existing panel only. Keep common atmosphere/quality/failure controls outside scene-specific graphs. The 3D experience gains meaning through curated exhibits, authored materials and purposeful navigation, not by making the panel fullscreen.

**Proposed typed registry:** stable scene IDs `hub`, `development`, `design`, `media`; each entry declares eligibility/status, an explicit lazy module import, accessible title/description, approved category/project references and a local camera config. These IDs/files do not exist yet. Services and Personal are editorial destinations at first, not fake scene IDs. Content passed into client/scene boundaries is only the approved presentation subset, not draft records or private approval notes.

**URL/state contract:** editorial routes and category queries remain the URL source of truth. Scene selection is local UI state and creates no browser history entry, matching current camera selection; no new route, query parameter or deep-link feature is proposed initially. A normal HTML directory link always reaches the editorial equivalent. Desktop Enter zone buttons are progressive enhancements, never anchors with prevented default. Browser Back operates on routes. Explicit Back to hub handles spatial navigation.

**Restoration proposal:** keep the existing validated hub preset key unchanged. If cross-page zone restoration is approved, a separate versioned session record contains only a stable eligible scene ID; validate against current registry/content. Save only after scene readiness, never pending loads. Re-entry falls back to hub if a scene is removed, unapproved or storage denied. Quality remains parent-owned and motion independent. No scene URLs or persisted camera coordinates are needed. A1 must test this explicitly; do not claim it already works for multiple scenes.

**Scene lifecycle proposal:** hub ready → request scene with monotonically increasing attempt ID → unmount/dispose old graph and show a fixed-size HTML loading cover → load requested module only → mount graph → set its own initial camera directly → mark stable after completed draw and restore controls/focus. Clear old graph before mounting the new one; no simultaneous world crossfade. A brief neutral/loading cover is deliberate, not an unexplained blank canvas. Reduced motion uses the same immediate switch without decorative fades.

Requests replace each other; stale resolutions cannot mount or save state. A JS import may finish after cancellation and remain in the browser module cache: GPU graph disposal does not unload JavaScript. Do not preload every zone. Imports cannot be assumed abortable; later asset loaders must have explicit cancellation/cache ownership. On error/timeout, offer Retry zone, Return to hub and direct HTML links. Context loss uses the existing fresh-renderer recovery, preserving only validated stable state. Retry/reset cannot revive a stale selection.

**Controls/focus proposal:** selecting a scene focuses its HTML heading/status after readiness; retain the initiating button reference for Back. Within hub, existing Back/Escape behavior remains. During zone loading, scoped Escape cancels and returns hub; in a ready zone, Escape/Back to hub restores hub and origin. A non-modal directory closes first on Escape. Reset means hub overview, clears proposed scene restoration and retains quality. Direct links stay usable during all states. No dialog, scroll lock or focus trap is necessary.

**Camera boundary:** keep M3 CameraRig and hub coordinates as a compatibility unit. Each new scene has a small typed local config and controlled overview/exhibit poses; common transition math may be reused only after local bounds/waypoints are proven. Do not expand hub's `CameraPresetId` to include unrelated coordinates and assume old clipping tests cover them. No seamless cross-world flight or free-flight system.

**Meaningful-area eligibility:** a public-facing discipline needs at least one approved relevant project, readable contribution/process and an approved visual or an explicitly approved text-first exhibit. The A1 local technical bay is a named review exception, not publication or a completed discipline. Missing zones remain honestly described and lack Enter controls. Reassess spatial value if the same single project would simply be duplicated across three rooms.

## Cinematic direction: practical proposals

Essential improvements, staged under B1 rather than authorized here:

- **Hierarchy/composition:** retain warm workstation as overview focus; promote real project/identity surfaces second, keep console/globe quiet. Compose each future zone around one artifact and one decision. Keep the accepted shell and all four hub coordinates; framing changes require a separately approved screenshot comparison.
- **Silhouette:** keep the layered rock visible against the dark background through existing palette/rim-light balance. Improve material separation before adding geometry. Do not infer stairs, surrounding fragments or a dome from boards.
- **Warm/cool balance:** reuse current four-light envelope and material roughness/emissive discipline; review at Low and High. Local scenes may have their own bounded four-light setup, never additive lights from inactive rooms.
- **Cosmic atmosphere:** retain static authored purple/blue/muted-pink gradients and sparse star marks. Avoid dense neon backgrounds that erase the island edge; existing CSS is not a production nebula image.
- **Holographic language:** static opaque/dark panels with narrow cyan/violet emissive edges and clear HTML explanations. Existing globe wireframe can stay inert. No bloom, scanline shader, transparent layer stacks or animated map is needed.
- **Feedback/transitions:** preserve amber corners plus text/pressed state. Loading/selected/failed states should share stable panel space. Scene swapping is an acknowledged transition between studio rooms, not a false promise of continuous flight. No intro or idle animation.
- **UI integration:** use one non-modal directory with scene title, purpose and relevant editorial action near existing controls. No overlay that covers the object being inspected, duplicate HUD or global navigation redesign. Maintain usable 44px controls and explicit selection labels.
- **Typography/identity:** first approve a small type/palette specification against real copy and contrast checks. Current system sans remains valid; Space Grotesk/Inter are candidates, not licensed/imported assets. Any local font, logo, favicon or OG work needs approved source, file budget and separate release relevance.

Optional later enhancements: one personal artifact with a real story; a static project-stage comparison; owner-approved locally hosted typography; user-initiated HTML video with transcript. Each requires content and a budget decision. Excluded from this plan's first batches: bloom, particles, real-time shadows, custom shaders, soundscape, mascot, intro, free orbit, satellite panoramas and fullscreen layout redesign. None is necessary to establish the studio narrative.
