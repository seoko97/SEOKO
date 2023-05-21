const { HOST } = process.env;

module.exports = {
  siteUrl: HOST,
  exclude: ["/404", "/temporary", "/signin", "/write/**", "/sitemap/**"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/404", "/temporary", "/signin", "/write/*", "/sitemap/*"],
      },
    ],
    additionalSitemaps: [`${HOST}/sitemap/posts.xml`],
  },
};
