import { test, expect } from "@playwright/test";
import { serviceSlugs } from "../fixtures/test-data";

for (const slug of serviceSlugs) {
  test(`service detail ${slug} renders Book CTA @no-auth`, async ({ page }) => {
    await page.goto(`/services/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: /Book a Wash/i })).toBeVisible();
  });
}
