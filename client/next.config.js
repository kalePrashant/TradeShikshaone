/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

// Only apply GitHub Pages settings when deploying to GitHub Pages
// For Vercel, we don't need these settings
if (process.env.GITHUB_PAGES === 'true') {
  nextConfig.output = 'export';
  nextConfig.basePath = '/TradeShiksha';
  nextConfig.assetPrefix = '/TradeShiksha';
  nextConfig.trailingSlash = true;
}

module.exports = nextConfig