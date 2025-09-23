"use client";

import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const handleStartNow = () => {
    const launchpassUrl =
      "https://www.launchpass.com/emg---elevation-mentorship-group-/emg";

    // Open in new tab
    window.open(launchpassUrl, "_blank");
  };

  return (
    <section className="bg-black font-sans  mt-[100px] px-4 md:px-8 py-16 relative overflow-hidden">
      {/* Faded Grid Lines Background with Gradient Fade */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8 max-w-[683px]">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              You&apos;re Not{" "}
              <span className="bg-[#3ED5A8] text-white px-1  rounded-3xl inline-block">
                Lost
              </span>{" "}
              You Just Need Purpose &{" "}
              <span className="border-2 border-[#173D47] px-1  rounded-3xl inline-block">
                Guidance
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed">
            Transform your mindset, build real skills, and unlock{" "}
            <br className="hidden md:block" /> your FULL potential through
            direct mentorship.
          </p>

          {/* Start Now Button */}
          <button
            onClick={handleStartNow}
            className="bg-[#3ED5A8] text-white px-2 py-2 rounded-[12px] text-sm md:text-lg font-semibold flex items-center space-x-3 hover:bg-[#35c49a] transition-colors duration-200"
          >
            <span>Start Now</span>
            <Image
              src="/assets/arrow-right.svg"
              alt="Arrow Right"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[445px]">
            <Image
              src="/assets/hero-image.png"
              alt="Mentorship Coach"
              width={445}
              height={638.5}
              className=" h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
