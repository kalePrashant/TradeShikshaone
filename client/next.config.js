/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

// Add GitHub Pages specific settings only in production build
if (process.env.NODE_ENV === 'production') {
  nextConfig.output = 'export';
  nextConfig.basePath = '/TradeShiksha';
  nextConfig.assetPrefix = '/TradeShiksha';
  nextConfig.trailingSlash = true;
  // Add this to ensure all assets use the correct path
  nextConfig.experimental = {
    ...nextConfig.experimental,
    images: {
      ...nextConfig.images,
      unoptimized: true,
    },
  };
}

module.exports = nextConfig