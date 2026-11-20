import type { NextConfig } from "next";

/** Standalone is for Docker only; Vercel builds its own output and 404s if misrouted to `.next/standalone`. */
const nextConfig: NextConfig = {
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.21st.dev",
      },
    ],
  },
};

export default nextConfig;
