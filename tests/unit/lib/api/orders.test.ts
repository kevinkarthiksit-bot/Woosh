import { describe, expect, it, vi, beforeEach } from "vitest";
import { createOrder, getOrder, listOrders, validateCoupon } from "@/lib/api/orders";
import { apiFetch } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
  apiFetch: vi.fn(),
}));

describe("orders API", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("createOrder posts payload and returns order", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      data: { _id: "o1", orderNumber: "WOOSH-001" },
    });

    const order = await createOrder(
      {
        items: [],
        customer: { name: "Test", phone: "9876543210", address: "Addr", vehicleType: "Car" },
        walletUsedAmount: 0,
      },
      "token",
    );

    expect(order.orderNumber).toBe("WOOSH-001");
    expect(apiFetch).toHaveBeenCalledWith(
      "/orders",
      expect.objectContaining({ method: "POST", token: "token" }),
    );
  });

  it("listOrders returns array", async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, data: [{ _id: "o1" }] });
    const orders = await listOrders("token");
    expect(orders).toHaveLength(1);
  });

  it("getOrder returns single order", async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, data: { _id: "o1" } });
    const order = await getOrder("o1", "token");
    expect(order?._id).toBe("o1");
  });

  it("validateCoupon returns validation result", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      data: { valid: false, message: "Expired" },
    });
    const result = await validateCoupon("SAVE10", 499, "9876543210", "token");
    expect(result.valid).toBe(false);
  });
});
