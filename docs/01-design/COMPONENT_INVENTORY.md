# UI Component Inventory (Proposed)

| Component | Pages | States |
|---|---|---|
| GlobalNav | All | desktop, mobile open/closed, focus |
| StudioBreadcrumb | Project, case study | normal, back-to-world |
| HeroIdentity | Home, About | loading, portrait fallback |
| CreatorIDPanel | Home/Hub | preview, expanded, closed |
| ModuleHotspot | 3D scene | idle, hovered, focused, activated, disabled |
| CameraControls | 3D scene | overview, focus, return, reduced-motion |
| ProjectFilter | Projects | all, category, no-results |
| ProjectCard | Projects | default, hover, focus, placeholder media |
| ProjectPreview | 3D / Projects | open, closed, loading |
| CaseStudySections | Case Study | screenshots, contribution, outcomes |
| ServiceCard | Services | default, focus, CTA |
| ContactPanel | Contact | ready, submitting, success, error (if form built) |
| SceneFallback | Home | unsupported WebGL, loading, low performance |

Every interactive component must have visible labels, semantic HTML counterpart where needed, keyboard operation and documented empty/error states.
