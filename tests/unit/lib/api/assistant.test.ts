import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  AssistantApiError,
  getAssistantApiUrl,
  isAssistantConfigured,
  postChat,
} from "@/lib/api/assistant";

describe("postChat", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => ({
          reply: "You can book a Woosh wash from the services page.",
          intent: "faq",
          conversation_id: "conv-1",
          request_id: "req-1",
          requires_login: false,
          confidence: "high",
          sources: [],
          actions: [],
          suggested_actions: ["book_car"],
        }),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.NEXT_PUBLIC_ASSISTANT_API_URL;
  });

  it("posts to /chat with guest payload", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        reply: "Hello",
        intent: "faq",
        conversation_id: "conv-1",
        request_id: "req-1",
        requires_login: false,
        confidence: "high",
        sources: [],
        actions: [],
        suggested_actions: [],
      }),
    }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await postChat({
      message: "How do I book?",
      auth_state: "guest",
    });

    expect(result.reply).toBe("Hello");
    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/chat");
    expect(options.method).toBe("POST");
    const body = JSON.parse(String(options.body));
    expect(body.auth_state).toBe("guest");
    expect(body.channel).toBe("website");
  });

  it("throws AssistantApiError on failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 503,
        json: async () => ({ detail: "Service unavailable" }),
      })),
    );

    await expect(
      postChat({ message: "Hello", auth_state: "guest" }),
    ).rejects.toMatchObject({ status: 503, message: "Service unavailable" });
  });

  it("uses configured assistant URL", () => {
    process.env.NEXT_PUBLIC_ASSISTANT_API_URL = "https://assistant.test";
    expect(getAssistantApiUrl()).toBe("https://assistant.test");
  });

  it("defaults assistant URL to localhost", () => {
    expect(getAssistantApiUrl()).toBe("http://localhost:8000");
  });

  it("rejects chat when assistant URL is unset on a public site", async () => {
    vi.stubGlobal("window", {
      location: { hostname: "preview.getwoosh.com" },
    });
    process.env.NEXT_PUBLIC_ASSISTANT_API_URL = "";

    await expect(
      postChat({ message: "Hello", auth_state: "guest" }),
    ).rejects.toMatchObject({
      status: 0,
      message: expect.stringContaining("not connected yet"),
    });
  });

  it("rejects chat when assistant URL points to localhost on a public site", async () => {
    vi.stubGlobal("window", {
      location: { hostname: "preview.getwoosh.com" },
    });

    await expect(
      postChat({ message: "Hello", auth_state: "guest" }),
    ).rejects.toMatchObject({
      status: 0,
      message: expect.stringContaining("not connected yet"),
    });
  });

  it("allows localhost assistant URL on localhost", () => {
    vi.stubGlobal("window", {
      location: { hostname: "localhost" },
    });

    expect(isAssistantConfigured()).toBe(true);
  });
});

describe("AssistantApiError", () => {
  it("exposes status", () => {
    const error = new AssistantApiError(400, "Bad request");
    expect(error.status).toBe(400);
    expect(error.name).toBe("AssistantApiError");
  });
});
