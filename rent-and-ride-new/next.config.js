/** @type {import('next').NextConfig} */

// Set NEXT_PUBLIC_BASE_PATH=/rent-and-ride when building for GitHub Pages.
// Left empty for `next dev` so the site still serves from the root locally.
//
// Don't run `npm run build` while `npm run dev` is running: both use .next,
// and the build swaps out chunks the dev server is serving ("Cannot find
// module './NNN.js'"). Stop dev, build, delete .next, then start dev again.
// (distDir can't separate them here — with output: "export" it sets where
// the exported site goes, not the build cache.)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // GitHub Pages is a static host, so the Next image optimizer is unavailable.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
