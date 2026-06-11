import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
    'storybook-dark-mode',
    'storybook-addon-module-mock',
    '@storybook/addon-coverage',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
  // ストーリーが参照するAPI URLのデフォルト値。MSWのモック先なので実在しないダミーでよい。
  // これにより.env(.local)が無い環境（CI等）でもストーリーが動く。
  // 末尾の...envにより、Storybookが収集した実際の環境変数があればそちらが優先される。
  env: (env) => ({
    NEXT_PUBLIC_RAILS_API_URL: 'http://localhost:3001/api',
    NEXT_PUBLIC_NEXT_URL: 'http://localhost:3000',
    STORYBOOK_NEXT_PUBLIC_RAILS_API_URL: 'http://localhost:3001/api',
    ...env,
  }),
};
export default config;
