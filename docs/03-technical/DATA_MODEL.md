# Data Model — MVP

Use typed static records for `Project`, `Service`, `NavigationItem`, `SceneModule`, `Hotspot` and `CameraPreset`.

`Project`: slug, title, summary, category tags, role, sections, technologies, media, verified links, featured flag, publication status.

`SceneModule`: id, title, scene node ID, associated route, camera preset, interaction status.

No relational database or CMS in MVP. Add only after content editing requirements justify it.
