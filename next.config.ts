import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Hide the floating Next.js dev indicator in development.
  devIndicators: false,
  // Silence Turbopack root inference (workspace parent contains a lockfile).
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

