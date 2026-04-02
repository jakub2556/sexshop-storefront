const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev")
const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

if (process.env.NODE_ENV === "development") {
  setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "173.249.39.158" },
      { protocol: "https", hostname: "static.erotikamarket.hu" },
      { protocol: "https", hostname: "pub-260fe0e98e0241a3a4d293d4b93b5e00.r2.dev" },
      { protocol: "https", hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com" },
      { protocol: "https", hostname: "medusa-server-testing.s3.amazonaws.com" },
      { protocol: "https", hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com" },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [{ protocol: "https", hostname: S3_HOSTNAME, pathname: S3_PATHNAME }]
        : []),
    ],
  },
}

module.exports = nextConfig
