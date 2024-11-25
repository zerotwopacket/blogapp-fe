const config = {
  stories: ['../stories/*.stories.{js,md,mdx}'],
  framework: {
    name: '@web/storybook-framework-web-components',
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
};

export default config;
