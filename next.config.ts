import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ticket 4.1: static export — pure marketing page, no server-side logic needed.
  output: "export",
  images: {
    // Next's built-in Image Optimization API needs a server; static export doesn't have one.
    unoptimized: true,
  },
};

export default nextConfig;
