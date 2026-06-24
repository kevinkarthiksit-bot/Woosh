import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SuggestedActions } from "@/components/assistant/SuggestedActions";

describe("SuggestedActions", () => {
  it("renders login chip and calls handler", () => {
    const onAction = vi.fn();
    render(<SuggestedActions actions={["login", "book_car"]} onAction={onAction} />);

    fireEvent.click(screen.getByTestId("assistant-action-login"));
    expect(onAction).toHaveBeenCalledWith("login");
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Book car wash")).toBeInTheDocument();
  });
});
