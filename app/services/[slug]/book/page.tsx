import { BookingWizard } from "@/components/booking/BookingWizard";
import { Container } from "@/components/ui/Container";
import { getServiceBySlug, services, type ServiceSlug } from "@/lib/services";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BookServicePage({ params }: BookPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="section-padding bg-white pt-28">
      <Container className="max-w-2xl">
        <BookingWizard slug={slug as ServiceSlug} />
      </Container>
    </div>
  );
}
