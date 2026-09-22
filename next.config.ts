import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Hide the floating Next.js dev indicator in development.
  devIndicators: false,
  // Silence Turbopack root inference (workspace parent contains a lockfile).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;

