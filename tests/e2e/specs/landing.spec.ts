import { test, expect } from "@playwright/test";

test("landing hero and sections visible @no-auth", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#home")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  await expect(page.locator("#services")).toBeAttached();
  await expect(page.locator("#contact")).toBeAttached();
});

test("preview banner when site is not live @no-auth", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("status", { name: /Preview/i });
  const visible = await banner.isVisible().catch(() => false);
  if (process.env.NEXT_PUBLIC_SITE_LIVE !== "true") {
    await expect(banner).toBeVisible();
  } else {
    expect(visible).toBe(false);
  }
});
