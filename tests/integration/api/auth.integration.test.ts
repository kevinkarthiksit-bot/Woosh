import { describe, expect, it } from "vitest";
import { clearAuth, getStoredToken } from "@/lib/api/auth";
import { loginTestUser } from "../helpers/auth";
import { hasIntegrationSecrets } from "../helpers/env";

describe.runIf(hasIntegrationSecrets())("auth integration", () => {
  it("completes OTP login and returns token", async () => {
    clearAuth();
    const { token, user } = await loginTestUser();
    expect(token).toBeTruthy();
    expect(user.phone).toBeTruthy();
    expect(getStoredToken()).toBe(token);
  });

  it("repeat login is idempotent", async () => {
    const first = await loginTestUser();
    const second = await loginTestUser();
    expect(second.token).toBeTruthy();
    expect(second.user.phone).toBe(first.user.phone);
  });
});
