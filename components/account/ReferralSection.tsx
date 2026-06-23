"use client";

import { Button } from "@/components/ui/Button";
import { formatInr } from "@/lib/api/mappers";
import type { ApiReferralInfo } from "@/lib/api/types";
import { getUserReferralInfo } from "@/lib/api/users";
import { useEffect, useState } from "react";

interface ReferralSectionProps {
  phone: string;
  token: string;
}

export function ReferralSection({ phone, token }: ReferralSectionProps) {
  const [referral, setReferral] = useState<ApiReferralInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getUserReferralInfo(phone, token);
        if (!cancelled) setReferral(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load referral info.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [phone, token]);

  const handleCopy = async () => {
    const code = referral?.referralCode;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy code. Select and copy manually.");
    }
  };

  if (loading) return <p className="text-muted">Loading referral info…</p>;
  if (error && !referral) return <p className="text-red-600">{error}</p>;

  const totalReferrals = referral?.totalReferrals ?? referral?.referralCount;
  const coinsEarned = referral?.coinsEarned ?? referral?.rewardsEarned;

  return (
    <div className="space-y-4" data-testid="account-referral-section">
      <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-card">
        <h3 className="font-display text-h3 text-foreground">Invite friends, earn Woosh Coins</h3>
        <p className="mt-2 text-sm text-muted">
          Share your code when friends sign up on Woosh. They get started faster, and you earn
          rewards on their first booking.
        </p>

        {referral?.referralCode ? (
          <div className="mt-5 rounded-2xl border border-cyan/20 bg-cyan/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan">Your code</p>
            <p className="mt-2 font-mono text-2xl font-bold text-foreground">{referral.referralCode}</p>
            <Button
              onClick={handleCopy}
              className="mt-4"
              data-testid="account-referral-copy"
            >
              {copied ? "Copied!" : "Copy code"}
            </Button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">Your referral code will appear here once available.</p>
        )}
      </div>

      {(totalReferrals != null || coinsEarned != null) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {totalReferrals != null ? (
            <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-card">
              <p className="text-sm text-muted">Referrals</p>
              <p className="mt-1 font-display text-h3 text-foreground">{totalReferrals}</p>
            </div>
          ) : null}
          {coinsEarned != null ? (
            <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-card">
              <p className="text-sm text-muted">Coins earned</p>
              <p className="mt-1 font-display text-h3 text-cyan">{formatInr(coinsEarned)}</p>
            </div>
          ) : null}
        </div>
      )}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
