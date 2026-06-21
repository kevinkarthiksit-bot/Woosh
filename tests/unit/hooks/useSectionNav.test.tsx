import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useSectionNav } from "@/hooks/useSectionNav";
import { scrollToSection } from "@/lib/utils";

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return {
    ...actual,
    scrollToSection: vi.fn(actual.scrollToSection),
  };
});

describe("useSectionNav", () => {
  beforeEach(() => {
    vi.mocked(scrollToSection).mockClear();
    mockUsePathname.mockReturnValue("/");
    vi.stubGlobal("location", { assign: vi.fn() });
  });

  it("scrolls on home page", () => {
    const { result } = renderHook(() => useSectionNav());
    act(() => result.current.goToSection("#services"));
    expect(scrollToSection).toHaveBeenCalledWith("#services");
    expect(window.location.assign).not.toHaveBeenCalled();
  });

  it("navigates to home from service pages", () => {
    mockUsePathname.mockReturnValue("/services/car-wash-and-care");
    const { result } = renderHook(() => useSectionNav());
    act(() => result.current.goToSection("#home"));
    expect(window.location.assign).toHaveBeenCalledWith("/");
  });

  it("navigates to hash on home from other pages", () => {
    mockUsePathname.mockReturnValue("/services/car-wash-and-care");
    const { result } = renderHook(() => useSectionNav());
    act(() => result.current.goToSection("#contact"));
    expect(window.location.assign).toHaveBeenCalledWith("/#contact");
  });

  it("ignores non-hash hrefs", () => {
    const { result } = renderHook(() => useSectionNav());
    act(() => result.current.goToSection("/orders"));
    expect(scrollToSection).not.toHaveBeenCalled();
    expect(window.location.assign).not.toHaveBeenCalled();
  });
});
