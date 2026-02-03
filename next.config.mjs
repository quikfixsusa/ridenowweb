/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.devtunnels.ms', '*.uks1.devtunnels.ms'],
      bodySizeLimit: '10mb',
    },
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false, // opcional si usas path
        os: false, // opcional si usas os
      };
    }
    return config;
  },
};

export default nextConfig;
