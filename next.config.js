/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 300,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL,
    PUBLIC_NAME: process.env.PUBLIC_NAME,
    PUBLIC_VERSION: process.env.PUBLIC_VERSION,
    PUBLIC_REPO: process.env.PUBLIC_REPO,
    PUBLIC_API: process.env.PUBLIC_API,
    PUBLIC_DISCORDLINK: process.env.PUBLIC_DISCORDLINK,
    API_URL: process.env.API_URL,
  },
};
