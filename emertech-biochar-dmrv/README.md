# Emertech — Biochar dMRV

Standalone landing page for Emertech Innovations' Biochar dMRV product.
Built with Vite + React + Tailwind CSS v4 + lucide-react.

## Run locally
```bash
npm install
npm run dev
```
Open the printed localhost URL.

## Build
```bash
npm run build      # outputs to /dist
npm run preview    # serve the production build locally
```

## Push to GitHub
```bash
git init
git add .
git commit -m "Biochar dMRV landing page"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## Deploy on Vercel
1. Go to vercel.com → New Project → import the GitHub repo.
2. Vercel auto-detects Vite — Framework: **Vite**, Build: `npm run build`, Output: `dist`.
3. Click Deploy. No environment variables or vercel.json needed (single page, no routing).

## Notes
- The Emertech logo is a base64 data URI in your locked `App.jsx`. Paste it into
  the `LOGO_SRC` constant in `src/BiocharDMRV.jsx` (copy via your Python script —
  do not retype). A text fallback renders until then.
- Brand tokens (violet→fuchsia gradient, #1d1339 footer) live at the top of the component.
