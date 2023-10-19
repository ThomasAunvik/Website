/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["gh-stats.thaun.dev"],
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
