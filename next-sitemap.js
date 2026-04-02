const excludedPaths = ["/checkout", "/account/*", "/wishlist", "/compare"]

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://173.249.39.158:8000",
  generateRobotsTxt: true,
  exclude: excludedPaths + ["/[sitemap]"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: excludedPaths,
      },
    ],
  },
}
