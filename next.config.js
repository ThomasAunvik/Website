/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["raw.githubusercontent.com"],
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
};

module.exports = nextConfig;
