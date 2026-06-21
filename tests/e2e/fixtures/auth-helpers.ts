import fs from "fs";
import path from "path";
import type { BrowserContext, Page } from "@playwright/test";

const authDir = path.join(__dirname, "../.auth");
export const sessionFile = path.join(authDir, "session.json");

export function hasE2eSecrets(): boolean {
  return Boolean(process.env.WOOSH_TEST_PHONE && process.env.WOOSH_TEST_OTP);
}

export async function loginViaUi(page: Page): Promise<void> {
  const phone = process.env.WOOSH_TEST_PHONE!;
  const otp = process.env.WOOSH_TEST_OTP!;

  await page.goto("/");
  await page.getByRole("button", { name: /Sign in \/ Sign up/i }).click();
  await page.getByTestId("auth-phone-input").fill(phone);
  await page.getByTestId("auth-send-otp").click();
  await page.getByTestId("auth-otp-input").fill(otp);
  await page.getByTestId("auth-verify-otp").click();
  await page.getByRole("button", { name: /Log out/i }).waitFor({ timeout: 60_000 });
}

export async function saveAuthSession(page: Page): Promise<void> {
  const session = await page.evaluate(() => ({
    token: sessionStorage.getItem("woosh_auth_token"),
    user: sessionStorage.getItem("woosh_auth_user"),
  }));

  fs.mkdirSync(authDir, { recursive: true });
  fs.writeFileSync(sessionFile, JSON.stringify(session));
}

export async function applyAuthToContext(context: BrowserContext): Promise<boolean> {
  if (!fs.existsSync(sessionFile)) return false;

  const session = JSON.parse(fs.readFileSync(sessionFile, "utf8")) as {
    token: string | null;
    user: string | null;
  };

  if (!session.token) return false;

  await context.addInitScript((data: { token: string | null; user: string | null }) => {
    if (data.token) sessionStorage.setItem("woosh_auth_token", data.token);
    if (data.user) sessionStorage.setItem("woosh_auth_user", data.user);
  }, session);

  return true;
}
