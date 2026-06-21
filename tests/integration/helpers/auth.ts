import { requestOtp, verifyOtp } from "@/lib/api/auth";
import { getTestOtp, getTestPhone } from "./env";

export async function loginTestUser() {
  const phone = getTestPhone();
  const otp = getTestOtp();
  await requestOtp(phone);
  return verifyOtp(phone, otp, "WOOSH CI Test");
}
