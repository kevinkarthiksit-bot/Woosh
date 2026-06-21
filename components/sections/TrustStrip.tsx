import { Container } from "@/components/ui/Container";
import { trustMetrics, hasLiveTrustContent } from "@/lib/trust";

export function TrustStrip() {
  if (!hasLiveTrustContent) {
    return null;
  }

  return (
    <section className="border-y border-black/8 bg-white py-8" aria-label="Woosh highlights">
      <Container>
        <ul className="grid gap-6 sm:grid-cols-3">
          {trustMetrics
            .filter((m) => m.enabled)
            .map((metric) => (
              <li key={metric.id} className="text-center">
                <p className="font-display text-3xl font-bold text-cyan">{metric.value}</p>
                <p className="mt-1 text-caption text-muted">{metric.label}</p>
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
}
