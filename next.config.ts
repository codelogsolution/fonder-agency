import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Hide the floating Next.js dev indicator in development.
  devIndicators: false,
  // Silence Turbopack root inference (workspace parent contains a lockfile).
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

