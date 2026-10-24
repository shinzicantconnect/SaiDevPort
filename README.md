# Sai Mendoza — Portfolio

A minimal, monochrome secondary portfolio built with Next.js (App Router),
TypeScript, and Tailwind CSS, with GSAP micro-interactions and AOS
scroll reveals.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Filling in your content

- **Projects** — edit `src/data/projects.ts`. Add a `liveUrl`/`repoUrl`,
  and drop an image into `/public` and reference it via `image`.
- **Social links** — edit `src/data/links.ts`. Each link renders as
  "Coming Soon" until its `url` is filled in.
- **Skills** — edit the `skillGroups` array in `src/data/links.ts`.
- **Fonts** — the design assumes a display font like "Neue Montreal"
  and a body font like "Inter". Swap the `--font-display` / `--font-body`
  variables in `src/app/globals.css`, or wire up `next/font` in
  `src/app/layout.tsx` for self-hosted, zero-layout-shift fonts.

## Build

```bash
npm run build
npm run start
```
