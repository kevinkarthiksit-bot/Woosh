import { test, expect } from "@playwright/test";

test("service page navigates home to hero @no-auth", async ({ page }) => {
  await page.goto("/services/car-wash-and-care");
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL(/\/(\#home)?$/);
  await expect(page.locator("#home")).toBeVisible();
});

test("services hash navigation from home @no-auth", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/#services/);
});

test("logo returns to home @no-auth", async ({ page }) => {
  await page.goto("/services/bike-wash-and-care");
  await page.getByRole("link", { name: /Woosh logo|Woosh/i }).first().click();
  await expect(page).toHaveURL(/\/(\#home)?$/);
});
