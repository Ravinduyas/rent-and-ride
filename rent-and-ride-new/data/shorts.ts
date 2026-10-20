/**
 * YouTube Shorts from https://www.youtube.com/@rentandrideweligama/shorts,
 * newest first. Add a new Short by putting its 11-character ID (the part
 * after /shorts/ in its link) at the top of the list.
 *
 * After adding one, regenerate the small thumbnails in public/shorts/ (see
 * the README); until then the card uses YouTube's thumbnail.
 *
 * Each thumbnail on the site opens its Short on YouTube in a new tab.
 */
export type Short = { id: string; title: string };

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@rentandrideweligama";
export const YOUTUBE_SHORTS = `${YOUTUBE_CHANNEL}/shorts`;

export const SHORTS: Short[] = [
  { id: "FYO2-5_ez60", title: "His first-ever tuk-tuk experience in Sri Lanka!" },
  { id: "LU4PEqrdz1I", title: "His first-ever tuk-tuk experience in Sri Lanka!" },
  { id: "YDgWCjh10T4", title: "No plans, just ride & explore Sri Lanka!" },
  { id: "fki7rGyu9zg", title: "Chase the sunset, ride into the memories" },
  { id: "LT06XIFN6Lc", title: "Good roads, beautiful beaches & the freedom to explore" },
  { id: "8wfFIVpFEy0", title: "She came to Sri Lanka… and ended up driving a tuk-tuk!" },
  { id: "xle9Mf0QrB4", title: "A UK girl's unforgettable tuk-tuk tour in Yala" },
  { id: "PHiycWTMHcI", title: "Explore Sri Lanka island life with Rent & Ride" },
  { id: "VCLKsGP0xo8", title: "Nothing beats a tuk-tuk ride in Sri Lanka" },
  { id: "26PZmCrFxXI", title: "Ride through paradise in your own tuk-tuk" },
  { id: "XCvQgU4XsHY", title: "Happy riders, unforgettable journeys" },
  { id: "t6ejS0mTFYM", title: "Explore Weligama by tuk-tuk" },
  { id: "DUkrgIKPeL8", title: "Ride in style — scooter life in Weligama" },
  { id: "DvN24ddSa-M", title: "Easy scooter riding near Weligama beach" },
];

/**
 * YouTube's own vertical thumbnail. Its size varies wildly (40–370KB), so
 * the site shows small WebP copies from public/shorts/ instead and only
 * falls back to this when a copy is missing (e.g. a newly added Short).
 */
export const shortThumbRemote = (id: string) => `https://i.ytimg.com/vi/${id}/oardefault.jpg`;
/** Local 9:16 copies at 360 and 540px wide: public/shorts/<id>-<w>.webp */
export const shortThumbLocal = (id: string, w: 360 | 540) => `/shorts/${id}-${w}.webp`;
export const shortUrl = (id: string) => `https://www.youtube.com/shorts/${id}`;
