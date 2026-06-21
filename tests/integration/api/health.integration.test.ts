import { describe, expect, it } from "vitest";
import { getServices } from "@/lib/api/services";
import { hasIntegrationSecrets } from "../helpers/env";
import { retryOnColdStart } from "../helpers/retry";

describe.runIf(hasIntegrationSecrets())("health integration", () => {
  it("GET /services returns active services", async () => {
    const services = await retryOnColdStart(() => getServices());
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
  });
});
