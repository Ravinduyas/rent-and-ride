import { asset } from "./asset";
import { REAL_WIDTHS } from "@/data/photos";

/**
 * Responsive images, from two kinds of source:
 *
 * - The business's own photos, referenced as "/photos/<name>" — pre-built
 *   WebP files at LOCAL_WIDTHS (see data/photos.ts).
 * - Unsplash URLs, which resize on the fly from the `w` query parameter.
 *
 * Either way a phone downloads a small file instead of the desktop one.
 */

/** Widths the local WebP files were generated at. */
const LOCAL_WIDTHS = [480, 800, 1200, 1600, 2000];

const isLocal = (url: string) => url.startsWith("/");

/** Local widths worth offering: real sizes only, never past the original. */
function localWidths(url: string): { file: number; real: number }[] {
  const max = REAL_WIDTHS[url] ?? Infinity;
  const list: { file: number; real: number }[] = [];
  for (const w of LOCAL_WIDTHS) {
    // Files above the original's width are just the original again, so stop
    // at the first one that reaches it and describe it by its true width.
    list.push({ file: w, real: Math.min(w, max) });
    if (w >= max) break;
  }
  return list;
}

export function withWidth(url: string, width: number): string {
  if (isLocal(url)) {
    const options = localWidths(url);
    const pick = options.find((o) => o.real >= width) ?? options[options.length - 1];
    return asset(`${url}-${pick.file}.webp`);
  }
  const u = new URL(url);
  u.searchParams.set("w", String(width));
  // A fixed height would change the crop at other widths.
  u.searchParams.delete("h");
  return u.toString();
}

export function srcSet(url: string, widths: number[]): string {
  if (isLocal(url)) {
    return localWidths(url)
      .map((o) => `${asset(`${url}-${o.file}.webp`)} ${o.real}w`)
      .join(", ");
  }
  return widths.map((w) => `${withWidth(url, w)} ${w}w`).join(", ");
}

/** Props for a responsive <img>: pass the widths to offer and a sizes hint. */
export function responsive(url: string, widths: number[], sizes: string) {
  return {
    src: withWidth(url, widths[widths.length - 1]),
    srcSet: srcSet(url, widths),
    sizes,
  };
}

/** Full-width banners. */
export const HERO_WIDTHS = [640, 960, 1280, 1600, 2000];
/** Cards and gallery tiles. */
export const CARD_WIDTHS = [320, 480, 640, 900];
