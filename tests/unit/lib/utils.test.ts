import { describe, expect, it, vi, beforeEach } from "vitest";
import { cn, scrollToSection } from "@/lib/utils";

describe("utils", () => {
  it("cn merges tailwind classes with tailwind-merge", () => {
    expect(cn("relative", "absolute")).toBe("absolute");
    expect(cn("px-4", "px-2")).toBe("px-2");
    expect(cn("text-red-500", false && "hidden", "font-bold")).toBe("text-red-500 font-bold");
  });

  describe("scrollToSection", () => {
    beforeEach(() => {
      document.body.innerHTML = "";
    });

    it("returns false when element is missing", () => {
      expect(scrollToSection("#missing")).toBe(false);
    });

    it("scrolls to element when present", () => {
      const el = document.createElement("div");
      el.id = "services";
      el.scrollIntoView = vi.fn();
      document.body.appendChild(el);

      expect(scrollToSection("#services")).toBe(true);
      expect(el.scrollIntoView).toHaveBeenCalled();
    });
  });
});
