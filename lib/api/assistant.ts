export type AssistantAuthState = "guest" | "authenticated";

export type AssistantIntent =
  | "faq"
  | "account_required"
  | "order_status"
  | "new_order"
  | "support_handoff"
  | "fallback";

export interface AssistantSource {
  title: string;
  content: string;
  confidence: number;
}

export interface AssistantActionResult {
  name: string;
  status: string;
  data?: Record<string, unknown>;
}

export interface AssistantCustomerMetadata {
  phone?: string;
  name?: string;
  id?: string;
}

export interface ChatRequest {
  message: string;
  conversation_id?: string;
  auth_state: AssistantAuthState;
  session_token?: string;
  channel?: string;
  metadata?: {
    customer?: AssistantCustomerMetadata;
    [key: string]: unknown;
  };
}

export interface ChatResponse {
  reply: string;
  intent: AssistantIntent;
  conversation_id: string;
  request_id: string;
  requires_login: boolean;
  confidence: string;
  sources: AssistantSource[];
  actions: AssistantActionResult[];
  suggested_actions: string[];
}

const DEFAULT_ASSISTANT_URL = "http://localhost:8000";
const LOCAL_ASSISTANT_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/i;
const ASSISTANT_TIMEOUT_MS = 30000;
const ASSISTANT_NOT_CONFIGURED_MESSAGE =
  "Woosh Concierge is not connected yet. You can still book from the services page or contact support.";

export function getAssistantApiUrl(): string {
  return process.env.NEXT_PUBLIC_ASSISTANT_API_URL ?? DEFAULT_ASSISTANT_URL;
}

/** True when the widget can call a reachable assistant API from the current page. */
export function isAssistantConfigured(): boolean {
  const url = getAssistantApiUrl().trim();
  if (!url) return false;

  if (typeof window === "undefined") return true;

  const pointsToLocalhost = LOCAL_ASSISTANT_PATTERN.test(url);
  const onLocalhost = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
  return !pointsToLocalhost || onLocalhost;
}

export class AssistantApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AssistantApiError";
    this.status = status;
  }
}

function makeRequestId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function postChat(request: ChatRequest): Promise<ChatResponse> {
  if (!isAssistantConfigured()) {
    throw new AssistantApiError(0, ASSISTANT_NOT_CONFIGURED_MESSAGE);
  }

  const baseUrl = getAssistantApiUrl().replace(/\/$/, "");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ASSISTANT_TIMEOUT_MS);
  let response: Response;

  try {
    response = await fetch(`${baseUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": makeRequestId(),
      },
      body: JSON.stringify({
        channel: "website",
        ...request,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    throw new AssistantApiError(
      timedOut ? 408 : 0,
      timedOut
        ? "Woosh Concierge is taking longer than expected. Please try again."
        : "Woosh Concierge is unavailable right now. Please try again shortly.",
    );
  } finally {
    clearTimeout(timeoutId);
  }

  let json: ChatResponse | { detail?: string };
  try {
    json = (await response.json()) as ChatResponse | { detail?: string };
  } catch {
    throw new AssistantApiError(response.status, "Invalid response from assistant");
  }

  if (!response.ok) {
    const message =
      typeof json === "object" && json && "detail" in json && typeof json.detail === "string"
        ? json.detail
        : `Assistant request failed (${response.status})`;
    throw new AssistantApiError(response.status, message);
  }

  return json as ChatResponse;
}
