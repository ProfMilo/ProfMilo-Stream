import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // Ignore TypeScript errors during build (not recommended for production)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.paramountplus.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
