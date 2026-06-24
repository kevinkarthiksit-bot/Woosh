import { Container } from "@/components/ui/Container";
import { trustMetrics, hasLiveTrustContent } from "@/lib/trust";

export function TrustStrip() {
  if (!hasLiveTrustContent) {
    return null;
  }

  return (
    <section className="border-y border-black/8 bg-white py-8" aria-label="Woosh highlights">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-3">
          {trustMetrics
            .filter((m) => m.enabled)
            .map((metric) => (
              <li
                key={metric.id}
                className="rounded-2xl border border-black/8 bg-background-muted/60 p-5 text-center"
              >
                <p className="font-display text-2xl font-bold text-cyan">{metric.value}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{metric.label}</p>
                {metric.description ? (
                  <p className="mt-2 text-caption text-muted">{metric.description}</p>
                ) : null}
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
}
