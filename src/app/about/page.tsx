"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const AboutPage: React.FC = () => {
  const offerings = [
    {
      icon: "/assets/trading-icon.svg",
      title: "TRADING & FINANCIAL MARKETS",
      items: [
        "8+ years of successful trading experience",
        "CEO of Tradex Capital",
        "Experienced in FX and Futures markets",
      ],
    },
    {
      icon: "/assets/ecommerce-icon.svg",
      title: "E-COMMERCE & BRAND MANAGEMENT",
      items: [
        "Multi-brand portfolio owner",
        "6+ years as industry educator",
        "Successful brand development",
      ],
    },
    {
      icon: "/assets/combat-sports-icon.svg",
      title: "COMBAT SPORTS",
      items: [
        "Former Kickboxing & Boxing Champion",
        "Gym Owner of Evolution Combat Academy",
        "Successful Fight Promoter & Manager",
        "Owner of successful MMA/Combat Sport shows such as BLOODLINE FIGHT SERIES, ECMMA, EFL",
        "Combat Sport Coach (Professional and amateur athletes). Coached multiple UK ranked No.1 fighters, including World, European, British, English, and Area champions",
        "Manager of fighters across the UK & Europe",
        "Co-fouder of Combat Tix",
      ],
    },
    {
      icon: "/assets/community-icon.svg",
      title: "COMMUNITY AND YOUTH",
      items: [
        "Co-Founder of Evolution Impact Initiative",
        "Community interest and youth work program",
      ],
    },
    {
      icon: "/assets/music-icon.svg",
      title: "MUSIC",
      items: ["DJ", "Producer", "Events Organizer"],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-black font-sans mt-[100px] min-h-screen px-4 md:px-8 py-4 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-10 md:mb-20">
            <h1 className="text-white text-xl md:text-3xl lg:text-[40px] font-bold leading-tight">
              From Setbacks To Success –<br />
              Now It&apos;s Your Turn
            </h1>
          </div>

          {/* First Section - Image Left, Text Right */}
          <div className="flex flex-col md:flex-row justify-between gap-12 items-center mb-20">
            <div className="order-1 lg:order-1">
              <div className=" overflow-hidden">
                <Image
                  src="/assets/about-image-1.png"
                  alt="Mentorship session"
                  width={446}
                  height={300}
                  className=" h-auto object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="max-w-lg lg:ml-8">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Well known for my journey from a challenging past to a
                  successful and positive future, I&apos;ve now inspired many to
                  pursue a positive and ambitious path. My core belief is that
                  your circumstances should not dictate your destiny; rather,
                  purpose and guidance are the key to unlocking YOUR FULL
                  potential.
                </p>
              </div>
            </div>
          </div>

          {/* Second Section - Text Left, Image Right */}
          <div className="flex flex-col md:flex-row justify-between gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="max-w-lg lg:mr-8">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  With years of experience teaching and mentoring across diverse
                  fields, marked by a high success rate in student
                  transformation, I am now poised to broaden my impact and
                  extend the reach of my work. Let&apos;s turn setbacks to
                  purpose driven action, embrace discipline, with consistent
                  practical steps that create lasting momentum in every aspect
                  of your life. You&apos;re not lost, you just need purpose and
                  guidance. I&apos;m here to show you how to turn everything
                  around!
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className=" overflow-hidden">
                <Image
                  src="/assets/about-image-2.png"
                  alt="Teaching and presentation"
                  width={446}
                  height={300}
                  className=" h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Areas of Expertise Section */}
      <section className="bg-black px-4 py-4 md:px-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-center text-xl md:text-3xl lg:text-[40px] font-semibold mb-16">
            Areas Of Expertise
          </h2>

          {/* Container for the custom layout */}
          <div className="space-y-12">
            {/* First row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {offerings.slice(0, 3).map((offering, index) => (
                <div key={index} className="bg-transparent p-5  space-y-3">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full border border-[#404047] flex items-center justify-center">
                    <Image
                      src={offering.icon}
                      alt={offering.title}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg font-medium leading-tight">
                    {offering.title}
                  </h3>

                  {/* Items List */}
                  <ul className="space-y-1">
                    {offering.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-white text-sm leading-relaxed"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Second row - 2 cards centered */}
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
              {offerings.slice(3, 5).map((offering, index) => (
                <div
                  key={index + 3}
                  className="bg-transparent p-5  space-y-3 flex-1 "
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full border border-[#404047] flex items-center justify-center">
                    <Image
                      src={offering.icon}
                      alt={offering.title}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg font-medium leading-tight">
                    {offering.title}
                  </h3>

                  {/* Items List */}
                  <ul className="space-y-1">
                    {offering.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-white text-sm leading-relaxed"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default AboutPage;
