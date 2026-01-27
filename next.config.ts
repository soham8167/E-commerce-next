import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  pageExtensions: ["ts", "tsx"],
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
