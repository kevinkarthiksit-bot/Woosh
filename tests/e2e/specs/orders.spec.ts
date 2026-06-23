import { test, expect } from "../fixtures/authenticated-test";
import { confirmBooking, completeBookingWizard } from "../fixtures/booking-helpers";

test("orders redirect shows account orders tab after booking", async ({ page }) => {
  await page.goto("/services/car-wash-and-care/book");
  await completeBookingWizard(page, "Swift");
  await confirmBooking(page);

  await page.getByRole("button", { name: /Go to my account/i }).click();
  await expect(page).toHaveURL(/\/account/, { timeout: 60_000 });
  await expect(page.getByTestId("orders-list")).toBeVisible({ timeout: 60_000 });
});
