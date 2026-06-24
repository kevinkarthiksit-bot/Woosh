"use client";

import { cn } from "@/lib/utils";

export interface ChatMessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedActions?: string[];
}

interface ChatMessageProps {
  message: ChatMessageItem;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
      data-testid={`assistant-message-${message.role}`}
    >
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-gradient-to-r from-cyan to-blue text-white"
            : "border border-black/8 bg-white text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
