import { HeroSection } from "./_components/hero-section";
import { FeaturesSection } from "./_components/features-section";
import { UseCases } from "./_components/use-cases";
import { Companies } from "./_components/companies";
import { Testimonials } from "./_components/testimonials";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Companies />
      <FeaturesSection />
      <UseCases />
      <Testimonials />
      <Footer />
    </div>
  );
}

