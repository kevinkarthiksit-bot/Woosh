import { describe, expect, it } from "vitest";
import { buildSlotRange, getAvailableSlots, getAvailableTimesForDate, getSlotTimes } from "@/lib/api/slots";
import { hasIntegrationSecrets } from "../helpers/env";
import { retryOnColdStart } from "../helpers/retry";

describe.runIf(hasIntegrationSecrets())("slots integration", () => {
  it("GET /slots/times returns slot labels", async () => {
    const times = await retryOnColdStart(() => getSlotTimes());
    expect(times.length).toBeGreaterThan(0);
  });

  it("GET /slots/available returns slotsByDate map", async () => {
    const range = buildSlotRange(new Date(), 7);
    const available = await retryOnColdStart(() =>
      getAvailableSlots(range.startDate, range.endDate),
    );
    expect(available.slotsByDate).toBeDefined();
    const dates = Object.keys(available.slotsByDate);
    expect(dates.length).toBeGreaterThan(0);
    const firstDate = dates[0];
    const slots = getAvailableTimesForDate(firstDate, available);
    expect(slots.length).toBeGreaterThan(0);
    expect(slots[0].time).toBeTruthy();
    expect(slots[0].id).toBeTruthy();
  });
});
