import { test } from "../fixtures/authenticated-test";
import { confirmBooking, fillBookingDetails, fillScheduleIfNeeded } from "../fixtures/booking-helpers";

test("auto wash booking flow", async ({ page }) => {
  await page.goto("/services/auto-wash-and-care/book");
  await fillBookingDetails(page, "Auto Rickshaw");
  await fillScheduleIfNeeded(page);
  await confirmBooking(page);
});
