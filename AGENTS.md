# AGENTS.md — Reece Cox portfolio

Guidance for humans and coding agents working in this repo. Read this first.

## What this is

A minimal, reliable artist portfolio — "a Toyota of websites." Black text on
white, Helvetica, a persistent left **project navigation** and an
independently-scrolling **project viewer**. Content is managed in **Sanity**;
the frontend is **Next.js (App Router)**.

Reference for the layout/spirit: <https://www.lauralanger.com/> (we use black
instead of blue, Helvetica, more deliberate responsiveness, and independently
scrollable nav + viewer instead of whole-page scroll).

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **Sanity v6** Studio, embedded at `/studio`
- **next-sanity v13** — `defineLive` (Live Content API), Presentation/visual
  editing, embedded Studio, draft mode
- **@sanity/orderable-document-list** — drag-to-order Projects + Categories
  (writes an `orderRank` field; queries order by it)
- Plain CSS Modules + a few CSS variables (no UI framework). Font: **Hanken
  Grotesk**, self-hosted via `next/font` (Helvetica-alike with a true Medium);
  Helvetica / Arial remain as fallbacks in `--font`. Swap the font in
  `src/app/layout.tsx`.
- Package manager: **pnpm**. Deploy target: **Vercel** (free hobby tier).

## Project layout

```
sanity.config.ts            Studio config (schema, structure, presentation)
sanity.cli.ts               Config for the standalone `sanity` CLI
next.config.ts
src/
  app/
    layout.tsx              Root: <html>, metadata, <SanityLive>, draft overlay
    (site)/                 The public portfolio (wrapped in the two-pane shell)
      layout.tsx            Fetches nav + settings, renders <SiteShell>
      page.tsx              Home — quiet default viewer (artist name)
      projects/[slug]/      Project viewer
      info/                 About / bio (information singleton)
      cv/                   CV (grouped year + entry lists)
      contact/              Email + links
      not-found.tsx
    studio/[[...tool]]/     Embedded Sanity Studio (client page + server layout)
    api/draft-mode/         enable / disable preview (visual editing)
  components/
    SiteShell.tsx           Two-pane responsive shell + mobile drawer (client)
    RichText.tsx            Portable Text renderer (+ image/video/audio blocks)
    media.tsx               SanityPicture, VideoEmbed, AudioEmbed
    DraftModeBanner.tsx, SetupNotice.tsx
  lib/embeds.ts             YouTube/Vimeo + SoundCloud/Bandcamp URL → embed src
  sanity/
    env.ts client.ts live.ts image.ts
    queries.ts load.ts types.ts
    schemaTypes/            project + category + singletons + reusable blocks
    structure.ts            Studio desk (singletons + project list)
    presentation.ts         Document ↔ URL mapping for visual editing
```

## Content model

- **project** (document): `title`, `slug`, `category` (reference), `year`,
  `medium`, `orderRank`, and a `content` array that mixes rich text, **image**,
  **videoEmbed** (Vimeo/YouTube), **audioEmbed** (SoundCloud / Bandcamp
  EmbeddedPlayer). Order in the array = order on the page.
- **category** (document): `title`, `slug`, `orderRank`. Projects reference a
  category; the nav groups projects under their category heading. Drag-order
  both Projects and Categories in the Studio (orderRank) — that order drives the
  nav. Projects with no category are listed (ungrouped) at the bottom.
- **siteSettings** (singleton, id `siteSettings`): `title` (shown in nav),
  `description` (SEO).
- **information** (singleton, id `information`): `title`, `bio`, `portrait`.
- **cv** (singleton, id `cv`): `sections[]` → `heading` + `entries[]` (`year`,
  `text`).
- **contact** (singleton, id `contact`): `email`, `body`, `links[]`.

Singletons are enforced in `sanity.config.ts` (no create/delete; one fixed id).

## Design guidelines

The visual rules, in priority order. Apply them to any new UI.

- **One font, one size, one weight.** Hanken Grotesk (Helvetica-alike) **Medium**
  (`font-weight: 500`), **14px on desktop, 12px on mobile**. No other sizes or
  weights — chrome, nav, headings, captions, project titles: all identical.
  (The global `h1–h6` reset keeps headings at the base size/weight.)
