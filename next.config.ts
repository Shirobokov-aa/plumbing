import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Увеличиваем лимит до 10MB
    },
  },
};

export default nextConfig;
