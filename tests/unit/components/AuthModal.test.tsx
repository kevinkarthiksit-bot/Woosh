import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { AuthModal } from "@/components/ui/AuthModal";

const mockSendOtp = vi.fn();
const mockConfirmOtp = vi.fn();
const mockCloseAuthModal = vi.fn();
const mockPush = vi.fn();

vi.mock("@/components/providers/AuthProvider", () => ({
  useAuth: () => ({
    sendOtp: mockSendOtp,
    confirmOtp: mockConfirmOtp,
  }),
}));

vi.mock("@/components/providers/AuthModalProvider", () => ({
  useAuthModal: () => ({
    isOpen: true,
    closeAuthModal: mockCloseAuthModal,
    redirectAfterLogin: null,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("AuthModal", () => {
  beforeEach(() => {
    mockSendOtp.mockReset();
    mockConfirmOtp.mockReset();
    mockCloseAuthModal.mockReset();
    mockPush.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows sign in / sign up title", () => {
    render(<AuthModal />);
    expect(screen.getByRole("heading", { name: /sign in \/ sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/one-time code to your mobile number/i)).toBeInTheDocument();
  });

  it("shows validation error for invalid phone", async () => {
    render(<AuthModal />);
    fireEvent.click(screen.getByTestId("auth-send-otp"));
    expect(await screen.findByTestId("auth-error")).toHaveTextContent(/valid 10-digit/i);
    expect(mockSendOtp).not.toHaveBeenCalled();
  });

  it("advances to OTP step on valid phone", async () => {
    mockSendOtp.mockResolvedValue(undefined);
    render(<AuthModal />);
    fireEvent.change(screen.getByTestId("auth-phone-input"), { target: { value: "9876543210" } });
    fireEvent.click(screen.getByTestId("auth-send-otp"));
    await waitFor(() => expect(screen.getByTestId("auth-otp-input")).toBeInTheDocument());
    expect(mockSendOtp).toHaveBeenCalledWith("9876543210");
  });

  it("shows error for short OTP", async () => {
    mockSendOtp.mockResolvedValue(undefined);
    render(<AuthModal />);
    fireEvent.change(screen.getByTestId("auth-phone-input"), { target: { value: "9876543210" } });
    fireEvent.click(screen.getByTestId("auth-send-otp"));
    await screen.findByTestId("auth-otp-input");
    fireEvent.change(screen.getByTestId("auth-otp-input"), { target: { value: "123" } });
    fireEvent.click(screen.getByTestId("auth-verify-otp"));
    expect(await screen.findByTestId("auth-error")).toHaveTextContent(/6-digit OTP/i);
  });
});
