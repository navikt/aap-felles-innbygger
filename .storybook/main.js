module.exports = {
  stories: [
    "../packages/aap-felles-innbygger-react/**/*.stories.mdx",
    "../packages/aap-felles-innbygger-react/**/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
};
