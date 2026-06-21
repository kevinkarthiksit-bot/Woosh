import { describe, expect, it } from "vitest";
import {
  buildOrderPayload,
  computeSubtotal,
  computeWalletDeduction,
  formatInr,
  getSlugBookingConfig,
  pickServiceForSlug,
  slugToApiCategory,
} from "@/lib/api/mappers";

describe("mappers", () => {
  it("maps slugs to API categories", () => {
    expect(slugToApiCategory("car-wash-and-care")).toBe("CarWash");
    expect(slugToApiCategory("bike-wash-and-care")).toBe("BikeWash");
    expect(slugToApiCategory("monthly-packages")).toBe("Membership");
    expect(slugToApiCategory("auto-wash-and-care")).toBe("AutoWash");
    expect(slugToApiCategory("daily-cleaning-services")).toBe("CarWash");
  });

  it("builds one-time order payload", () => {
    const payload = buildOrderPayload({
      slug: "car-wash-and-care",
      serviceId: "abc123",
      address: "123 Main St",
      vehicleModel: "Swift",
      phone: "9876543210",
      name: "Test",
      scheduledDate: "2026-06-10",
      scheduledTimeSlot: "10:00 AM - 11:00 AM",
    });

    expect(payload.items[0].packageType).toBe("OneTime");
    expect(payload.items[0].scheduledDate).toBe("2026-06-10");
    expect(payload.customer.vehicleType).toBe("Car");
    expect(payload.customer.address).toBe("123 Main St");
    expect(payload.items[0].addOnIds).toEqual([]);
    expect(payload.walletUsedAmount).toBe(0);
  });

  it("builds one-time order with add-ons and wallet", () => {
    const payload = buildOrderPayload({
      slug: "car-wash-and-care",
      serviceId: "abc123",
      address: "123 Main St",
      vehicleModel: "Swift",
      phone: "9876543210",
      name: "Test",
      scheduledDate: "2026-06-10",
      scheduledTimeSlot: "10:00 AM - 11:00 AM",
      addOnIds: ["addon1"],
      walletUsedAmount: 50,
    });

    expect(payload.items[0].addOnIds).toEqual(["addon1"]);
    expect(payload.walletUsedAmount).toBe(50);
  });

  it("builds membership order without schedule", () => {
    const payload = buildOrderPayload({
      slug: "monthly-packages",
      serviceId: "mem1",
      address: "456 Road",
      vehicleModel: "City",
      phone: "9876543210",
    });

    expect(payload.items[0].packageType).toBe("Membership");
    expect(payload.items[0].scheduledDate).toBeUndefined();
  });

  it("picks service by slug keyword", () => {
    const services = [
      { _id: "1", name: "Daily Clean", category: "CarWash", basePrice: 199 },
      { _id: "2", name: "Premium Car Wash", category: "CarWash", basePrice: 499 },
    ];
    const daily = pickServiceForSlug("daily-cleaning-services", services);
    expect(daily?.name).toContain("Daily");

    const autoServices = [
      { _id: "1", name: "Quick Shine (Auto)", category: "AutoWash", basePrice: 299 },
      { _id: "2", name: "Power Clean (Auto Premium)", category: "AutoWash", basePrice: 399 },
    ];
    expect(pickServiceForSlug("auto-wash-and-care", autoServices)?.category).toBe("AutoWash");
  });

  it("computes subtotal and wallet deduction", () => {
    expect(computeSubtotal({ basePrice: 499 }, [{ basePrice: 99 }, { basePrice: 50 }])).toBe(648);
    expect(computeWalletDeduction(100, 200, true)).toBe(100);
    expect(computeWalletDeduction(300, 200, true)).toBe(200);
    expect(computeWalletDeduction(100, 200, false)).toBe(0);
  });

  it("formats INR currency", () => {
    expect(formatInr(499)).toMatch(/499/);
    expect(formatInr(499)).toMatch(/₹|INR/);
  });

  it("returns config for all slugs", () => {
    const slugs = [
      "car-wash-and-care",
      "bike-wash-and-care",
      "auto-wash-and-care",
      "monthly-packages",
      "daily-cleaning-services",
    ] as const;
    for (const slug of slugs) {
      expect(getSlugBookingConfig(slug).category).toBeTruthy();
    }
  });
});
