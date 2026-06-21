import { test } from "../fixtures/authenticated-test";
import { confirmBooking, fillBookingDetails, fillScheduleIfNeeded } from "../fixtures/booking-helpers";

test("daily cleaning booking flow", async ({ page }) => {
  await page.goto("/services/daily-cleaning-services/book");
  await fillBookingDetails(page, "i20");
  await fillScheduleIfNeeded(page);
  await confirmBooking(page);
});
