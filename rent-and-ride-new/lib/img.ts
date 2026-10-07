/**
 * Responsive Unsplash images. Unsplash resizes on the fly from the `w`
 * query parameter, so a phone can download a 640px file instead of the
 * 2000px desktop one.
 */
export function withWidth(url: string, width: number): string {
  const u = new URL(url);
  u.searchParams.set("w", String(width));
  // A fixed height would change the crop at other widths.
  u.searchParams.delete("h");
  return u.toString();
}

export function srcSet(url: string, widths: number[]): string {
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
