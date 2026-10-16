# Design System — Candidate Tokens (NOT FINAL APPROVAL)

## Art direction
Cinematic realism: detailed physically believable materials, warm practical lighting and violet-blue nebula rim light. Prioritize legibility over glow. Avoid game HUD overload and excessive glass panels.

## Candidate palette (to be calibrated against references)
| Token | Candidate | Role |
|---|---|---|
| `--space-950` | `#080B1C` | Background |
| `--space-900` | `#10132B` | Surface |
| `--purple-500` | `#8B5CF6` | Primary action |
| `--violet-300` | `#C4B5FD` | Highlight |
| `--pink-400` | `#F472B6` | Accent |
| `--cyan-400` | `#22D3EE` | Secondary glow |
| `--amber-400` | `#FBBF24` | Warm lamp accent |
| `--text-primary` | `#F8FAFC` | Text |
| `--text-muted` | `#C9C9DC` | Secondary text |

Tokens are proposals, **not extracted** from generated concept images. Do not treat them as pixel-accurate reference values.

## Typography
Candidate heading: Space Grotesk. Body: Inter. Use responsive type scale and accessible line heights; avoid tiny sci-fi labels.

## Component rules
- One strong primary CTA per major panel.
- Primary button: violet-to-pink gradient with clear focus ring.
- Secondary button: outlined/tonal; not glow-only.
- Cards: dark opaque surfaces with subtle translucent accents; sufficient contrast.
- Navigation: conventional visible labels; do not rely on icon-only discovery.
- States: default, hover, focus-visible, active, disabled, loading, error.
- Animations: ambient and restrained; honor `prefers-reduced-motion`.

## Acceptance
Do not finalize tokens until desktop and mobile screenshots are reviewed side-by-side with approved cropped visual references.
