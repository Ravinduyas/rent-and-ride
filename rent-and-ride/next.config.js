/** @type {import('next').NextConfig} */

// Set NEXT_PUBLIC_BASE_PATH=/rent-and-ride when building for GitHub Pages.
// Left empty for `next dev` so the site still serves from the root locally.
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
