import { describe, expect, it } from "vitest";
import { getFlowSteps } from "@/lib/booking/steps";

describe("booking flow steps", () => {
  it("car wash includes service through review with addons and schedule", () => {
    expect(getFlowSteps("car-wash-and-care")).toEqual([
      "service",
      "addons",
      "vehicle",
      "address",
      "schedule",
      "review",
    ]);
  });

  it("membership skips addons and schedule", () => {
    expect(getFlowSteps("monthly-packages")).toEqual(["service", "vehicle", "address", "review"]);
  });
});
