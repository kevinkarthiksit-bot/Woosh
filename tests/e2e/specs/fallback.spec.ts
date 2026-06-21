import { test, expect } from "@playwright/test";

test("landing renders when API is slow @no-auth", async ({ page }) => {
  await page.route("**/api/**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2_000));
    await route.continue();
  });

  await page.goto("/", { timeout: 60_000 });
  await expect(page.locator("#home")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
});
