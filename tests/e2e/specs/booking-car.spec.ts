import { test } from "../fixtures/authenticated-test";
import { confirmBooking, fillBookingDetails, fillScheduleIfNeeded } from "../fixtures/booking-helpers";

test("car wash booking flow", async ({ page }) => {
  await page.goto("/services/car-wash-and-care/book");
  await fillBookingDetails(page, "Swift");
  await fillScheduleIfNeeded(page);
  await confirmBooking(page);
});
