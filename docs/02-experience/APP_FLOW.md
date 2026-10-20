# App Flow — M3

## Main navigation

Home ↔ Projects Library ↔ placeholder Case Study; Home ↔ Services ↔ Contact; Home ↔ About ↔ Contact. Global HTML navigation is independent of WebGL. Contact still has no verified destination or submission action.

## Studio journey

HTML entry → restore stable overview/target → choose Creator ID, Project Display or Workstation with pointer/HTML control → bounded transition (or reduced-motion snap) → non-modal explanation and ordinary page links → full HTML route → Return to studio or browser Back restores stable preset.

Direct page links are available before travel finishes and in every fallback. There is no intro, module travel, free-flight, modal preview or featured-project claim in M3.

## State ownership

- Route/navigation state remains in the URL and Next.js router.
- A requested camera preset plus monotonically increasing request sequence is transient React state in StudioPreview.
- The camera rig owns only its current pose and one cancellable transition plan in refs. A new request replaces that plan; no animation queue is retained.
- Session state contains only a validated stable preset ID: overview, creator, projects, workstation. Unknown values use overview; denied storage uses memory fallback.
- Selection explanations derive from the requested preset. Geometry focus and HTML aria-pressed share that source.
- Only a completed stable camera request updates session restoration. Reset clears it immediately to overview. React retained route-view activation discards unfinished requests and resets the rig's initial-pose behavior.
- Scene loading/ready/error/retry belongs to the narrow desktop loader; viewport and reduced-motion preferences use browser subscriptions with safe server snapshots.

## Failure states

- WebGL unavailable, initialization exception, failed chunk request, timeout or context loss → HTML explanation and retry; page links remain usable.
- Missing approved media/content → visibly labeled placeholders, never invented biography/project claims.
- Mobile below 768 CSS px or JavaScript disabled → descriptive HTML studio and direct routes; no required camera action.
- Leaving during travel → preserve the prior settled ID, not the intermediate pose or pending destination. Return restores that stable view.

## M4 editorial journeys

Recruiter: Home → Projects → local template preview → About → Contact. This verifies navigation only: there is no approved genuine case study yet. Client: Home → Services → Projects → Contact. Relevant work and offerings remain empty until approved. Both journeys use ordinary links without WebGL or JavaScript. Publication status gates actual case-study and related-work links; no camera change was required.

## M6-A1 scene navigation

Desktop Enter Development Review Bay is a native button, with a normal Browse Projects link in the HTML directory. Readiness focuses the studio heading; Back to Central Hub or scoped Escape returns to the prior stable hub view and restores focus to Enter. During loading, Escape cancels the request and leaves a written cancellation notice; late imports cannot mount or save a stale scene. Reset returns hub overview and preserves quality. Hub-only focus/Back controls are shown only in the hub; quality, Reset and direct HTML links remain available in the bay.

Scene selection has no URL/history entry. A separate validated stable scene ID restores completed bay journeys on reload/route return; unfinished loads restore the previous stable scene. Mobile/no-JS keeps HTML and direct routes without importing the bay. Global WebGL failures preserve explanatory fallback/retry and editorial links. No console activation, new exhibit selection, free orbit or cross-world flight is introduced.

## M6-A2 text-first Savvyra journey

Hub → native Enter Development Lab → overview → pointer marker or Focus Savvyra → local focus plus approved HTML explanation → ordinary /projects/savvyra → native Back/Return to studio. Route reactivation restores the stable Development scene at overview; exhibit focus is transient. Within the studio, Escape first returns focus to Development overview, then Hub; Reset remains Hub overview. Back to Central Hub is always explicit. Native case-study links and explanation remain present without WebGL/JavaScript and on mobile. Eligibility loss falls back to the technical bay with no authentic marker/action. Console/globe remain inert; scene choices create no history entries.
