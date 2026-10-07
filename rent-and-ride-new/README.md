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
| Verified stock photos | `data/photos.ts` |
| Colours and fonts | `tailwind.config.ts` |

## Before going live

- Confirm the contact details in `lib/site.ts` (they were read off the design mockup).
- Replace the `#` social and review links in `lib/site.ts`.
- Replace the placeholder reviews in `data/content.ts` with real ones.
- Swap the stock vehicle photos for photos of the actual fleet.

Booking buttons and the contact form open WhatsApp with a pre-filled message;
there is no server-side form handler.
