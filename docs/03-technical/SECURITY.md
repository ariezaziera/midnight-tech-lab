# Security Baseline

- No authentication or database for MVP, reducing attack surface.
- Never store keys in client bundles or `NEXT_PUBLIC_*`.
- Validate/sanitize any future form payload on server; implement rate limits, bot mitigation, abuse monitoring and privacy notice.
- Avoid unsafe HTML injection; do not render untrusted markdown as raw HTML.
- Check dependencies and asset licensing; no untrusted remote script embeds.
- Add security headers appropriate to hosting and asset requirements; test CSP compatibility with Three.js.
- Keep employer-confidential material out of published portfolio.
