# Code Style

- TypeScript strict; no casual `any` or suppressed type errors.
- Prefer Server Components for content pages; mark only interactive boundaries `use client`.
- Tailwind utility classes and shared design tokens; no sprawling inline CSS for site styling.
- Small cohesive components, explicit props and typed content models.
- Centralize camera presets, scene IDs and route maps in config files.
- Accessible semantic HTML for controls; no clickable non-semantic divs.
- Separate 3D render logic from navigation/business logic.
- Follow existing formatter/linter configuration; add tests for pure logic and key journeys.
