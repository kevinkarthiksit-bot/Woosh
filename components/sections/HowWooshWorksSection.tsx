import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HowWooshWorksActions } from "@/components/sections/HowWooshWorksActions";
import { CalendarCheck, Car, MapPin, ReceiptText } from "lucide-react";

const steps = [
  {
    title: "Choose your care",
    description: "Pick car, bike, auto, daily cleaning, or a monthly plan with upfront pricing.",
    icon: Car,
  },
  {
    title: "Select a live slot",
    description: "Choose a date and time that works for your day. You can review before confirming.",
    icon: CalendarCheck,
  },
  {
    title: "Woosh comes to you",
    description: "A trained technician arrives at your parking spot with the right care products.",
    icon: MapPin,
  },
  {
    title: "Track everything",
    description: "Orders, vehicles, Woosh Coins, and referrals stay organized in your account.",
    icon: ReceiptText,
  },
];

export function HowWooshWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <Container>
        <SectionHeading
          eyebrow="How Woosh Works"
          title="Book premium doorstep care in minutes"
          subtitle="A simple flow with live availability, clear pricing, and account tracking from booking to completion."
        />

        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="rounded-3xl border border-black/8 bg-background-muted/60 p-5 shadow-card"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-2xl bg-cyan/10 p-3 text-cyan">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-bold text-muted">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-h3 text-foreground">{step.title}</h3>
                <p className="mt-2 text-caption text-muted">{step.description}</p>
              </article>
            );
          })}
        </div>

        <HowWooshWorksActions />
      </Container>
    </section>
  );
}
