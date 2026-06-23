import type { ApiMembership } from "@/lib/api/types";
import Link from "next/link";

interface MembershipBannerProps {
  membership: ApiMembership | null;
}

export function MembershipBanner({ membership }: MembershipBannerProps) {
  if (membership) {
    const planName = membership.planName ?? membership.name ?? membership.serviceName ?? "Woosh membership";
    const expiry = membership.expiresAt ?? membership.endDate;
    return (
      <div
        className="rounded-2xl border border-gold/30 bg-gold/10 p-5 shadow-card"
        data-testid="account-membership-active"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">Active membership</p>
        <p className="mt-1 font-semibold text-foreground">{planName}</p>
        {membership.status ? <p className="text-sm text-muted">Status: {membership.status}</p> : null}
        {expiry ? <p className="text-sm text-muted">Valid until {expiry}</p> : null}
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-black/8 bg-white p-5 shadow-card"
      data-testid="account-membership-upsell"
    >
      <p className="font-semibold text-foreground">Woosh Prime membership</p>
      <p className="mt-1 text-sm text-muted">Save on regular washes with a monthly package.</p>
      <Link href="/services/monthly-packages" className="mt-3 inline-block text-sm font-semibold text-cyan hover:underline">
        View plans →
      </Link>
    </div>
  );
}
