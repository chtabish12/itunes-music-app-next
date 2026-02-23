/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mzstatic.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
