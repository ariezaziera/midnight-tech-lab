# M4 — Editorial Portfolio & Content Integration

Date: 2026-10-17 (Asia/Kuala_Lumpur). Base: accepted M3 commit `f932c61`. **Historical M4 implementation report. Owner accepted M4 and authorized M5-A procedural refinement on 2026-10-17. No content publication approval is implied.**

## Delivered work

The existing HTML shells now use a typed local editorial model, reusable Projects library/cards and case-study template, structured About sections, modular Services presentation and verified-method Contact rendering. Home explains the two direct editorial journeys. Existing global routes/navigation and M3 scene, camera, hotspots, mobile behavior and recovery remain intact.

No authentic project has documented publication approval. The portfolio therefore shows an honest empty state, with the existing `/projects/placeholder` demonstration visibly separated from genuine work. About shows six missing-input draft sections. Services has no invented offering, and Contact remains incomplete with no sending action, form, endpoint or simulated success. Availability is not asserted.

No dependency, package lockfile, 3D implementation, production asset or hosting change was needed. The existing provisional color/system-font treatment is retained. M3 functional acceptance is recorded while final camera framing, selection visuals and cinematic styling remain open for later review.

## Editorial content schema

- `EditorialRecord`: `published | draft | placeholder`, with optional approval metadata. Published status requires a source reference, owner verification and explicit public-presentation approval.
- `Project`: stable slug/title/summary, category references, role, contribution, tools, optional project type, structured case study, media, verified links and related project slugs.
- `CaseStudy`: overview, context/problem, contribution, process/decisions, solution and individually verified outcomes. Missing approved-project sections are omitted. Missing local-template sections are labeled incomplete.
- `Media`: local source, actual width/height, descriptive alt text, rights, provenance and approval. The gallery uses Next Image. There are no configured media assets yet.
- `Category`: stable ID/label. Filter options derive only from categories used by published projects, including multiple categories on a project.
- `ProfileSection`: status, title, approved text when available, and a neutral missing-input message. Draft prose is withheld.
- `Service`: status, title/description, deliverables, suitable use case, optional process and related project slugs. Only approved published offerings render.
- `ContactMethod` and optional resume: approved destination/link records. No unverified destination is rendered.

Types live in `src/content/model.ts`, data in `src/content/editorial.ts`, and validation/selectors in `src/lib/content.ts`. No CMS, database, authentication or content API was added. Editorial pages and presentation remain Server Components.

Validation runs when the local dataset is imported. It rejects duplicate IDs, invalid status, invalid project identity, published records without approval, published projects without overview/role, unknown categories, missing/self related references, unverified outcomes, incomplete media metadata, unsafe/unverified links and invalid service references. Failures surface during build/render rather than silently publishing incomplete records. Approval fields record a human decision; they cannot independently prove that a source or permission is authentic. Actual future files and rights must still be reviewed against those records before use.

## Publication and navigation rules

Only approved published projects enter portfolio cards, category filters and related-work links. Both static route generation and runtime selection exclude drafts and other placeholders. The sole explicit exception is the pre-existing reserved `/projects/placeholder`, always labeled as a local layout preview and not real work. Unknown/unapproved slugs return 404. Test-only fixture slugs also return 404.

Project filters are normal URL links using `?category=...`, with a named navigation landmark and `aria-current`. They work without JavaScript. Unknown categories yield an empty state and Clear filters action; repeated category parameters use the unfiltered view. Reading async search parameters makes `/projects` request-rendered; other editorial pages and allowed detail routes retain static generation. The current dataset has no published tags, so All projects is the only portfolio filter. The template's Layout preview tag is not presented as a genuine portfolio category.

Every route retains the prototype noindex/nofollow policy. Detail metadata explicitly retains this policy and labels the local placeholder in its title. No fictional structured data is emitted. These metadata directives are not access control or permission to deploy.

Creator ID still offers `/about`; Project Display still offers `/projects`. About, Services, Projects and the template provide normal page links toward Contact. Camera movement is never required for editorial navigation. No M3 implementation code changed.

## Verified inventory and missing owner inputs

Approved repository identity/context: Arieza, Midnight Tech Lab, personal portfolio and independent solo creative-studio concept. No further factual biography or offering is inferred from those statements.

