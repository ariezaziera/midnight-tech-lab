# Interaction Specification — M3

## Approved MVP targets

Explicit typed metadata in src/lib/scene/interaction-config.ts governs behavior. Mesh names never select routes or camera actions.

1. creator / Creator ID: focus neutral frame; normal **About Arieza** link to /about.
2. projects / Project Display: focus placeholder display; normal **Browse projects** link to /projects. No featured case study is invented.
3. workstation / Workstation: focus desk/monitors; return through Back to overview, Reset or Escape. No extra content route is implied.

Navigation Console, Holographic Globe, Cozy Corner and satellite islands are non-interactive. The old concept mapping to module selectors/maps is deferred, not implemented.

## Pointer, keyboard and touch

- Clicking actual target geometry selects its typed ID. A root scene handler examines metadata on the hit object/ancestors and stops farther intersections; inert geometry cannot activate a target behind it.
- Visible HTML buttons offer all three focus actions on desktop, using native Enter/Space behavior, aria-pressed, selected text and visible focus styling. Pointer selection focuses the equivalent button without forcing page scroll.
- Amber wireframe bounds mark the selected geometry. Hover is not required for discovery or action access.
- About and Projects links remain available during camera travel, loading, WebGL failure and on mobile/no-JavaScript views. Buttons/links meet the existing 44px-or-larger touch-height pattern.
- Back requests overview and restores the originating focus control. Reset clears restoration state and requests overview. Escape does the same as Back while focus is in the studio region.
- Repeated/rapid selections replace the destination. Controls remain available during travel so a visitor can change or cancel a request.

## HTML selection panel

The selection explanation is an ordinary non-modal section beneath the scene. It has a named heading, selected state and a polite, selection-only live announcement. It neither traps focus nor locks page scrolling. About/Projects remain ordinary Next.js links with working HTML hrefs.

No dialog was needed for this M3 slice. If future milestones introduce dialogs, they must add title/close/Escape/focus trapping and restoration before use; those requirements are not a claim that a modal currently exists.

## Navigation and fallback

Editorial pages include a normal Return to studio link. It restores the stable camera ID and focuses the studio heading. Browser Back retains URL semantics; camera selection does not add history entries. Reset returns future restoration to overview. Mobile retains the descriptive 2D studio and direct HTML page links, with a same-page workstation-overview anchor; camera controls are not presented there.

WebGL probe, initialization error boundary, chunk rejection, 15-second first-draw watchdog, context-loss listener and fresh-renderer retry remain in place. A retry preserves the selected view. Reduced motion removes travel rather than blocking content.
