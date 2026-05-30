# Manthan Jha — Portfolio

Personal portfolio site. Built with **Vite + React**, ported 1:1 from the Claude Design handoff prototype (same visual design, now a real, fast, deployable build with no in-browser Babel or CDN Tailwind).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & preview

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy to Vercel

**Option A — CLI**

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Option B — GitHub + dashboard**

Push this folder to a GitHub repo, then "Add New… → Project" in the Vercel dashboard and import it. Vercel auto-detects Vite (Build `npm run build`, Output `dist`).

## Editing content

All copy lives in two files:

- **`src/App.jsx`** — top constants: `HEADLINE`, `SUBHEAD`, `CREDENTIALS`, `ABOUT_INFO`, `MILESTONES`, `EXPERIENCE`, `WRITING`, `EXPLORING`, `SOCIALS`, and the `GH_*` GitHub stats.
- **`src/caseStudies.jsx`** — the `PROJECTS` array; each project's `caseStudy` is an ordered list of typed content blocks (hero / heading / body / image / cards3 / flow / flowCards / quote / impact / testimonial). The block types are documented at the top of the file.

### `[EDIT]` markers — fill these before going public

Search the source for `[EDIT]` and `[City` etc. Still to fill:

- City, university, prior role (`ABOUT_INFO`, `EXPERIENCE`, `MILESTONES`)
- Real GitHub handle + stats (`GH_HANDLE`, `GH_STATS`, `GH_TOTAL`)
- LinkedIn / X / GitHub / résumé links (`SOCIALS`)
- Real case-study metrics (the Fina `impact` numbers and `[X]`/`[Y]` placeholders in `caseStudies.jsx`)
- Writing post titles (`WRITING`)

### Adding a profile photo

`PhotoPlaceholder` (in `App.jsx`) and `CSImage` (in `caseStudies.jsx`) render placeholder frames. To use a real image, drop the file in `src/`, `import photo from "./me.jpg"`, and render an `<img src={photo} …>` in place of the placeholder.
