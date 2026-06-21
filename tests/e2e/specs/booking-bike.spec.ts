import { test } from "../fixtures/authenticated-test";
import { confirmBooking, fillBookingDetails, fillScheduleIfNeeded } from "../fixtures/booking-helpers";

test("bike wash booking flow", async ({ page }) => {
  await page.goto("/services/bike-wash-and-care/book");
  await fillBookingDetails(page, "Activa");
  await fillScheduleIfNeeded(page);
  await confirmBooking(page);
});
