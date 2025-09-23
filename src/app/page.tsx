import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatIOffer from "@/components/WhatIOffer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatIOffer />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection/>
    </>
  );
}
