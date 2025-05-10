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
  // Remove the nested images property in experimental
  nextConfig.experimental = {
    // Any other experimental features can go here
  };
}

module.exports = nextConfig