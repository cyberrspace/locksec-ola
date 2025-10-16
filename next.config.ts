import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
};

// ✅ Wrap with PWA config
const withPWANextConfig = withPWA({
  dest: "public", // Service worker output folder
  register: true, // Automatically register SW
  skipWaiting: true, // Activate new service worker immediately
  disable: process.env.NODE_ENV === "development", // Disable in dev mode
})(nextConfig);

export default withPWANextConfig;
