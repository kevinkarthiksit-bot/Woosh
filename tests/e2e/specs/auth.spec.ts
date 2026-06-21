import { test, expect } from "@playwright/test";
import { hasE2eSecrets } from "../fixtures/auth-helpers";

test("OTP login flow @no-auth", async ({ page }) => {
  test.skip(!hasE2eSecrets(), "WOOSH_TEST_PHONE and WOOSH_TEST_OTP required");

  const phone = process.env.WOOSH_TEST_PHONE!;
  const otp = process.env.WOOSH_TEST_OTP!;

  await page.goto("/");
  await page.getByRole("button", { name: /Sign in \/ Sign up/i }).click();
  await page.getByTestId("auth-phone-input").fill(phone);
  await page.getByTestId("auth-send-otp").click();
  await page.getByTestId("auth-otp-input").fill(otp);
  await page.getByTestId("auth-verify-otp").click();

  await expect(page.getByRole("button", { name: /Log out/i })).toBeVisible({ timeout: 60_000 });

  await page.getByRole("button", { name: /Log out/i }).click();
  await expect(page.getByRole("button", { name: /Sign in \/ Sign up/i })).toBeVisible();
});
