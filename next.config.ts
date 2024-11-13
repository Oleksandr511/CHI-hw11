// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ec2-13-49-67-34.eu-north-1.compute.amazonaws.com"], // Add the full domain from which you are loading the image
    // hostname: "ec2-13-49-67-34.eu-north-1.compute.amazonaws.com",
  },
};

export default nextConfig;
