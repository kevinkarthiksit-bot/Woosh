import { describe, expect, it } from "vitest";
import {
  getActiveOrderStatusQuery,
  isActiveOrder,
  sortOrdersNewestFirst,
} from "@/lib/account/orders";
import type { ApiOrder } from "@/lib/api/types";

describe("account order helpers", () => {
  it("sorts orders newest first", () => {
    const orders: ApiOrder[] = [
      { _id: "1", status: "Pending", createdAt: "2026-06-01T00:00:00.000Z" },
      { _id: "2", status: "Completed", createdAt: "2026-06-10T00:00:00.000Z" },
    ];
    expect(sortOrdersNewestFirst(orders).map((o) => o._id)).toEqual(["2", "1"]);
  });

  it("detects active orders", () => {
    expect(isActiveOrder({ _id: "1", status: "Scheduled" })).toBe(true);
    expect(isActiveOrder({ _id: "2", status: "Completed" })).toBe(false);
  });

  it("builds active status query", () => {
    expect(getActiveOrderStatusQuery()).toContain("Pending");
    expect(getActiveOrderStatusQuery()).toContain("In Progress");
  });
});
