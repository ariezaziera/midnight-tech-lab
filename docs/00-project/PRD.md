# Product Requirements Document (PRD) — v1

## Goals
1. Showcase authentic projects and case studies for recruiting and freelance inquiries.
2. Provide a cinematic-realism, explorable 3D Central Hub and expandable thematic islands.
3. Enable fast direct access to projects, services, about and contact without requiring 3D.
4. Support desktop and mobile with accessible navigation and graceful fallback.

## Scope: MVP
- Responsive site shell and global nav: Home, Projects, Services, About, Contact.
- Central Hub 3D blockout with overview and workstation camera presets.
- Functional Creator ID and featured-project hotspots, keyboard-accessible alternatives.
- Projects library, individual case-study route, About, Services, Contact UI.
- Content modeled as typed local files; placeholder entries labeled until verified.
- Loading/error states, reduced motion, WebGL fallback, basic SEO and metadata.

## Post-MVP
- Cinematic GLB art pass; full Development Lab, Design Studio, Media Lab, Services Terminal and Personal Corner.
- Holographic globe/module map, ambient easter eggs, optional expanded 3D interactions.
- Contact submission backend after service/provider, abuse protection and privacy decisions.

## Non-goals for MVP
- Accounts, logins, payments, database, analytics tracking without consent decisions, full free-flight camera, VR, multiplayer.

## Functional requirements
- FR-01: Main nav works even if 3D fails to load.
- FR-02: Users can select an island/hotspot via pointer and equivalent accessible HTML controls.
- FR-03: Camera focus transitions are bounded and can be reset; reduced motion removes nonessential travel.
- FR-04: Projects are filterable by relevant categories; filters do not hide cross-disciplinary projects incorrectly.
- FR-05: Each project has title, role, overview, technologies, process and links only where verified.
- FR-06: Services explain offering, scope, process and inquiry path without implying a team.
- FR-07: Contact options work; form remains disabled/demo until secure delivery is implemented.
- FR-08: Responsive layouts keep content legible and actions tappable.

## Success criteria
- Recruiter reaches a case study and contact within 2–3 direct navigation actions.
- No critical content exclusively inside WebGL.
- Every approved acceptance test passes on representative desktop/mobile sizes.
- Performance measured on real target hardware before setting production claims.

## Dependencies and unknowns
Actual portrait, approved case-study content, project imagery, verified social/contact links, licensed models/textures, exact design tokens, camera coordinates and hosting form provider.
