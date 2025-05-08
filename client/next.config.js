/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/TradeShiksha',
  assetPrefix: '/TradeShiksha/',
  trailingSlash: true,
}

module.exports = nextConfig