Current application inventory:

- Zero published projects or genuine case studies; one local placeholder template.
- Zero approved project media, external project links or verified outcomes.
- Six generic profile draft sections with missing-input messages; no biography, qualifications, employment, skills or experience claims.
- Zero confirmed service records, contact destinations or resume link.
- Existing procedural Central Hub and concept references remain prototype material, not authentic portfolio media.

Owner inputs still needed: explicit project publication permission; approved titles, summaries, role/contribution, tools/categories, process, solution and any verifiable outcomes; approved media files with dimensions, alt text, rights and provenance; verified demo/code links; biography, background, skills, experience, interests and working approach; actual portrait and permission; approved CV; actual service scope/deliverables/process; verified contact destination and availability. Candidate names in CONTENT_GUIDELINES are not imported or treated as publication consent. Confidential employer information is not added.

## Validation outcomes

Final results, all executed:

- `npm ci`: **PASS, exit 0** — 427 packages installed, 428 audited, reported duration 7m. The initial restricted attempt stalled and was interrupted; the completed clean installation used registry access. Existing five high development-only findings and ESLint support notice remain tracked. npm also reported the pending `unrs-resolver@1.12.2` install script; no blanket script approval was given.
- `npm run lint`: **PASS, exit 0**, zero warnings in the final rerun.
- `npm run typecheck`: **PASS, exit 0**, route generation plus strict TypeScript.
- `npm run build`: **PASS, exit 0**, final production build generates Home, About, Services, Contact and the reserved detail page; Projects renders per request for URL filtering.
- `npm test`: **PASS, exit 0 — 47 passed in 1.9m**, two workers. This includes all 40 M1–M3 checks and seven M4 checks.
- `npm audit --omit=dev`: **PASS, exit 0 — zero production vulnerabilities**.

The first regression attempt observed 45 passing checks and two failures before its stalled teardown was interrupted: a remote assertion missed the brief moving-camera interval, and a WebGL fallback assertion exceeded its five-second window. The temporal check now observes/intercepts an actual moving frame within the browser; a separate retained test uses real keyboard Escape. Fallback initialization has a 15-second assertion budget. No camera/fallback application changes were required. An earlier lint run caught a misplaced image-rule suppression; the final implementation instead uses Next Image with required media dimensions. The final build and full suite ran after that change.

M4 checks exercise publication/field/reference rejection, populated template/category selection, empty URL-filter recovery, draft and candidate/test-slug restrictions, noindex metadata, About-to-Contact, Home-to-Services-to-Projects-to-Contact, keyboard focus/filter navigation, mobile overflow and JavaScript-disabled paths. The recruiter journey traverses the explicitly labeled local template; no genuine case study exists yet. The client journey reaches the honest empty library and incomplete Contact page without WebGL, and also works on mobile with JavaScript disabled.

Populated published-card/template branches are tested by rendering synthetic contract data into a browser page, outside application routes. These fixtures are explicitly test-only and are not genuine owner-verified projects or evidence of content approval. With no approved project available, a positive category-filter journey against a real published project cannot be demonstrated yet. The real routes cover empty/filter recovery and the reserved template. Media/CV/external inquiry behavior cannot be validated against authentic assets/destinations until supplied.

Retained M1–M3 checks include direct/404 routing, mobile overflow at 320/390/768/1024/1440px, 200% text enlargement, pointer/keyboard focus journeys, rapid repeated camera selections, Back/Reset/Escape, reduced motion, stable route restoration, WebGL unsupported/initialization/download/context-loss recovery and idle rendering. M3 camera coordinates and behavior are unchanged.

## Accessibility and visual observations

Semantic headings, sections and ordinary text links form the editorial hierarchy. Filters use native links instead of a custom keyboard widget. Status is written in text rather than color alone. Existing skip link, visible focus, minimum control sizing, reduced-motion rules and wrapping global navigation remain. No new animation or hover-only content was added.

Desktop Projects/About and mobile template/Services evidence were inspected along with Home and Contact. Layouts retain readable spacing and content wraps without tested horizontal overflow. The phase-3 multi-page concept board was reviewed for composition only. Its generated portrait, project images, biography/statistics, offerings and form/contact claims are deliberately absent. Final per-screen references/tokens remain unapproved; there is no pixel-parity claim.

