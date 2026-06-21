import { test, expect } from "../fixtures/authenticated-test";
import { confirmBooking, completeBookingWizard } from "../fixtures/booking-helpers";

test("orders page shows order cards after booking", async ({ page }) => {
  await page.goto("/services/car-wash-and-care/book");
  await completeBookingWizard(page, "Swift");
  await confirmBooking(page);

  await page.getByRole("button", { name: /View my orders/i }).click();
  await expect(page.getByTestId("orders-list")).toBeVisible({ timeout: 60_000 });
  await expect(page.locator('[data-testid^="order-"]').first()).toBeVisible();
});
