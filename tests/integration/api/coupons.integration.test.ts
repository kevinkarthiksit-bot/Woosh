import { describe, expect, it } from "vitest";
import { validateCoupon } from "@/lib/api/orders";
import { loginTestUser } from "../helpers/auth";
import { hasIntegrationSecrets } from "../helpers/env";
import { retryOnColdStart } from "../helpers/retry";

describe.runIf(hasIntegrationSecrets())("coupons integration", () => {
  it("invalid coupon returns valid: false", async () => {
    const { token, user } = await loginTestUser();
    const result = await retryOnColdStart(() =>
      validateCoupon("WOOSH_INVALID_COUPON_XYZ", 499, user.phone, token),
    );
    expect(result.valid).toBe(false);
  });
});
