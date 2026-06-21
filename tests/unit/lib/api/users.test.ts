import { describe, expect, it, vi, beforeEach } from "vitest";
import { addUserVehicle, getUserVehicles, getUserWallet } from "@/lib/api/users";
import { apiFetch } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
  apiFetch: vi.fn(),
}));

describe("users API", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("getUserVehicles fetches saved vehicles", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      data: [{ _id: "v1", vehicleType: "Car", vehicleModel: "Swift" }],
    });
    const vehicles = await getUserVehicles("9876543210", "token");
    expect(vehicles).toHaveLength(1);
    expect(apiFetch).toHaveBeenCalledWith("/users/9876543210/vehicles", { token: "token" });
  });

  it("addUserVehicle posts vehicle body", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      data: { _id: "v2", vehicleType: "Bike", vehicleModel: "Activa" },
    });
    const vehicle = await addUserVehicle(
      "9876543210",
      { vehicleType: "Bike", vehicleModel: "Activa" },
      "token",
    );
    expect(vehicle.vehicleModel).toBe("Activa");
    expect(apiFetch).toHaveBeenCalledWith(
      "/users/9876543210/vehicles",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("getUserWallet returns balance", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      data: { walletBalance: 150, transactions: [] },
    });
    const wallet = await getUserWallet("9876543210", "token");
    expect(wallet.walletBalance).toBe(150);
  });
});
