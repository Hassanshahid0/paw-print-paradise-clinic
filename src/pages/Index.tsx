
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import VetSection from "@/components/VetSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import InfoSection from "@/components/InfoSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <VetSection />
        <TestimonialsSection />
        <CtaSection />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
