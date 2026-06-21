import { describe, expect, it } from "vitest";
import { getServices } from "@/lib/api/services";
import { hasIntegrationSecrets } from "../helpers/env";
import { retryOnColdStart } from "../helpers/retry";

describe.runIf(hasIntegrationSecrets())("services integration", () => {
  it("returns CarWash services", async () => {
    const services = await retryOnColdStart(() => getServices("CarWash"));
    expect(services.length).toBeGreaterThan(0);
  });

  it("returns BikeWash services", async () => {
    const services = await retryOnColdStart(() => getServices("BikeWash"));
    expect(services.length).toBeGreaterThan(0);
  });

  it("returns Membership services", async () => {
    const services = await retryOnColdStart(() => getServices("Membership"));
    expect(services.length).toBeGreaterThan(0);
  });
});
