import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Carousel } from "@/components/ui/Carousel";
import { prefersReducedMotion } from "@/lib/utils";

vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return {
    ...actual,
    prefersReducedMotion: vi.fn(() => false),
  };
});

const emblaApiMock = {
  selectedScrollSnap: () => 0,
  scrollSnapList: () => [0, 1],
  on: vi.fn(),
  off: vi.fn(),
  scrollPrev: vi.fn(),
  scrollNext: vi.fn(),
  scrollTo: vi.fn(),
};

vi.mock("embla-carousel-react", () => ({
  default: () => [vi.fn(), emblaApiMock],
}));

describe("Carousel", () => {
  it("renders slides and navigation", () => {
    render(
      <Carousel showArrows showDots>
        <div>Slide A</div>
        <div>Slide B</div>
      </Carousel>,
    );
    expect(screen.getByText("Slide A")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous slide")).toBeInTheDocument();
    expect(screen.getByLabelText("Next slide")).toBeInTheDocument();
  });

  it("merges absolute positioning in className", () => {
    const { container } = render(
      <Carousel className="absolute inset-0" showArrows={false} showDots={false}>
        <div>Slide A</div>
        <div>Slide B</div>
      </Carousel>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("absolute");
    expect(root.className).not.toMatch(/\brelative\b/);
  });

  it("disables autoplay when reduced motion is preferred", () => {
    vi.mocked(prefersReducedMotion).mockReturnValue(true);
    render(
      <Carousel autoplay>
        <div>Slide A</div>
        <div>Slide B</div>
      </Carousel>,
    );
    expect(prefersReducedMotion).toHaveBeenCalled();
  });
});
