"use client";

import { ChatMessage, type ChatMessageItem } from "@/components/assistant/ChatMessage";
import { SuggestedActions } from "@/components/assistant/SuggestedActions";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FormEvent, useEffect, useRef, useState } from "react";

interface ChatPanelProps {
  isOpen: boolean;
  messages: ChatMessageItem[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onSend: (message: string) => void;
  onSuggestedAction: (action: string) => void;
}

const starterPrompts = [
  "Hi",
  "Help me choose the right wash",
  "How much is a monthly plan?",
  "Can I track my booking?",
  "I need help from support",
];

export function ChatPanel({
  isOpen,
  messages,
  isLoading,
  error,
  onClose,
  onSend,
  onSuggestedAction,
}: ChatPanelProps) {
  const [draft, setDraft] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusable.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    panel.addEventListener("keydown", trapFocus);
    return () => panel.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  const submitDraft = () => {
    const trimmed = draft.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setDraft("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitDraft();
  };

  if (!isOpen) return null;

  const lastAssistant = [...messages].reverse().find((item) => item.role === "assistant");

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Woosh Concierge chat"
      aria-modal="true"
      className="fixed bottom-32 right-4 z-50 flex h-[min(74vh,600px)] w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-3xl border border-black/10 bg-background shadow-2xl lg:bottom-24"
      data-testid="assistant-panel"
    >
      <header className="flex items-center justify-between border-b border-black/8 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan to-blue text-xs font-bold text-white shadow-accent">
            W
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-eco" aria-hidden />
          </span>
          <div>
            <p className="font-display text-sm font-bold text-foreground">Woosh Concierge</p>
            <p className="text-xs text-muted">Booking guidance, service help, and account support</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="focus-ring rounded-full px-2 py-1 text-sm text-muted hover:bg-black/5 hover:text-foreground"
          aria-label="Close assistant"
        >
          ✕
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-background-muted/60 px-3 py-4" aria-live="polite">
        {messages.length === 0 && !isLoading && (
          <div className="space-y-3 rounded-2xl border border-black/8 bg-white px-4 py-3">
            <p className="text-sm leading-relaxed text-muted">
              Hi, I am your Woosh Concierge. Tell me what you need and I can compare
              services, explain booking steps, or point you to the right account action.
            </p>
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => onSend(prompt)}
                  disabled={isLoading}
                  className="focus-ring rounded-full border border-black/10 px-3 py-2 text-left text-xs font-semibold text-foreground hover:border-cyan/50 hover:bg-cyan/5"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div
            className="inline-flex items-center gap-2 rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-muted shadow-sm"
            data-testid="assistant-loading"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" aria-hidden />
            Checking Woosh details...
          </div>
        )}
        {error && (
          <div className="space-y-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => onSuggestedAction("support")}
              className="focus-ring rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              Contact support
            </button>
          </div>
        )}
        {lastAssistant?.suggestedActions && lastAssistant.suggestedActions.length > 0 && (
          <SuggestedActions
            actions={lastAssistant.suggestedActions}
            onAction={onSuggestedAction}
          />
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-black/8 bg-white p-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={2}
            placeholder="Ask about services, slots, packages, or orders..."
            className={cn(
              "focus-ring max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border border-black/10",
              "bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted",
            )}
            aria-label="Message Woosh assistant"
            data-testid="assistant-input"
            disabled={isLoading}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submitDraft();
              }
            }}
          />
          <Button
            type="submit"
            className="min-h-[44px] shrink-0 rounded-2xl px-4"
            disabled={isLoading || !draft.trim()}
            data-testid="assistant-send"
            aria-label="Send message"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
