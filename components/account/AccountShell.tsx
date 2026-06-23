"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import type { ReactNode } from "react";

interface AccountShellProps {
  children: ReactNode;
}

export function AccountShell({ children }: AccountShellProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { openAuthModal } = useAuthModal();

  const greeting = user?.name || (user?.phone ? `+91 ${user.phone}` : "there");

  return (
    <div className="section-padding bg-background-muted pt-28">
      <Container className="max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow text-cyan">My account</p>
            <h1 className="font-display text-h1 text-foreground">Hello, {greeting}</h1>
            <p className="mt-2 text-body-lg text-muted">
              Track orders, Woosh Coins, and your referral rewards.
            </p>
          </div>
          <Link href="/#services" className="text-sm text-cyan hover:underline">
            Book a wash
          </Link>
        </div>

        {isLoading ? (
          <p className="mt-8 text-muted">Loading your account…</p>
        ) : !isAuthenticated ? (
          <div className="mt-8 space-y-4 rounded-2xl border border-black/8 bg-white p-6 shadow-card">
            <p className="text-muted">Sign in to view your account.</p>
            <Button onClick={() => openAuthModal("/account")}>Sign in / Sign up</Button>
          </div>
        ) : (
          <div className="mt-8 space-y-6">{children}</div>
        )}

        <Link href="/" className="mt-8 inline-block text-sm text-cyan hover:underline">
          ← Back home
        </Link>
      </Container>
    </div>
  );
}
