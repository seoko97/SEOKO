const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]);
const Dotenv = require("dotenv-webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config) => {
    const prod = process.env.NODE_ENV === "production";

    const plugins = [...config.plugins, new Dotenv({ silent: true })];

    if (prod) {
      plugins.push(new CompressionPlugin());
    }

    return {
      ...config,
      mode: prod ? "production" : "development",
      plugins,
    };
  },
  images: {
    domains: ["image.toast.com"],
    minimumCacheTTL: 86400,
    formats: ["image/webp"],
    deviceSizes: [480, 768, 980],
  },
  compiler: {
    emotion: true,
  },
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
};

module.exports = withTM(withBundleAnalyzer(nextConfig));
