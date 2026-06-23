import { describe, expect, it } from "vitest";
import { getMyMembership } from "@/lib/api/memberships";
import { loginTestUser } from "../helpers/auth";
import { hasIntegrationSecrets } from "../helpers/env";
import { retryOnColdStart } from "../helpers/retry";

describe.runIf(hasIntegrationSecrets())("memberships integration", () => {
  it("GET /memberships/me returns membership or null", async () => {
    const { token } = await loginTestUser();
    const membership = await retryOnColdStart(() => getMyMembership(token));
    expect(membership === null || typeof membership === "object").toBe(true);
  });
});
