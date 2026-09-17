# dMRV-website-emertech-full
# Emertech dMRV Platform

A set of web apps built for Emertech Innovations' dMRV (digital Measurement, Reporting & Verification) product line, covering three sectors — Agriculture, Agroforestry, and Biochar — each built and deployed independently, linked together from a central homepage.

## Live sites

| Page | Link |
|---|---|
| Homepage | https://d-mrv-website-emertech.vercel.app/ |
| Agriculture | https://dmrv-agri-main-l6jo.vercel.app/ |
| Agroforestry | https://dmrv-agro.vercel.app/ |
| Biochar | https://dmrv-biochar-2.vercel.app/ |

## Repo structure
* **`/dmrv-landing-page/`** — Homepage (links out to each sector page)
* **`/emertech-agri-dmrv/`** — Agriculture sector page (standalone app)
* **`/agroforestry-site/`** — Agroforestry sector page (standalone app)
* **`/emertech-biochar-dmrv/`** — Biochar sector page (standalone app)


Each folder is a fully independent app with its own package.json and deployment — not a monorepo build, just grouped here for review convenience. This let me ship each sector as it was finished rather than waiting on all four to be ready at once.

## Tech stack

- React 19
- Vite
- Tailwind CSS v4

## Run locally

Each folder runs independently:

```bash
cd dmrv-landing-page          # or emertech-agri-dmrv / agroforestry-site / emertech-biochar-dmrv
npm install
npm run dev
```

Open the printed `localhost` URL.

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # serve the production build locally
```

## Notes

Because each sector page was built as a separate app, keeping spacing, sizing, and color tokens perfectly consistent across all of them was hard to nail on the first pass — this was my first time architecting something at this scale. Everything works correctly; a shared design-token setup is the main thing I'd add if I revisited this.
