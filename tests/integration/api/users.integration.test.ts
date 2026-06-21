import { describe, expect, it } from "vitest";
import { addUserVehicle, getUserVehicles, getUserWallet } from "@/lib/api/users";
import { loginTestUser } from "../helpers/auth";
import { hasIntegrationSecrets } from "../helpers/env";
import { retryOnColdStart } from "../helpers/retry";

describe.runIf(hasIntegrationSecrets())("users integration", () => {
  it("lists vehicles and wallet for test user", async () => {
    const { token, user } = await loginTestUser();

    const vehicles = await retryOnColdStart(() => getUserVehicles(user.phone, token));
    expect(Array.isArray(vehicles)).toBe(true);

    const wallet = await retryOnColdStart(() => getUserWallet(user.phone, token));
    expect(typeof wallet.walletBalance).toBe("number");
  });

  it("adds a vehicle for test user", async () => {
    const { token, user } = await loginTestUser();
    const model = `CI Vehicle ${Date.now()}`;

    const vehicle = await retryOnColdStart(() =>
      addUserVehicle(user.phone, { vehicleType: "Car", vehicleModel: model }, token),
    );
    expect(vehicle._id).toBeTruthy();
    expect(vehicle.vehicleModel).toBe(model);

    const vehicles = await getUserVehicles(user.phone, token);
    expect(vehicles.some((v) => v.vehicleModel === model)).toBe(true);
  });
});
