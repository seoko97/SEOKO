const path = require('path');

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    "@storybook/addon-actions",
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@src": path.resolve(__dirname, "../src"),
      "@pages": path.resolve(__dirname, "../src/components/pages"),
      "@atoms": path.resolve(__dirname, "../src/components/UI/atoms"),
      "@molecules": path.resolve(__dirname, "../src/components/UI/molecules"),
      "@organisms": path.resolve(__dirname, "../src/components/UI/organisms"),
      "@frames": path.resolve(__dirname, "../src/components/UI/frames"),
      "@theme": path.resolve(__dirname, "../src/theme"),
    };
    return config;
  }
};