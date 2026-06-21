import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e/specs",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  timeout: 120_000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "setup",
      testDir: "./tests/e2e/fixtures",
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 5"] },
      dependencies: ["setup"],
      grepInvert: /@no-auth/,
    },
    {
      name: "chromium-tablet",
      use: { ...devices["iPad Mini"] },
      dependencies: ["setup"],
      grepInvert: /@no-auth/,
    },
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
      dependencies: ["setup"],
      grepInvert: /@no-auth/,
    },
    {
      name: "chromium-no-auth",
      use: { ...devices["Desktop Chrome"] },
      grep: /@no-auth/,
    },
  ],
  webServer: {
    command: "npx serve out -p 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
