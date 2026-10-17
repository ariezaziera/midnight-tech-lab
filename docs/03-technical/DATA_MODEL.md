# Data Model — MVP

Use typed static records for `Project`, `Service`, `NavigationItem`, `SceneModule`, `Hotspot` and `CameraPreset`.

`Project`: slug, title, summary, category tags, role, sections, technologies, media, verified links, featured flag, publication status.

`SceneModule`: id, title, scene node ID, associated route, camera preset, interaction status.

No relational database or CMS in MVP. Add only after content editing requirements justify it.

## M4 local model implementation

`src/content/model.ts` defines Project/CaseStudy/Category/ProfileSection/Service/ContactMethod, media provenance and explicit approvals. `src/content/editorial.ts` contains only the reserved template plus missing-input profile sections. `src/lib/content.ts` validates and selects records. Empty arrays represent genuinely absent approved services, contact links and media; no plausible service claims or project narratives are synthesized.
