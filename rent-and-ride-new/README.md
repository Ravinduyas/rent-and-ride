# Rent & Ride Weligama

Scooter and bike rental site. Next.js 14 (static export) + Tailwind, deployed to
GitHub Pages by `.github/workflows/deploy.yml`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
```

## Where things live

| What | File |
| --- | --- |
| Phone, WhatsApp, email, address, hours, social + review links | `lib/site.ts` |
| Scooters, bikes, prices, featured row | `data/vehicles.ts` |
| Reviews, FAQs, gallery, hero images | `data/content.ts` |
| Real photos (paths) + verified stock photos | `data/photos.ts` |
| YouTube Shorts shown on the home page | `data/shorts.ts` |
| Colours and fonts | `tailwind.config.ts` |

## Before going live

- Confirm the contact details in `lib/site.ts` (they were read off the design mockup).
- Replace the placeholder reviews in `data/content.ts` with real ones.
- Swap the stock vehicle photos for photos of the actual fleet.

Booking buttons and the contact form open WhatsApp with a pre-filled message;
there is no server-side form handler.

## Photos

The business's photos live in `public/photos/` as WebP at 480–2000px wide,
made from the full-size originals in `photos-original/` (kept out of git and
out of the deployed site). Reference them through `REAL` in `data/photos.ts`.

## YouTube Shorts

Add a Short by putting its ID (the part after `/shorts/` in its link) at the
top of `SHORTS` in `data/shorts.ts`. It works straight away using YouTube's
thumbnail; for a lighter page, add 9:16 WebP copies as
`public/shorts/<id>-360.webp` and `public/shorts/<id>-540.webp`.
