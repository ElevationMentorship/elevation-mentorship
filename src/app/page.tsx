"use client";

import { useState } from "react";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatIOffer from "@/components/WhatIOffer";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <>
      <Navbar
        isContactModalOpen={isContactModalOpen}
        onOpenContactModal={openContactModal}
        onCloseContactModal={closeContactModal}
      />
      <HeroSection />
      <WhatIOffer />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection onOpenContactModal={openContactModal} />
    </>
  );
}
