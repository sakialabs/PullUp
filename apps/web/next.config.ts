import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
