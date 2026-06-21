import { describe, expect, it } from "vitest";
import { getPublicMedia } from "@/lib/api/media";
import { hasIntegrationSecrets } from "../helpers/env";
import { retryOnColdStart } from "../helpers/retry";

describe.runIf(hasIntegrationSecrets())("media integration", () => {
  it("GET /media/public returns an object", async () => {
    const media = await retryOnColdStart(() => getPublicMedia());
    expect(media).toBeTypeOf("object");
  });
});
