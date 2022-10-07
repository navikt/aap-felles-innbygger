module.exports = {
  stories: [
    "../packages/Button/**/*.stories.mdx",
    "../packages/Button/button.stories.jsx",
    "../packages/Button/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
};
