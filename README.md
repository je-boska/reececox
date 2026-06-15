# Reece Cox

Portfolio site for the artist Reece Cox. Minimal, fast, reliable — black text on
white, Helvetica, a persistent project navigation beside an independently
scrolling project viewer.

- **Frontend:** Next.js (App Router) + React
- **CMS:** Sanity (Studio embedded at `/studio`)
- **Deploy:** Vercel

## Quick start

```bash
pnpm install
cp .env.local.example .env.local   # fill in your Sanity project values
pnpm dev                           # http://localhost:3000
```

The site runs even before Sanity is configured (it shows a setup notice).

See **[AGENTS.md](./AGENTS.md)** for the full guide: content model, environment
variables, and Sanity + Vercel setup steps.
