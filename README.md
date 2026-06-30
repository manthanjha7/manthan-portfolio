# Manthan Jha Portfolio

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

**Option A: CLI**

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Option B: GitHub + dashboard**

Push this folder to a GitHub repo, then "Add New… → Project" in the Vercel dashboard and import it. Vercel auto-detects Vite (Build `npm run build`, Output `dist`).

## Editing content

All copy lives in three files:

- **`src/App.jsx`**: top constants, `HEADLINE`, `CREDENTIALS`, `ABOUT_INFO`, `MILESTONES`, `EXPERIENCE`, `SOCIALS`, `ACHIEVEMENTS`, plus the `GH_USERNAME` for the live contribution graph.
- **`src/articles.jsx`**: the `ARTICLES` array (writing section). Each article has `category`, `date`, `readTime`, `dek`, and a `blocks` body using the same block vocabulary as case studies.
- **`src/caseStudies.jsx`**: the `PROJECTS` array; each project's `caseStudy` is an ordered list of typed content blocks (hero / heading / body / image / cards3 / flow / flowCards / quote / impact / testimonial). Block types are documented at the top of the file.
