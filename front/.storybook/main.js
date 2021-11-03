const path = require('path');

const resolvePath = (_path) => path.join(process.cwd(), _path);

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
      "@icons": path.resolve(__dirname, "../src/components/icons"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@emotion/react": resolvePath("node_modules/@emotion/react"),
      "@emotion/styled": resolvePath("node_modules/@emotion/styled"),
    };
    return config;
  }
};