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
  // swcMinify was removed from NextConfig types; if using SWC minification, Next.js handles it by default
  webpack: (config: WebpackConfig, { dev }: { dev: boolean }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,        // Check for changes every 1 second
        aggregateTimeout: 300, // Wait 300ms after a change before rebuilding
      };
    }
    return config;
  },
};

export default nextConfig;