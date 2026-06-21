import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { BookingWizard } from "@/components/booking/BookingWizard";

const mockOpenAuthModal = vi.fn();

vi.mock("@/components/providers/AuthProvider", () => ({
  useAuth: () => ({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),
}));

vi.mock("@/components/providers/AuthModalProvider", () => ({
  useAuthModal: () => ({
    openAuthModal: mockOpenAuthModal,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/api/services", () => ({
  getServices: vi.fn(),
}));

vi.mock("@/lib/api/slots", () => ({
  buildSlotRange: vi.fn(),
  getAvailableSlots: vi.fn(),
  getAvailableTimesForDate: vi.fn(),
  getSlotTimes: vi.fn(),
}));

vi.mock("@/lib/api/users", () => ({
  getUserVehicles: vi.fn(),
  addUserVehicle: vi.fn(),
  getUserWallet: vi.fn(),
}));

vi.mock("@/lib/api/orders", () => ({
  createOrder: vi.fn(),
  validateCoupon: vi.fn(),
}));

describe("BookingWizard", () => {
  beforeEach(() => {
    mockOpenAuthModal.mockReset();
  });

  it("opens auth modal when unauthenticated", async () => {
    render(<BookingWizard slug="car-wash-and-care" />);
    await waitFor(() =>
      expect(mockOpenAuthModal).toHaveBeenCalledWith("/services/car-wash-and-care/book"),
    );
    expect(screen.getByText(/Sign in with your phone/i)).toBeInTheDocument();
  });
});
