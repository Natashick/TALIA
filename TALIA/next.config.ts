import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,  // Log the full URL of fetch requests for better traceability
    },
  },
};

export default nextConfig;
