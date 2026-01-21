import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  pageExtensions: ["ts", "tsx"],
};

export default nextConfig;
