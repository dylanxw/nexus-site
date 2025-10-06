import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't run ESLint during production builds (development mode will still show errors)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TS errors should still block builds for type safety
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
