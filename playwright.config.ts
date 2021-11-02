import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'pnpm storybook --  --quiet',
    port: 6006,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
};

export default config;
