"use client";

import { ChatPanel } from "@/components/assistant/ChatPanel";
import type { ChatMessageItem } from "@/components/assistant/ChatMessage";
import { useAuth } from "@/components/providers/AuthProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { AssistantApiError, postChat } from "@/lib/api/assistant";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const THREAD_KEY = "woosh_assistant_thread";

function readConversationId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return sessionStorage.getItem(THREAD_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function writeConversationId(id: string) {
  try {
    sessionStorage.setItem(THREAD_KEY, id);
  } catch {
    // Session continuity is helpful, but chat should still work if storage is blocked.
  }
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const ACTION_ROUTES: Record<string, string> = {
  book_car: "/services/car-wash-and-care/book",
  book_bike: "/services/bike-wash-and-care/book",
  book_auto: "/services/auto-wash-and-care/book",
  book_monthly: "/services/monthly-packages/book",
  book_daily: "/services/daily-cleaning-services/book",
  choose_another_slot: "/services/car-wash-and-care/book",
  collect_order_details: "/services/car-wash-and-care/book",
  edit_order_details: "/services/car-wash-and-care/book",
  open_account: "/account",
  support: "/#contact",
};

const BOOKING_ACTIONS = new Set([
  "book_car",
  "book_bike",
  "book_auto",
  "book_monthly",
  "book_daily",
  "choose_another_slot",
  "collect_order_details",
  "edit_order_details",
]);

function getFriendlyError(err: unknown): string {
  if (err instanceof AssistantApiError) {
    if (err.status === 408) return err.message;
    if (err.status === 429) {
      return "Woosh Concierge is helping several customers right now. Please try again in a minute.";
    }
    if (err.status >= 500 || err.status === 0) {
      return "Woosh Concierge is unavailable right now. You can still book from the services page or contact support.";
    }
  }

  return "Woosh Concierge could not answer that just now. Please try again or contact support.";
}

export function AssistantWidget() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleSuggestedAction = useCallback(
    (action: string) => {
      if (action === "login") {
        openAuthModal();
        return;
      }

      const route = ACTION_ROUTES[action];
      if (route) {
        if (route.startsWith("/#")) {
          window.location.hash = route.slice(1);
          setIsOpen(false);
          return;
        }

        if (BOOKING_ACTIONS.has(action)) {
          if (authLoading) return;
          if (!isAuthenticated) {
            openAuthModal(route);
          } else {
            router.push(route);
          }
          setIsOpen(false);
          return;
        }

        if (action === "open_account" && !isAuthenticated) {
          openAuthModal(route);
        } else {
          router.push(route);
        }
        setIsOpen(false);
      }
    },
    [authLoading, isAuthenticated, openAuthModal, router],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: ChatMessageItem = {
        id: makeId(),
        role: "user",
        content: trimmed,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await postChat({
          message: trimmed,
          conversation_id: readConversationId(),
          auth_state: isAuthenticated && token ? "authenticated" : "guest",
          session_token: token ?? undefined,
          metadata: user
            ? {
                customer: {
                  id: user.id,
                  phone: user.phone,
                  name: user.name,
                },
              }
            : undefined,
        });

        writeConversationId(response.conversation_id);

        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            content: response.reply,
            suggestedActions: response.suggested_actions,
          },
        ]);

        if (response.requires_login) {
          openAuthModal();
        }
      } catch (err) {
        setError(getFriendlyError(err));
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, isLoading, openAuthModal, token, user],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "focus-ring fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center",
          "rounded-full bg-gradient-to-r from-cyan to-blue text-white shadow-lg",
          "transition-transform hover:scale-105 lg:bottom-6",
          isOpen && "scale-105 ring-4 ring-cyan/20",
        )}
        aria-label={isOpen ? "Close Woosh Concierge" : "Open Woosh Concierge"}
        aria-expanded={isOpen}
        data-testid="assistant-launcher"
      >
        <span className="font-display text-sm font-bold">Ask</span>
      </button>

      <ChatPanel
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onClose={() => setIsOpen(false)}
        onSend={sendMessage}
        onSuggestedAction={handleSuggestedAction}
      />
    </>
  );
}
