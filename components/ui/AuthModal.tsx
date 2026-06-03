"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AuthMode = "phone" | "email";

export function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModal();
  const [mode, setMode] = useState<AuthMode>("phone");
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    closeAuthModal();
    setSubmitted(false);
    setError("");
    setValue("");
  };

  const handleContinue = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError(`Please enter your ${mode === "phone" ? "phone number" : "email address"}.`);
      return;
    }

    if (mode === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (mode === "phone" && trimmed.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} title="Login / Sign Up">
      {submitted ? (
        <div className="space-y-4 text-center">
          <p className="text-muted">
            Thanks! We&apos;ll continue your {mode === "phone" ? "phone" : "email"} sign-in flow
            once authentication is connected.
          </p>
          <Button onClick={handleClose} className="w-full">
            Close
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-2 rounded-full border border-black/8 bg-background-muted p-1">
            {(["phone", "email"] as AuthMode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setMode(option);
                  setError("");
                }}
                className={cn(
                  "focus-ring min-h-[44px] rounded-full px-4 py-2 text-sm font-medium capitalize transition",
                  mode === option ? "bg-cyan text-white" : "text-muted hover:text-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="auth-input" className="mb-2 block text-sm font-medium text-foreground">
              {mode === "phone" ? "Phone number" : "Email address"}
            </label>
            <input
              id="auth-input"
              type={mode === "phone" ? "tel" : "email"}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={mode === "phone" ? "+91 98765 43210" : "you@example.com"}
              className="focus-ring w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-foreground placeholder:text-muted/60"
            />
            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          </div>

          <Button onClick={handleContinue} className="w-full">
            Continue
          </Button>
        </div>
      )}
    </Modal>
  );
}
