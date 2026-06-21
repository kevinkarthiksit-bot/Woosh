import { render, screen, fireEvent } from "@testing-library/react";
import type { ReactNode, MouseEvent } from "react";
import { describe, expect, it, vi } from "vitest";
import { Navbar } from "@/components/sections/Navbar";

const mockGoToSection = vi.fn();

vi.mock("@/hooks/useSectionNav", () => ({
  useSectionNav: () => ({
    goToSection: mockGoToSection,
    isHome: true,
  }),
}));

vi.mock("@/components/providers/AuthProvider", () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    logout: vi.fn(),
  }),
}));

vi.mock("@/components/providers/AuthModalProvider", () => ({
  useAuthModal: () => ({
    openAuthModal: vi.fn(),
  }),
}));

vi.mock("next/image", () => ({
  default: (props: { alt: string }) => <img alt={props.alt} />,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
  }: {
    children: ReactNode;
    href: string;
    onClick?: (e: MouseEvent) => void;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe("Navbar", () => {
  it("calls goToSection for primary nav links", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("link", { name: "Services" }));
    expect(mockGoToSection).toHaveBeenCalledWith("#services");
  });
});
