import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/nextjs',
  staticDirs: ['../public', { from: '../src/app/fonts', to: '/fonts' }],

  webpackFinal: async (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    const imageRule = config.module.rules.find(
      (rule) =>
        rule !== null &&
        typeof rule === 'object' &&
        (rule as { test?: RegExp }).test?.test('.svg'),
    );
    if (imageRule) {
      (imageRule as { exclude?: RegExp }).exclude = /\.svg$/;
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgoConfig: { plugins: ['removeDimensions'] } },
        },
      ],
    });

    return config;
  },
};
export default config;
