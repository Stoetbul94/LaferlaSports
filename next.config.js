const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  // Pin the workspace root (multiple lockfiles exist on this machine).
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