- **100% black on white.** `#000` at full opacity for all text and borders. No
  greys, no opacity tints, no accent colours.
- **Bold/italic only in rich text.** The one allowed type variation is
  `strong`/`em` inside Portable Text (project/bio/contact body). The rich-text
  block has no heading or quote styles — just normal text + bold + italic +
  links + lists.
- **8px padding everywhere**, desktop included (`--pad: 8px`).
- **Nav structure:** the name (nav top / mobile bar) links to **Information**.
  The static pages (**CV**, **Contact**) sit directly beneath the name with no
  separator. Projects follow, grouped under their category headings.

## Local development

```bash
pnpm install
cp .env.local.example .env.local   # then fill in the Sanity values
pnpm dev                           # http://localhost:3000  (Studio at /studio)
```

The app boots **without** Sanity configured — it shows a "Connect Sanity"
notice instead of crashing. Fetches degrade to empty on error
(`src/sanity/load.ts`).

### Commands

- `pnpm dev` — dev server (site + Studio)
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm typecheck` — `tsc --noEmit`

ESLint is intentionally **not** configured (kept minimal). Add it later with
`npx next lint` if desired.

## Environment variables

See `.env.local.example`. Same vars go in the Vercel project settings.

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | From sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | no | defaults to `2025-06-01` |
| `SANITY_API_READ_TOKEN` | for previews/live | Viewer token; **server-only** |
| `NEXT_PUBLIC_SITE_URL` | prod | e.g. `https://reececox.com` |

The `sanity` CLI also reads `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET`
as a fallback (see `src/sanity/env.ts`).

---

## ⚠️ Out of scope for the coding agent

The agent that builds/edits this code does **not** perform these — a human
owns them. They're documented here so they can be done quickly when needed.

### Git

No commits, branches, or pushes are made automatically. Commit and push
yourself.

### Sanity project setup & deployment

Not performed by the agent. To set up:

1. Create a project + `production` dataset at <https://www.sanity.io/manage>
   (or `npx sanity init` / via the Sanity MCP tools).
2. Put `projectId` + `dataset` into `.env.local` (and Vercel env).
3. Create a **Viewer** API token → `SANITY_API_READ_TOKEN`.
4. Add **CORS origins** (sanity.io/manage → API → CORS): `http://localhost:3000`
   and the production domain — allow credentials.
5. The Studio is served by Next at `/studio` (no separate `sanity deploy`
   hosting needed). To push the schema for typegen/validation:
   `npx sanity schema deploy`. Optional types: `npx sanity typegen generate`.
6. Create the four singletons once in the Studio (Site settings, Information,
   CV, Contact), add some categories, then projects.
   - Optional: seed sample content (3 categories, 5 projects, all singletons)
     with `node --env-file=.env.local scripts/seed.mjs`. Needs a **write
     (Editor)** token — set it as `SANITY_API_WRITE_TOKEN` in `.env.local`
     (the read token can't create documents). Re-running is idempotent.

### Vercel deployment

Not performed by the agent. To deploy:

1. Import the repo in Vercel. Framework preset: **Next.js**. Build command and
   output are auto-detected (`next build`). Package manager: pnpm.
2. Add the environment variables above (Production + Preview).
3. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the real domain and add
   that domain to Sanity CORS.
4. Visual editing: open `<your-site>/studio` → Presentation. Preview enters via
   `/api/draft-mode/enable`; exit via `/api/draft-mode/disable`.

## Conventions to preserve

- Follow the **Design guidelines** above (one font/size/weight, 100% black,
  bold/italic only in rich text, 8px padding).
- **Two panes**: left nav always open on desktop; a closeable drawer on mobile
  (≤768px). Nav and viewer scroll **independently** — the page itself never
  scrolls (`100dvh`, `overflow:hidden` on the shell). Don't reintroduce
  whole-page scroll.
- Keep it dependency-light and obvious. Favor clarity over cleverness.
