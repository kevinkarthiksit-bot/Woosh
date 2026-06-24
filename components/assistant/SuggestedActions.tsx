"use client";

import { Button } from "@/components/ui/Button";

const ACTION_LABELS: Record<string, string> = {
  login: "Log in",
  book_car: "Book car wash",
  book_bike: "Book bike wash",
  book_auto: "Book auto wash",
  book_monthly: "View monthly plans",
  book_daily: "View daily cleaning",
  open_account: "My account",
  support: "Contact support",
  confirm_order: "Confirm booking",
  edit_order_details: "Edit details",
  collect_order_details: "Continue booking",
  choose_another_slot: "Choose another slot",
};

interface SuggestedActionsProps {
  actions: string[];
  onAction: (action: string) => void;
}

export function SuggestedActions({ actions, onAction }: SuggestedActionsProps) {
  if (!actions.length) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-1" data-testid="assistant-suggested-actions">
      {actions.map((action) => (
        <Button
          key={action}
          type="button"
          variant="secondary"
          className="min-h-9 rounded-full px-4 py-2 text-xs"
          onClick={() => onAction(action)}
          data-testid={`assistant-action-${action}`}
        >
          {ACTION_LABELS[action] ?? action.replace(/_/g, " ")}
        </Button>
      ))}
    </div>
  );
}
