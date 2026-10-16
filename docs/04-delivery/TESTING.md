# Testing Strategy

## Automated
- Lint and TypeScript typecheck.
- Production build smoke test.
- Unit tests for project filtering, route maps, camera state transitions and data validation.
- End-to-end tests for direct navigation, case-study flow, modal focus/escape, fallback and contact link.

## Manual
- Desktop: Chrome/Firefox/Safari where available; mobile Android/iOS representative devices.
- Keyboard-only and screen-reader smoke tests.
- Reduced-motion, slow network, WebGL-disabled/error, low-end device.
- Camera clipping, focus restoration, pointer/touch hotspot hitboxes.
- Visual comparison against approved reference crops.

## Reporting
Record command, environment, outcome, screenshot/video evidence, failures and known limitations. Never claim unexecuted tests passed.
