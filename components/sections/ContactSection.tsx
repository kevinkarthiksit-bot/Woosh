"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useState } from "react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="section-padding bg-white">
      <Container>
        <SectionHeading
          eyebrow="Contact Us"
          title="We would love to hear from you"
          subtitle="Reach out for bookings, partnerships, or support. This form is frontend-only for now."
        />

        <div className="mx-auto max-w-2xl">
          <Card>
            {submitted ? (
              <p className="text-center text-muted">
                Thank you for your message. Our team will get back to you once contact workflows are
                connected.
              </p>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm text-foreground">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    required
                    className="focus-ring w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm text-foreground">
                    Email or phone
                  </label>
                  <input
                    id="contact-email"
                    required
                    className="focus-ring w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm text-foreground">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    className="focus-ring w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-foreground"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </Container>
    </section>
  );
}