Evidence uses 1440×900 desktop and 390×844 mobile viewports, with full-page editorial captures. Desktop Home/scene views use viewport captures to avoid stale WebGL painting in full-page screenshots. Physical devices, Safari/Firefox and screen readers were not tested; browser checks do not establish WCAG conformance.

## Evidence

`docs/04-delivery/evidence/m4/` contains **27 PNGs and three measurement JSON files**, with earlier milestone evidence preserved.

- Home: [desktop](evidence/m4/desktop-home.png), [mobile](evidence/m4/mobile-home.png).
- Projects and honest empty state: [desktop](evidence/m4/desktop-projects.png), [mobile](evidence/m4/mobile-projects.png).
- Local case-study template: [desktop](evidence/m4/desktop-projects-placeholder.png), [mobile](evidence/m4/mobile-projects-placeholder.png).
- About and labeled draft sections: [desktop](evidence/m4/desktop-about.png), [mobile](evidence/m4/mobile-about.png).
- Services: [desktop](evidence/m4/desktop-services.png), [mobile](evidence/m4/mobile-services.png).
- Contact: [desktop](evidence/m4/desktop-contact.png), [mobile](evidence/m4/mobile-contact.png).
- Filter empty/recovery state: [desktop](evidence/m4/desktop-empty-filter.png), [mobile](evidence/m4/mobile-empty-filter.png).
- Retained studio: [overview](evidence/m4/desktop-rendered.png), [Creator ID](evidence/m4/desktop-selected-creator.png), [Project Display](evidence/m4/desktop-selected-projects.png), [Workstation](evidence/m4/desktop-selected-workstation.png), [WebGL fallback](evidence/m4/desktop-unsupported-webgl.png).

Regression measurement environment: Windows, Node 22.14.0/npm 11.16.0, Chromium 156.0.8078.4, local production server, no network throttling; masked renderer WebKit WebGL, physical GPU unidentified. Final initial sample: 903ms loader-to-draw, 49 draw calls, 866 triangles, 49 geometries, one renderer-reported texture, two settled frames and 390,239 bytes of total JavaScript transfers. Camera idle checks stop accumulating draws. These are local observations, not a performance budget, FPS or GPU-compatibility claim. Raw files: `initial-scene-measurements.json`, `camera-measurements-1024.json`, `camera-measurements-1440.json`.

## Changed files

- New: `src/content/model.ts`, `src/content/editorial.ts`, `src/lib/content.ts`, `src/components/editorial/portfolio.tsx`, `tests/editorial.spec.ts` and this report/evidence directory.
- Editorial routes/styles: `src/app/page.tsx`, `projects/page.tsx`, `projects/[slug]/page.tsx`, `about/page.tsx`, `services/page.tsx`, `contact/page.tsx`, `globals.css`.
- Tests: `tests/foundation.spec.ts` scopes main-navigation selectors to distinguish filters; `tests/interactions.spec.ts` hardens two timing checks; all three retained suites write new evidence to M4. No earlier screenshot is overwritten.
- Documentation: README, CHANGELOG, DECISIONS, CONTENT_GUIDELINES, ACCESSIBILITY, APP_FLOW, CAMERA_SYSTEM, ARCHITECTURE, DATA_MODEL, ACCEPTANCE_CRITERIA, IMPLEMENTATION_PLAN, TASKS and the historical M3 report acceptance note.
- `.gitignore`: excludes Chromium's generated root debug log. No package or lockfile changes.

## Remaining gates

Implementation is complete; authentic editorial content remains unverified and unpublished. Recruiter/client navigation is reviewable, but a real case-study review and an actual contact inquiry remain blocked by missing approved content/destination. Final visual/camera approval, production assets/licensing, actual media review, device/assistive-technology coverage and tracked dependency maintenance remain open. The local preview is restored for review. M4 is committed on the existing authorized branch; no push or deployment is included in this milestone request.

**Request owner review of M4 implementation and evidence. Stop here. M5/M6 require explicit authorization.**
