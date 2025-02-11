import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://complex-interfaces-512888.framer.app/:path*',
        basePath: false,
      },
      
    ];
},
};

export default nextConfig;
