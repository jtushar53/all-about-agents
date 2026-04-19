# all-about-agents

A 3D interactive guide to prompt engineering, rendered with Three.js via `@react-three/fiber` + `@react-three/drei`. Basics to frontier, with a searchable index of curated sources.

Lives at **https://jtushar53.github.io/all-about-agents/**.

## Stack

- Vite + React 18
- three + @react-three/fiber + @react-three/drei
- HashRouter (react-router-dom) — safe on GitHub Pages subpaths
- FlexSearch for full-text search
- Markdown content (`gray-matter` + `marked`)

## Scenes

| Route | Scene |
|-------|-------|
| `/` | galaxy of tier orbs |
| `/guide` | 12-station curved path with live PromptTweaker |
| `/library` | card wall of ~25 techniques, tier-filtered |
| `/search` | pulsing orb with result shards |
| `/sources` | constellation of papers, docs, blogs, repos |

A `LastUpdatedHUD` pinned to the bottom-right corner shows the commit date on every route.

## Local dev

```bash
npm install
npm run dev
```

The `predev` script regenerates `src/data/meta.json` (git-stamp) and `src/data/search.json` (content index) from `content/`.

## Build

```bash
npm run build
npm run preview
```

`vite.config.js` sets `base: '/all-about-agents/'` so asset paths resolve on the project-page subpath.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` which builds and publishes to GitHub Pages via `actions/deploy-pages@v4`. One-time: set the repo's Pages source to **GitHub Actions**.

## Editing content

- `content/guide/*.md` — 12 lessons, order fixed by filename
- `content/techniques/*.md` — entries, grouped by `tier` in frontmatter
- `content/sources.json` — flat list of external references

The build re-indexes automatically.
