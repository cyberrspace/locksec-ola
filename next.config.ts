import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,

  // ✅ CRITICAL FIX
  disable: process.env.NODE_ENV === "development",
})(nextConfig);


// const withPWANextConfig = withPWA({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
// })(nextConfig);
