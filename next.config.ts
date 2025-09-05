import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Ensure prettier is not externalized
    if (!isServer) {
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals = config.externals.filter(
          (external: any) => 
            typeof external !== 'string' || !external.includes('prettier')
        );
      }
    }
    return config;
  },
};

export default nextConfig;
