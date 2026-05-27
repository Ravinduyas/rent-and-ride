/**
 * Central image registry for Rent & Ride Weligama.
 *
 * Every URL here is a verified-working public Unsplash photograph chosen
 * for the Sri Lanka coastal-tourism + motorbike rental theme. Each ID was
 * HTTP-checked at the time of writing.
 *
 * If any of these ever 404 in the future, the consuming components have
 * `onError` handlers that swap to a brand-tinted gradient placeholder
 * with a centered Bike icon — the page never shows a broken image.
 */

const UNSPLASH = 'https://images.unsplash.com';

/** Build a sized, optimised Unsplash URL from a photo id. */
export function unsplash(id: string, w = 1200): string {
  return `${UNSPLASH}/${id}?q=80&w=${w}&auto=format&fit=crop`;
}

/* ------------------------------------------------------------------ */
/* Curated motorbike photos (all verified live)                       */
/* ------------------------------------------------------------------ */

// Hero / lifestyle — rider + bike on the open road
// Royal Enfield Classic 350 at sunset (matches actual fleet, tourism-friendly)
export const HERO_RIDE = unsplash('photo-1619671715740-265b0ad817ec', 1600);
// Fallback: Royal Enfield Himalayan adventure shot
export const HERO_RIDE_ALT = unsplash('photo-1699972901575-a27de02f4916', 1600);

// Cruiser style (Royal Enfield / classic standards)
export const CRUISER_1 = unsplash('photo-1568772585407-9361f9bf3a87');
export const CRUISER_2 = unsplash('photo-1547549082-6bc09f2049ae');
export const CRUISER_3 = unsplash('photo-1485965120184-e220f721d03e');

// Sport / naked bikes
export const SPORT_1 = unsplash('photo-1558981359-219d6364c9c8');
export const SPORT_2 = unsplash('photo-1571068316344-75bc76f77890');
export const SPORT_3 = unsplash('photo-1611241893603-3c359704e0ee');

// Adventure / dual-sport
export const ADV_1 = unsplash('photo-1502877338535-766e1452684a');
export const ADV_2 = unsplash('photo-1530549387789-4c1017266635');
export const ADV_3 = unsplash('photo-1622185135505-2d795003994a');

// Scooters (auto / Vespa style)
export const SCOOTER_1 = unsplash('photo-1621360841013-c7683c659ec6');
export const SCOOTER_2 = unsplash('photo-1558981852-426c6c22a060');
export const SCOOTER_3 = unsplash('photo-1560179707-f14e90ef3623');
export const SCOOTER_4 = unsplash('photo-1600054800747-be294a6a0d26');
export const SCOOTER_5 = unsplash('photo-1558979158-65a1eaa08691');

// Sri Lanka coastal scenery + scenic ride backdrops
export const COAST_BEACH = unsplash('photo-1567361808960-dec9cb578182');
export const COAST_SUNSET = unsplash('photo-1593095948071-474c5cc2989d');
export const COAST_PALMS = unsplash('photo-1551038247-3d9af20df552');

/* ------------------------------------------------------------------ */
/* Model-specific photos (all HTTP-verified at time of writing)       */
/* ------------------------------------------------------------------ */

// Honda Dio 110 / Honda Activa 6G — step-through Japanese auto scooters
export const HONDA_SCOOTER_1 = unsplash('photo-1748344640450-f628289d152d');
export const HONDA_SCOOTER_2 = unsplash('photo-1773394089961-c4730d1e69bc');

// Vespa SXL 150 — classic Italian steel monocoque
export const VESPA_1 = unsplash('photo-1746306216535-88c7ff69a2db');
export const VESPA_2 = unsplash('photo-1747831127542-34be7e80d16b');

// Royal Enfield Classic 350 — retro round-headlight cruiser
export const RE_CLASSIC_1 = unsplash('photo-1619671715740-265b0ad817ec');
export const RE_CLASSIC_2 = unsplash('photo-1619671391704-b12cf9b5f1aa');

// Royal Enfield Hunter 350 — modern roadster
export const RE_HUNTER_1 = unsplash('photo-1744424778432-2499248bee48');
export const RE_HUNTER_2 = unsplash('photo-1689600615622-0e6aa9f1a949');
export const RE_HUNTER_3 = unsplash('photo-1685509251070-bb63119dc6f5');

// Yamaha FZ-S V3 — naked streetfighter
export const YAMAHA_FZ_1 = unsplash('photo-1653834048900-b5eeb9decd6a');
export const YAMAHA_FZ_2 = unsplash('photo-1560752486-6857e1c49231');

// KTM Duke 250 — aggressive naked sport, orange trellis frame
export const KTM_DUKE_1 = unsplash('photo-1591378603223-e15b45a81640');
export const KTM_DUKE_2 = unsplash('photo-1650980671776-a1ba07ce6fc2');
export const KTM_DUKE_3 = unsplash('photo-1581910403548-51d577b3e804');

// Bajaj Dominar 400 — sport-tourer, built for long distance
export const BAJAJ_DOMINAR_1 = unsplash('photo-1659331391034-3cd85d0631b3');
export const BAJAJ_DOMINAR_2 = unsplash('photo-1676001223723-93180e561d84');

// Royal Enfield Himalayan 450 — adventure/dual-sport
export const RE_HIMALAYAN_1 = unsplash('photo-1699972551272-e0eaee1916b2');
export const RE_HIMALAYAN_2 = unsplash('photo-1699972901575-a27de02f4916');

// KTM RC 390 — full-fairing supersport
export const KTM_RC_1 = unsplash('photo-1449426468159-d96dbf08f19f');
export const KTM_RC_2 = unsplash('photo-1740815553518-daaea4844ab9');
export const KTM_RC_3 = unsplash('photo-1740815533231-c85c713029fe');

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Returns a CSS gradient suitable as a fallback when an `<img>` errors.
 * Picks a brand-tinted gradient seeded by a string so each surface gets
 * a stable, recognisable colour even when its photo fails to load.
 */
export function fallbackGradient(seed: string): string {
  const hue = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return `linear-gradient(135deg, hsl(${hue} 35% 18%) 0%, hsl(${(hue + 40) % 360} 45% 28%) 60%, #5CB377 140%)`;
}

/** Sentinel placeholder URL kept tiny + available regardless of network. */
export const PLACEHOLDER_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%230B1428'/><stop offset='1' stop-color='%235CB377'/></linearGradient></defs><rect width='800' height='600' fill='url(%23g)'/><g fill='none' stroke='white' stroke-width='4' stroke-linecap='round' opacity='0.6' transform='translate(280 220)'><circle cx='40' cy='100' r='40'/><circle cx='200' cy='100' r='40'/><path d='M40 100 L120 30 L200 100'/><path d='M120 30 L160 30'/></g></svg>",
  );
