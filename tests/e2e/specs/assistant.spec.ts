import { test, expect } from "@playwright/test";

const mockChatResponse = {
  reply: "You can book a Woosh car wash from our booking flow.",
  intent: "faq",
  conversation_id: "e2e-conv-1",
  request_id: "e2e-req-1",
  requires_login: false,
  confidence: "high",
  sources: [{ title: "Booking", content: "Use the book flow.", confidence: 0.9 }],
  actions: [],
  suggested_actions: ["book_car"],
};

test.beforeEach(async ({ page }) => {
  await page.route("**/chat", async (route) => {
    if (route.request().method() !== "POST") {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockChatResponse),
    });
  });
});

test("assistant launcher opens panel and sends guest FAQ @no-auth", async ({ page }) => {
  await page.goto("/");

  const launcher = page.getByTestId("assistant-launcher");
  await expect(launcher).toBeVisible();
  await launcher.click();

  const panel = page.getByTestId("assistant-panel");
  await expect(panel).toBeVisible();

  await page.getByTestId("assistant-input").fill("How do I book a car wash?");
  await page.getByTestId("assistant-send").click();

  await expect(page.getByTestId("assistant-message-assistant")).toContainText(
    "booking flow",
  );
  await expect(page.getByTestId("assistant-action-book_car")).toBeVisible();
});

test("escape closes assistant panel @no-auth", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("assistant-launcher").click();
  await expect(page.getByTestId("assistant-panel")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("assistant-panel")).not.toBeAttached();
});
