// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// frontend/next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,   // optional
// };

// module.exports = nextConfig;

// frontend/next.config.ts
import { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Disable Turbopack entirely
  turbopack: {},

  webpack: (config: WebpackConfig, { dev }: { dev: boolean }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },

  // ✅ Dev-only API rewrite to avoid localhost fetch issues
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",              // calls to /api/...
          destination: "http://backend:3001/:path*", // go to backend container
        },
      ];
    }
    return [];
  },
};

export default nextConfig;