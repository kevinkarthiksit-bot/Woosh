"use client";

import { AccountOverview } from "@/components/account/AccountOverview";
import { AccountShell } from "@/components/account/AccountShell";
import { AccountTabs } from "@/components/account/AccountTabs";
import { OrdersSection } from "@/components/account/OrdersSection";
import { ReferralSection } from "@/components/account/ReferralSection";
import { WalletSection } from "@/components/account/WalletSection";
import { useAuth } from "@/components/providers/AuthProvider";
import { sortOrdersNewestFirst } from "@/lib/account/orders";
import { parseAccountTab, type AccountTab } from "@/lib/account/tabs";
import { getMyMembership } from "@/lib/api/memberships";
import { listOrders } from "@/lib/api/orders";
import type { ApiMembership, ApiOrder, ApiReferralInfo } from "@/lib/api/types";
import { getUserReferralInfo, getUserVehicles, getUserWallet } from "@/lib/api/users";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

function AccountPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = parseAccountTab(searchParams.get("tab"));
  const { token, user, isAuthenticated, isLoading } = useAuth();

  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [referral, setReferral] = useState<ApiReferralInfo | null>(null);
  const [membership, setMembership] = useState<ApiMembership | null>(null);
  const [vehicles, setVehicles] = useState<Awaited<ReturnType<typeof getUserVehicles>>>([]);
  const [overviewLoading, setOverviewLoading] = useState(true);

  const setTab = useCallback(
    (tab: AccountTab) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tab === "overview") {
        params.delete("tab");
      } else {
        params.set("tab", tab);
      }
      const query = params.toString();
      router.replace(query ? `/account?${query}` : "/account", { scroll: false });
    },
    [router, searchParams],
  );

  useEffect(() => {
    if (isLoading || !isAuthenticated || !token || !user?.phone) {
      setOverviewLoading(false);
      return;
    }

    const authToken = token;
    const phone = user.phone;
    let cancelled = false;

    async function loadOverview() {
      setOverviewLoading(true);
      try {
        const [orderData, wallet, referralData, membershipData, vehicleData] = await Promise.all([
          listOrders(authToken),
          getUserWallet(phone, authToken),
          getUserReferralInfo(phone, authToken).catch(() => null),
          getMyMembership(authToken).catch(() => null),
          getUserVehicles(phone, authToken).catch(() => []),
        ]);
        if (cancelled) return;
        setOrders(sortOrdersNewestFirst(orderData));
        setWalletBalance(wallet.walletBalance ?? 0);
        setReferral(referralData);
        setMembership(membershipData);
        setVehicles(vehicleData);
      } catch {
        if (!cancelled) {
          setOrders([]);
        }
      } finally {
        if (!cancelled) setOverviewLoading(false);
      }
    }

    void loadOverview();
    return () => {
      cancelled = true;
    };
  }, [isLoading, isAuthenticated, token, user?.phone]);

  if (!isAuthenticated || !token || !user?.phone) {
    return <AccountShell>{null}</AccountShell>;
  }

  return (
    <AccountShell>
      <AccountTabs activeTab={activeTab} />

      {activeTab === "overview" ? (
        overviewLoading ? (
          <p className="text-muted">Loading overview…</p>
        ) : (
          <AccountOverview
            orders={orders}
            walletBalance={walletBalance}
            referral={referral}
            vehicles={vehicles}
            membership={membership}
            onViewOrders={() => setTab("orders")}
            onViewWallet={() => setTab("wallet")}
            onViewReferral={() => setTab("referral")}
          />
        )
      ) : null}

      {activeTab === "orders" ? <OrdersSection token={token} /> : null}
      {activeTab === "wallet" ? <WalletSection phone={user.phone} token={token} /> : null}
      {activeTab === "referral" ? <ReferralSection phone={user.phone} token={token} /> : null}
    </AccountShell>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<AccountShell><p className="text-muted">Loading account…</p></AccountShell>}>
      <AccountPageContent />
    </Suspense>
  );
}
