# M1 — Application Foundation

Date: 2026-10-16 (Asia/Kuala_Lumpur). Status: implementation and validation complete; owner review pending. **M2 has not started.**

## Delivered

- Next.js App Router, TypeScript strict and Tailwind CSS foundation in the existing independent repository.
- Home, Projects, Project Detail, About, Services and Contact shells; global and invalid-project 404 handling.
- Reusable `PageIntro`, `Placeholder`, `ActionLink` and global navigation. Content pages remain Server Components; navigation is a narrow prerendered client boundary for active-route state.
- Responsive layouts, visible focus, skip link, reduced-motion CSS, semantic landmarks and always-visible mobile navigation. Navigation works without JavaScript.
- `/projects/placeholder` is explicitly a local layout fixture, not a real project. No fabricated biography, images, services, results or URLs. Unknown project slugs return HTTP 404.
- Contact is an incomplete informational shell: no form, submit action, success state, email or phone link.
- Preview labels and noindex/nofollow metadata. These are not access controls; deployment remains prohibited.
- Exact dependency pins and npm lockfile. No Three.js, R3F, Drei, animation library, backend or database.

## Files and implementation choices

Root package/config files define development, lint, type generation, strict checking, production build and Playwright commands. `src/app/` contains the six route shells, layout, global styles and not-found page. `src/components/` contains navigation and shared UI. `src/lib/navigation.ts` and `src/types/navigation.ts` hold the small typed navigation model. `tests/foundation.spec.ts` contains 17 browser checks. `docs/04-delivery/evidence/m1/` contains twelve full-page PNGs.

Updated README, TASKS, CHANGELOG, DECISIONS, DESIGN_SYSTEM and ARCHITECTURE. The M0 report remains a historical audit; its pending gate is superseded by the owner decision recorded in DECISIONS.

Provisional decisions within the authorized shell scope: system Arial/Helvetica fonts avoid downloading unapproved font assets; flat violet actions and opaque surfaces prioritize legibility; mobile navigation wraps rather than relying on a script-driven menu. No new service routes or actual project records were invented. Final typography, gradients, layout measurements and art remain open.

## Environment and dependency validation

Windows; Node **22.14.0**, npm **11.16.0**. Exact installed versions:

- Next.js / eslint-config-next **16.4.2**; React / React DOM **19.3.1**.
- TypeScript **5.9.3**; Tailwind / Tailwind PostCSS **4.3.3**; PostCSS **8.5.30**.
- Playwright **1.64.1**; ESLint **9.39.5**. Matching Node/React type packages are pinned in package.json.

`npm ci` completed with exit 0, installing 372 packages. `npm ls --depth=0` completed with exit 0. No invalid top-level dependencies remain. Dependency installation and tests must run sequentially on Windows to avoid locking native binaries.

### Known tooling limitation

`npm audit --omit=dev`: **0 vulnerabilities**, exit 0. Full `npm audit --json`: **5 high findings**, exit 1. All five are the same development-only chain: eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces. Registry inspection found braces 3.0.3 is the latest available and is covered by [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). No unverified override or forced framework downgrade was applied. Do not claim a clean full dependency audit.

ESLint 9 is deprecated/unsupported upstream but is the compatible major for the current Next config's import, React and JSX accessibility plugins. ESLint 10 was evaluated and rejected because those plugins declare incompatible peers. Retain the tracked maintenance task to upgrade when compatible releases are available. npm also reported an unapproved `unrs-resolver` install script; no blanket script approval was granted, and the validation commands below passed without it.

## Final validation results

- `npm run lint`: **PASS**, exit 0, zero warnings.
- `npm run typecheck`: **PASS**, exit 0 (`next typegen` and `tsc --noEmit`).
- `npm run build`: **PASS**, exit 0; six requested route patterns generated, including `/projects/placeholder`, with not-found handling.
- `npm test`: **PASS**, exit 0, **17 passed in 26.7 seconds**, Chromium, two workers against the production build. The final run required execution permissions permitting Playwright to terminate its own Windows server. It shut down successfully.
- Direct navigation for every shell with JavaScript disabled: **PASS**, HTTP 200 and working HTML navigation.
- `/projects/not-a-project` and `/missing-page`: **PASS**, HTTP 404 and working recovery link.
- Project navigation/back, current-route marker and absence of contact controls: **PASS**.
- Keyboard skip link, visible focus and focus transfer to main: **PASS**.
- All six shells at widths **320, 390, 768, 1024, 1440**: **PASS**, no horizontal overflow; visible navigation with at least 44px-high targets.
- Reduced-motion emulation and 200% root text enlargement at 390px: **PASS**. Text enlargement is not a substitute for testing browser zoom on physical devices.
- Screenshot capture: **PASS**, all six shells at desktop **1440×900** and mobile **390×844**, full-page captures (image heights may exceed viewport height).

Earlier failures were corrected or rerun: anonymous PostCSS export lint warning (fixed); ESLint 10 peer mismatch (reverted); a test/install overlap caused a Windows file lock and missing test dependency (server stopped, clean install passed); a sandboxed test run passed assertions but hung at process teardown (interrupted, final permitted run exited 0). These earlier attempts are not counted as successful commands.

## Visual review

Representative captures inspected: [desktop Home](evidence/m1/desktop-home.png), [mobile Home](evidence/m1/mobile-home.png), [mobile case-study shell](evidence/m1/mobile-projects-placeholder.png), [desktop Contact](evidence/m1/desktop-contact.png). Text is legible, navigation wraps, placeholders are labeled and content does not overlap in those captures. Twelve captured route images are retained for owner review.

Compared with the M0-reviewed concept boards, this is deliberately the authorized HTML foundation: no cinematic imagery, portrait, scene, glow effects, illustrated project cards or fabricated contact details. Colors are provisional, system typography differs from candidate fonts, and mobile navigation is a visible link list. No approved screen crops exist, so this is not a fidelity comparison or final visual sign-off.

## Remaining gates and limits

- Owner review of M1 is pending. No publication or M2 implementation was performed.
- Missing authentic portrait, biography, CV, project content/media, confirmed services and verified contact destination remain tracked. Final references/tokens, hotspots, intro timing and release scope remain open.
- Browser testing is Chromium on Windows with emulated viewports; Safari/Firefox, physical mobile hardware, screen reader review and full WCAG audit were not performed. No performance or accessibility-conformance claim is made.
- Final visual approval and production asset licensing remain later gates. The placeholder detail route must not be treated as publishable portfolio work.
- All owned test servers were stopped after validation. Local startup remains `npm run dev`.

**Next action: owner reviews M1. Do not proceed to M2 without explicit approval.**
