import { test } from "../fixtures/authenticated-test";
import { confirmBooking, fillBookingDetails } from "../fixtures/booking-helpers";

test("monthly membership booking flow (no slot step)", async ({ page }) => {
  await page.goto("/services/monthly-packages/book");
  await fillBookingDetails(page, "City");
  await confirmBooking(page);
});
