"use client";

import { ACCOUNT_TABS, type AccountTab } from "@/lib/account/tabs";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface AccountTabsProps {
  activeTab: AccountTab;
}

export function AccountTabs({ activeTab }: AccountTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <nav
      className="flex gap-2 overflow-x-auto pb-1"
      aria-label="Account sections"
      data-testid="account-tabs"
    >
      {ACCOUNT_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            data-testid={`account-tab-${tab.id}`}
            onClick={() => setTab(tab.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              isActive ? "bg-cyan text-white" : "bg-black/5 text-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
