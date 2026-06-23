import { test, expect } from "../fixtures/authenticated-test";

test("account dashboard tabs and overview", async ({ page }) => {
  await page.goto("/account");
  await expect(page.getByRole("heading", { name: /Hello/i })).toBeVisible({ timeout: 60_000 });
  await expect(page.getByTestId("account-overview")).toBeVisible();

  await page.getByTestId("account-tab-orders").click();
  await expect(page.getByTestId("account-orders-section")).toBeVisible();

  await page.getByTestId("account-tab-wallet").click();
  await expect(page.getByTestId("account-wallet-section")).toBeVisible();
  await expect(page.getByTestId("account-wallet-balance")).toBeVisible();

  await page.getByTestId("account-tab-referral").click();
  await expect(page.getByTestId("account-referral-section")).toBeVisible();
});

test("/orders redirects to account orders tab", async ({ page }) => {
  await page.goto("/orders");
  await expect(page).toHaveURL(/\/account\?tab=orders/, { timeout: 30_000 });
});
