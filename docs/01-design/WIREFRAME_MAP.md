# Visual Reference Map — Pack v2

**Status:** Source concept boards are bundled and path-verified. These are AI-generated visual explorations, NOT approved pixel-perfect designs, verified layouts, editable scene assets, or reliable sources for exact written text. Human review required before final visual sign-off.

## Source board inventory

| Reference path (relative to docs/05-references/) | Purpose | SHA-256 prefix |
|---|---|---|
| `wireframes/phase-3-pages.png` | Phase 3 multi-page layout concept | `7f46962850c1` |
| `wireframes/phase-4-interactions.png` | Phase 4 camera and interaction concept | `cd11570224a8` |
| `visual-concepts/phase-5-design-system.png` | Phase 5 design system concept | `989c1fb86831` |
| `visual-concepts/phase-7-assets.png` | Phase 7 Central Hub asset concept | `c455ffda4754` |
| `wireframes/phase-8-production.png` | Phase 8 Central Hub technical illustration | `0f8d9ba20bfa` |
| `wireframes/earlier-wireframe-overview.png` | Earlier portfolio overview board | `3e4a6ab7957e` |
| `visual-concepts/earlier-portrait-placement.png` | Earlier portrait placement concept | `b36773eca88a` |
| `wireframes/earlier-central-hub.png` | Earlier Central Hub detail board | `a3c7c8cc3eac` |
| `wireframes/earlier-module-layouts.png` | Earlier module concepts | `369c42ba951d` |
| `wireframes/earlier-module-experience.png` | Earlier experience concept | `0c1ad344a33b` |

## Reference precedence and fidelity
1. Approved written product requirements and explicit user decisions define behavior.
2. Screen specifications and candidate design tokens define implementation defaults until reviewed.
3. Bundled visual boards define composition, mood and relationships only.
4. Do not read small labels, dimensions, statistics, or face identity in generated boards as ground truth.
5. When sources conflict, log the conflict in `docs/00-project/DECISIONS.md` and request approval; do not silently invent.
6. Never claim visual parity without screenshots at matching viewports and human approval.

## Screens and visual references
| Screen ID | Primary reference | Key implementation behavior |
|---|---|---|
| HOME-001 | `wireframes/earlier-central-hub.png` | Central Hub, creator identity, projects, navigation |
| WORLD-001 | `wireframes/earlier-wireframe-overview.png` | Islands overview, links between modules |
| MODULE-DEV-001 | `wireframes/earlier-module-layouts.png` | Development workstation and featured builds |
| MODULE-DESIGN-001 | `wireframes/earlier-module-layouts.png` | Design studio and creative projects |
| MODULE-MEDIA-001 | `wireframes/earlier-module-experience.png` | Media / motion / AR exhibits |
| PROJECTS-001 | `wireframes/phase-3-pages.png` | Filterable readable 2D project library |
| CASE-001 | `wireframes/phase-3-pages.png` | Full case study with contribution and media |
| ABOUT-001 | `wireframes/phase-3-pages.png` | Portrait, background, skills and CV |
| SERVICES-001 | `wireframes/phase-3-pages.png` | Solo services, workflow and inquiry |
| CONTACT-001 | `wireframes/phase-3-pages.png` | Contact methods and optional form |
| MOBILE-001 | `wireframes/phase-3-pages.png` | Mobile-first readable fallback |
| CAMERA-001 | `wireframes/phase-4-interactions.png` | Guided transitions and return state |
| HUB-ASSETS-001 | `visual-concepts/phase-7-assets.png` | Workstation objects and hotspots |
| HUB-SPACE-001 | `wireframes/phase-8-production.png` | Approximate platform/camera layout only |

## Unresolved fidelity dependencies
- Need separate user-approved crops for each screen at target viewport dimensions.
- Need real user portrait(s) and permission for use.
- Need original or licensed 3D models, textures and fonts.
- Need approved final color and typography tokens; current values are candidate values.
- Need measured camera presets and coordinates after actual scene blockout.
