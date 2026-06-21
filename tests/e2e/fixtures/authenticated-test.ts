import { test as base, expect } from "@playwright/test";
import { applyAuthToContext, hasE2eSecrets } from "./auth-helpers";

export const test = base.extend({
  context: async ({ context }, use, testInfo) => {
    if (!hasE2eSecrets()) {
      testInfo.skip(true, "WOOSH_TEST_PHONE and WOOSH_TEST_OTP required");
    }

    const applied = await applyAuthToContext(context);
    if (!applied) {
      testInfo.skip(true, "Auth session not prepared — run auth setup first");
    }

    await use(context);
  },
});

export { expect };
