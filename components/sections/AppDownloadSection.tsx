import { AppDownloadButtons } from "@/components/ui/AppDownloadButtons";
import { Container } from "@/components/ui/Container";

export function AppDownloadSection() {
  return (
    <section className="border-y border-black/8 bg-background-muted py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
              Woosh App
            </p>
            <h2 className="font-display text-h2 text-foreground">
              Book washes, track plans, earn Woosh Coins
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Download the Woosh app for easy scheduling, monthly plan management, and rewards on
              every referral.
            </p>
          </div>
          <AppDownloadButtons />
        </div>
      </Container>
    </section>
  );
}
