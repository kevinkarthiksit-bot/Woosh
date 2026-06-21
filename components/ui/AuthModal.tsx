"use client";



import { useAuth } from "@/components/providers/AuthProvider";

import { useAuthModal } from "@/components/providers/AuthModalProvider";

import { Button } from "@/components/ui/Button";

import { Modal } from "@/components/ui/Modal";

import { isValidIndianPhone, normalizePhone } from "@/lib/api/auth";

import { useRouter } from "next/navigation";

import { useCallback, useState } from "react";



type Step = "phone" | "otp";



export function AuthModal() {

  const router = useRouter();

  const { isOpen, closeAuthModal, redirectAfterLogin } = useAuthModal();

  const { sendOtp, confirmOtp } = useAuth();

  const [step, setStep] = useState<Step>("phone");

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  const resetForm = useCallback(() => {

    setStep("phone");

    setPhone("");

    setOtp("");

    setName("");

    setError("");

    setLoading(false);

  }, []);



  const handleClose = useCallback(() => {

    closeAuthModal();

    resetForm();

  }, [closeAuthModal, resetForm]);



  const handleSendOtp = async () => {

    if (!isValidIndianPhone(phone)) {

      setError("Enter a valid 10-digit Indian mobile number.");

      return;

    }

    setError("");

    setLoading(true);

    try {

      await sendOtp(phone);

      setStep("otp");

    } catch (err) {

      setError(err instanceof Error ? err.message : "Could not send OTP. Try again.");

    } finally {

      setLoading(false);

    }

  };



  const handleVerifyOtp = async () => {

    if (otp.replace(/\D/g, "").length !== 6) {

      setError("Enter the 6-digit OTP.");

      return;

    }

    setError("");

    setLoading(true);

    try {

      await confirmOtp(phone, otp, name);

      handleClose();

      if (redirectAfterLogin) {

        router.push(redirectAfterLogin);

      }

    } catch (err) {

      setError(err instanceof Error ? err.message : "Invalid OTP. Try again.");

    } finally {

      setLoading(false);

    }

  };



  const modalTitle = step === "phone" ? "Sign in / Sign up" : "Verify your number";



  return (

    <Modal open={isOpen} onClose={handleClose} title={modalTitle}>

      <div className="space-y-5">

        {step === "phone" ? (

          <p className="text-body text-muted">

            We&apos;ll send a one-time code to your mobile number. New and returning users use the

            same flow.

          </p>

        ) : (

          <p className="text-body text-muted">

            Enter the 6-digit code we sent to{" "}

            <span className="font-medium text-foreground">{normalizePhone(phone)}</span>.

          </p>

        )}



        {step === "phone" ? (

          <>

            <div>

              <label htmlFor="auth-phone" className="mb-2 block text-sm font-medium text-foreground">

                Phone number

              </label>

              <input

                id="auth-phone"

                data-testid="auth-phone-input"

                type="tel"

                inputMode="numeric"

                autoComplete="tel"

                value={phone}

                onChange={(event) => setPhone(event.target.value)}

                placeholder="98765 43210"

                className="focus-ring w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-foreground placeholder:text-muted/60"

              />

            </div>

            {error ? (

              <p className="text-sm text-red-600" data-testid="auth-error">

                {error}

              </p>

            ) : null}

            <Button

              onClick={handleSendOtp}

              disabled={loading}

              className="w-full"

              data-testid="auth-send-otp"

            >

              {loading ? "Sending…" : "Send OTP"}

            </Button>

          </>

        ) : (

          <>

            <div>

              <label htmlFor="auth-otp" className="mb-2 block text-sm font-medium text-foreground">

                OTP

              </label>

              <input

                id="auth-otp"

                data-testid="auth-otp-input"

                type="text"

                inputMode="numeric"

                maxLength={6}

                value={otp}

                onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}

                placeholder="6-digit code"

                className="focus-ring w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-foreground placeholder:text-muted/60"

              />

            </div>

            <div>

              <label htmlFor="auth-name" className="mb-2 block text-sm font-medium text-foreground">

                Your name <span className="font-normal text-muted">(optional)</span>

              </label>

              <input

                id="auth-name"

                type="text"

                autoComplete="name"

                value={name}

                onChange={(event) => setName(event.target.value)}

                placeholder="Your name"

                className="focus-ring w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-foreground placeholder:text-muted/60"

              />

            </div>

            {error ? (

              <p className="text-sm text-red-600" data-testid="auth-error">

                {error}

              </p>

            ) : null}

            <Button

              onClick={handleVerifyOtp}

              disabled={loading}

              className="w-full"

              data-testid="auth-verify-otp"

            >

              {loading ? "Verifying…" : "Verify & continue"}

            </Button>

            <button

              type="button"

              onClick={() => {

                setStep("phone");

                setOtp("");

                setError("");

              }}

              className="focus-ring w-full text-sm text-cyan hover:underline"

            >

              Change phone number

            </button>

          </>

        )}

      </div>

    </Modal>

  );

}


