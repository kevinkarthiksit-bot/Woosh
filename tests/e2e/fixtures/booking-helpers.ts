import { expect, type Page } from "@playwright/test";
import { tomorrowDateString, CI_TEST_ADDRESS } from "./test-data";

async function selectFirstService(page: Page): Promise<void> {
  const serviceButton = page.locator('[data-testid^="booking-service-"]').first();
  await serviceButton.waitFor({ timeout: 30_000 });
  await serviceButton.click();
  await page.getByTestId("booking-service-continue").click();
}

async function continueAddOnsIfVisible(page: Page): Promise<void> {
  const continueBtn = page.getByTestId("booking-addons-continue");
  if (await continueBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await continueBtn.click();
  }
}

async function fillVehicleStep(page: Page, vehicle = "Swift"): Promise<void> {
  const savedVehicle = page.locator('[data-testid^="booking-vehicle-"]').first();
  if (await savedVehicle.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await savedVehicle.click();
  } else {
    await page.getByTestId("booking-vehicle-new").fill(vehicle);
    const addBtn = page.getByRole("button", { name: "Add" });
    if (await addBtn.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await addBtn.click();
    }
  }
  await page.getByTestId("booking-vehicle-continue").click();
}

async function fillAddressStep(page: Page): Promise<void> {
  await page.getByTestId("booking-address").fill(CI_TEST_ADDRESS);
  await page.getByTestId("booking-address-continue").click();
}

export async function completeBookingWizard(page: Page, vehicle = "Swift"): Promise<void> {
  await page.getByTestId("booking-wizard").waitFor({ timeout: 60_000 });
  await selectFirstService(page);
  await continueAddOnsIfVisible(page);
  await fillVehicleStep(page, vehicle);
  await fillAddressStep(page);
  await fillScheduleIfNeeded(page);
}

export async function fillBookingDetails(page: Page, vehicle = "Swift"): Promise<void> {
  await completeBookingWizard(page, vehicle);
}

export async function fillScheduleIfNeeded(page: Page): Promise<void> {
  const dateInput = page.getByTestId("booking-schedule-date");
  if (await dateInput.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await dateInput.fill(tomorrowDateString());
    const slotButton = page.locator('[data-testid^="booking-slot-"]').first();
    await slotButton.waitFor({ timeout: 10_000 });
    await slotButton.click();
    await page.getByTestId("booking-schedule-continue").click();
  }
}

export async function confirmBooking(page: Page): Promise<void> {
  await page.getByRole("button", { name: /Confirm booking/i }).click();
  await expect(page.getByTestId("booking-success")).toBeVisible({ timeout: 90_000 });
}
