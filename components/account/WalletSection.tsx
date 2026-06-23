"use client";

import { formatInr } from "@/lib/api/mappers";
import type { ApiWallet, ApiWalletTransaction } from "@/lib/api/types";
import { getUserWallet } from "@/lib/api/users";
import { useEffect, useState } from "react";

interface WalletSectionProps {
  phone: string;
  token: string;
}

function formatTransactionDate(tx: ApiWalletTransaction): string | null {
  const raw = tx.createdAt ?? tx.date;
  if (!raw) return null;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function WalletSection({ phone, token }: WalletSectionProps) {
  const [wallet, setWallet] = useState<ApiWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getUserWallet(phone, token);
        if (!cancelled) setWallet(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load wallet.");
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

  if (loading) return <p className="text-muted">Loading Woosh Coins…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const transactions = wallet?.transactions ?? [];

  return (
    <div className="space-y-4" data-testid="account-wallet-section">
      <div className="rounded-2xl border border-cyan/20 bg-gradient-to-br from-cyan/10 to-blue/5 p-6 shadow-card">
        <p className="text-sm text-muted">Available balance</p>
        <p className="mt-1 font-display text-h1 text-cyan" data-testid="account-wallet-balance">
          {formatInr(wallet?.walletBalance ?? 0)}
        </p>
        <p className="mt-2 text-sm text-muted">Apply Woosh Coins at checkout on your next booking.</p>
      </div>

      <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-card">
        <h3 className="font-semibold text-foreground">Recent activity</h3>
        {transactions.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No transactions yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {transactions.map((tx, index) => {
              const label = tx.note ?? tx.description ?? tx.type ?? "Transaction";
              const amount = tx.amount ?? 0;
              const date = formatTransactionDate(tx);
              return (
                <li
                  key={`${label}-${date ?? index}`}
                  className="flex items-start justify-between gap-3 border-b border-black/5 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    {date ? <p className="text-xs text-muted">{date}</p> : null}
                  </div>
                  <p className={`text-sm font-semibold ${amount >= 0 ? "text-eco" : "text-foreground"}`}>
                    {amount >= 0 ? "+" : ""}
                    {formatInr(Math.abs(amount))}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
