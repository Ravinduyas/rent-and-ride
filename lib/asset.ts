// Prefixes a /public asset path with the deploy basePath.
//
// next/link and the JS/CSS chunks get basePath applied automatically, but
// `next/image` with `unoptimized: true` and the `metadata.icons` entries emit
// their src verbatim — so those references need the prefix added by hand.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
