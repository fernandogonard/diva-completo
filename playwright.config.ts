import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.E2E_PORT ?? 8873);
const targetPort = Number(process.env.E2E_TARGET_PORT ?? 4173);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npx --yes netlify-cli@26.1.0 dev --offline --port ${port} --no-open --command "npm run preview -- --host 127.0.0.1 --port ${targetPort} --strictPort" --target-port ${targetPort}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
