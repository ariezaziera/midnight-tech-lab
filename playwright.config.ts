import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:3000", browserName: "chromium", trace: "retain-on-failure" },
  webServer: { command: "npm run start", url: "http://127.0.0.1:3000", reuseExistingServer: false, timeout: 60000 },
});
