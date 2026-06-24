import { AppDownloadSection } from "@/components/sections/AppDownloadSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DifferenceSection } from "@/components/sections/DifferenceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowWooshWorksSection } from "@/components/sections/HowWooshWorksSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TransformationsSection } from "@/components/sections/TransformationsSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyWooshSection } from "@/components/sections/WhyWooshSection";
import { WooshPrimeSection } from "@/components/sections/WooshPrimeSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <HowWooshWorksSection />
      <ServicesSection />
      <WooshPrimeSection />
      <WhyWooshSection />
      <DifferenceSection />
      <TestimonialsSection />
      <TransformationsSection />
      <AppDownloadSection />
      <ContactSection />
    </>
  );
}
