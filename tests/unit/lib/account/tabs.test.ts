import { describe, expect, it } from "vitest";
import { parseAccountTab } from "@/lib/account/tabs";

describe("account tabs", () => {
  it("parses tab query values", () => {
    expect(parseAccountTab("orders")).toBe("orders");
    expect(parseAccountTab("wallet")).toBe("wallet");
    expect(parseAccountTab("referral")).toBe("referral");
    expect(parseAccountTab(null)).toBe("overview");
    expect(parseAccountTab("invalid")).toBe("overview");
  });
});
