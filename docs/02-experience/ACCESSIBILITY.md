# Accessibility Baseline

- WCAG 2.2 AA is the target for normal HTML content and controls.
- Semantic headings, landmarks, labels, meaningful alt text, visible keyboard focus.
- Full navigation and case studies usable with WebGL off.
- Hotspot alternatives in an HTML module list; do not rely solely on raycasting.
- Dialog focus management and Escape handling.
- Honor `prefers-reduced-motion`; provide skip intro and pause nonessential animation.
- Maintain readable contrast despite glass effects and glow; don't use color alone for states.
- Test keyboard-only, touch, zoom, screen-reader basic flows.

## M3 implemented behavior

Three desktop focus buttons use semantic buttons, native Enter/Space, `aria-pressed` and textual selection indicators. Normal About/Projects links remain available without WebGL/JavaScript and on touch mobile. The scene selection panel is non-modal, with a heading and polite announcement only when the selection changes; no focus trap or forced travel is introduced.

Pointer selection focuses the matching HTML control without scrolling. Keyboard selection retains its initiator. Back/Escape/Reset restore the last selected control; explicit Return to studio links focus the studio heading. Escape is scoped to focus inside the studio region. Reduced motion snaps directly, including preference changes during travel. Live scene transitions never block direct page navigation.

Chromium keyboard/touch-emulation tests are implementation evidence, not a screen-reader or WCAG conformance claim. Assistive-technology and physical-device review remain outstanding.

## M4 editorial accessibility

Editorial pages remain Server Components. Project category links use a named navigation landmark and aria-current, preserving native keyboard/history behavior without client scripting. Cards have descriptive text links; missing content is identified in text, not color alone. No hover-only content, custom keyboard widget or new animation is introduced. Existing focus, reduced-motion and wrapping navigation styles remain. Browser tests are observations, not WCAG conformance or assistive-technology certification.

## M5-A selections

Small amber corner marks on the physical display frames replace the large wireframe selection volume. They do not pulse or animate and are excluded from scene hit tests. The existing pressed buttons, written Selected state, focus behavior, live status and always-available route links remain the primary accessible feedback. No new keyboard behavior or mandatory camera movement is introduced.
