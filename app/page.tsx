import { AppDownloadSection } from "@/components/sections/AppDownloadSection";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DifferenceSection } from "@/components/sections/DifferenceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TransformationsSection } from "@/components/sections/TransformationsSection";
import { WhyWooshSection } from "@/components/sections/WhyWooshSection";
import { WooshPrimeSection } from "@/components/sections/WooshPrimeSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WooshPrimeSection />
      <AppDownloadSection />
      <WhyWooshSection />
      <TestimonialsSection />
      <DifferenceSection />
      <TransformationsSection />
      <ContactSection />
      <BlogsSection />
    </>
  );
}
