import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  buildSlotRange,
  dateToSlotKey,
  getAvailableSlots,
  getAvailableTimesForDate,
  getSlotTimes,
  toSlotRangeIso,
} from "@/lib/api/slots";
import { apiFetch } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
  apiFetch: vi.fn(),
}));

describe("slots helpers", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("formats ISO start-of-day", () => {
    const iso = toSlotRangeIso(new Date("2026-06-10T15:30:00.000Z"));
    expect(iso).toMatch(/2026-06-10T00:00:00.000Z/);
  });

  it("builds a date range", () => {
    const start = new Date("2026-06-05T00:00:00.000Z");
    const range = buildSlotRange(start, 7);
    expect(range.startDate).toBe("2026-06-05T00:00:00.000Z");
    expect(range.endDate).toBe("2026-06-12T00:00:00.000Z");
  });

  it("getSlotTimes returns API data", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      data: [{ time: "10:00 AM - 11:00 AM" }],
    });
    const times = await getSlotTimes();
    expect(times).toHaveLength(1);
    expect(times[0].time).toContain("10:00");
  });

  it("getAvailableSlots queries date range", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      data: { slotsByDate: { "2026-06-22": [{ id: "1", time: "9:00 AM - 10:00 AM" }] } },
    });
    const data = await getAvailableSlots("2026-06-05T00:00:00.000Z", "2026-06-12T00:00:00.000Z");
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining("/slots/available?"));
    expect(data.slotsByDate["2026-06-22"]).toHaveLength(1);
  });

  it("dateToSlotKey normalizes date strings", () => {
    expect(dateToSlotKey("2026-06-22")).toBe("2026-06-22");
    expect(dateToSlotKey(new Date("2026-06-22T12:00:00.000Z"))).toBe("2026-06-22");
  });

  it("getAvailableTimesForDate filters by date key", () => {
    const rangeData = {
      slotsByDate: {
        "2026-06-22": [
          { id: "a", time: "9:00 AM - 10:00 AM" },
          { id: "b", time: "10:00 AM - 11:00 AM" },
        ],
        "2026-06-23": [{ id: "c", time: "9:00 AM - 10:00 AM" }],
      },
    };
    expect(getAvailableTimesForDate("2026-06-22", rangeData)).toHaveLength(2);
    expect(getAvailableTimesForDate("2026-06-24", rangeData)).toHaveLength(0);
    expect(getAvailableTimesForDate("2026-06-22", null)).toHaveLength(0);
  });
});
