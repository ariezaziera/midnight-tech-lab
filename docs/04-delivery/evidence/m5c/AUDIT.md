# M5-C audit before application edits

Base: accepted M5-B, commit 3addbfc. Required project, experience, design, architecture, delivery and M5-A/B reports reviewed.

- Existing scene: 30 initial draws, batched per target/material; demand rendering; static CSS atmosphere; four lights, no shadows or effects. Historical figures require fresh validation.
- Shared shapes/materials and merged geometries have explicit disposal; selection geometry is released on change. No leak is presumed from source alone.
- Camera requests are typed and bounded; reduced motion independent; no camera rewrite justified.
- Unsupported WebGL probe, renderer error boundary, download watchdog, context-loss handler and retry are separate paths. Mobile/no-JS HTML remains independent.
- DPR currently follows device DPR bounded 1–1.5. This is the measurable pixel-work lever; antialiasing requires context creation and should remain fixed.
- Fresh baseline uses production build, Chromium, 1440×900, device scale factor 2, three fresh contexts. Baseline application source is unchanged. Capture utility alone adds raster dimensions and accepts m5c.
- Firefox and WebKit executable paths checked: neither binary installed. No browser downloads planned.
- Owner's older-laptop feedback is qualitative; physical GPU, FPS, power and broad compatibility remain unmeasured.

Implementation scope after baseline: typed DPR-only quality policy, native desktop control, demand-frame diagnostics, focused regression tests and evidence/documentation. No dependency, geometry, lighting, camera, route or content changes intended.
