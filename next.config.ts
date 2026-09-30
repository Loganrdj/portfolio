import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: emits plain HTML per route into out/, which fixes the
  // SEO + link-preview gap the old CRA SPA had (crawlers got a blank shell)
  // while still deploying to GitHub Pages as static files.
  output: "export",
  // next/image cannot use the optimizing server under `output: export`,
  // so images are pre-optimized at build time by scripts/optimize-images.mjs.
  images: { unoptimized: true },
  // Directory-style URLs (/blog/post/) behave better on static hosts.
  trailingSlash: true,
};

export default nextConfig;
