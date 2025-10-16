import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
};

const withPWANextConfig = withPWA({
  dest: "public", 
  register: true,
  skipWaiting: true,
  disable: false, 
})(nextConfig);

export default withPWANextConfig;
