import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async preVisit(page) {
    // クリップボード操作を伴うストーリーのために権限を付与する
    await page
      .context()
      .grantPermissions(['clipboard-read', 'clipboard-write']);
  },
};

export default config;
