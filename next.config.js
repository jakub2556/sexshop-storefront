const checkEnvVariables = require("./check-env-variables")
checkEnvVariables()

const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable verbose fetch logging in production
  logging: process.env.NODE_ENV === "development" ? { fetches: { fullUrl: true } } : undefined,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Enable compression
  compress: true,
  // Optimize fonts
  optimizeFonts: true,
  // Power header
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "173.249.39.158" },
      { protocol: "https", hostname: "static.erotikamarket.hu" },
      { protocol: "https", hostname: "pub-260fe0e98e0241a3a4d293d4b93b5e00.r2.dev" },
      { protocol: "https", hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com" },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [{ protocol: "https", hostname: S3_HOSTNAME, pathname: S3_PATHNAME }]
        : []),
    ],
  },
  // Headers for caching
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]
  },
}

module.exports = nextConfig
