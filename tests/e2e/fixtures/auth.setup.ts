import { test as setup } from "@playwright/test";
import { hasE2eSecrets, loginViaUi, saveAuthSession } from "./auth-helpers";

setup("authenticate", async ({ page }) => {
  setup.skip(!hasE2eSecrets(), "WOOSH_TEST_PHONE and WOOSH_TEST_OTP required for auth setup");
  await loginViaUi(page);
  await saveAuthSession(page);
});
