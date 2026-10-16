# Environment and Tooling

- Use a supported Node.js LTS version meeting the installed Next.js minimum; verify via `node -v` and framework documentation at setup time.
- Package manager: npm initially; commit lockfile.
- Local: `npm install`, `npm run dev`; CI: lint, typecheck, tests, build.
- `.env.example` documents required variables without secrets.
- No environment variables needed for initial static/3D MVP.
- Hosting proposal: Vercel; configure domain and contact integration only after approval.
