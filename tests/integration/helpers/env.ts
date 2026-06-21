export function hasIntegrationSecrets(): boolean {
  return Boolean(process.env.WOOSH_TEST_PHONE && process.env.WOOSH_TEST_OTP);
}

export function getTestPhone(): string {
  const phone = process.env.WOOSH_TEST_PHONE;
  if (!phone) throw new Error("WOOSH_TEST_PHONE is not set");
  return phone;
}

export function getTestOtp(): string {
  const otp = process.env.WOOSH_TEST_OTP;
  if (!otp) throw new Error("WOOSH_TEST_OTP is not set");
  return otp;
}

export const CI_TEST_ADDRESS_PREFIX = "WOOSH_CI_TEST";
