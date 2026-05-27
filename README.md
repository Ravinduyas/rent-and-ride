# Unique Hair — Next.js Landing Page

Frontend-only Next.js 14 (App Router) implementation of the Unique Hair salon design.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- react-icons
- next/image with Unsplash placeholder photos

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.tsx       # Poppins font + global metadata
  page.tsx         # Composes all sections
  globals.css      # Tailwind layers + helpers
components/
  Header.tsx       # Nav + mobile menu
  Hero.tsx         # Yellow hero with UNIQUE badge + circular portrait
  About.tsx        # About Us w/ "Know More" pill
  Categories.tsx   # 4-icon picker (Cutting / Spa / Wash / Trim)
  Services.tsx     # 2x3 service photo grid
  Newsletter.tsx   # Subscribe form
  Footer.tsx       # About / Links / Social
tailwind.config.ts # brand palette: yellow / orange / dark
```

## Customising images

The mockup photos come from Unsplash via `next/image`. Replace the `src` props in `Hero.tsx`, `About.tsx`, and `Services.tsx` with your own salon assets (drop them in `public/` and use `/your-image.jpg`).
# rent-and-ride
# rent-and-ride
