/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // App Router is default in Next.js 16, no experimental flag needed
  // Next.js 16 handles PostCSS automatically - no webpack override needed
}

module.exports = nextConfig

