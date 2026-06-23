export type AccountTab = "overview" | "orders" | "wallet" | "referral";

export const ACCOUNT_TABS: Array<{ id: AccountTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Orders" },
  { id: "wallet", label: "Woosh Coins" },
  { id: "referral", label: "Referral" },
];

export function parseAccountTab(value: string | null): AccountTab {
  if (value === "orders" || value === "wallet" || value === "referral") return value;
  return "overview";
}
