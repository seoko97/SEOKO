const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]);
const Dotenv = require("dotenv-webpack");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const prod = process.env.NODE_ENV === "production";

const nextConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config) => {
    const plugins = [...config.plugins, new Dotenv({ silent: true })];

    return {
      ...config,
      mode: prod ? "production" : "development",
      plugins,
    };
  },
  images: {
    domains: ["image.toast.com"],
  },
};

module.exports = withTM(withBundleAnalyzer(nextConfig));
