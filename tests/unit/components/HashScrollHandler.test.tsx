import { render } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { HashScrollHandler } from "@/components/HashScrollHandler";
import { scrollToSection } from "@/lib/utils";

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return {
    ...actual,
    scrollToSection: vi.fn(() => true),
  };
});

describe("HashScrollHandler", () => {
  beforeEach(() => {
    vi.mocked(scrollToSection).mockClear();
    mockUsePathname.mockReturnValue("/");
    window.location.hash = "#services";
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
  });

  it("scrolls to hash on home mount", () => {
    render(<HashScrollHandler />);
    expect(scrollToSection).toHaveBeenCalledWith("#services");
  });

  it("does nothing off home page", () => {
    mockUsePathname.mockReturnValue("/services/car-wash-and-care");
    render(<HashScrollHandler />);
    expect(scrollToSection).not.toHaveBeenCalled();
  });
});
