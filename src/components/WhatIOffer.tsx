"use client";

import React from "react";
import Image from "next/image";

const WhatIOffer: React.FC = () => {
  const offerings = [
    {
      icon: "/assets/networking-icon.svg",
      title: "Networking, Community & Specialized Mentoring",
      items: [
        "International Networking & Connections",
        "Community Interest / Youth Work Programs",
        "Combat Sports & Coaching Mentoring",
      ],
    },
    {
      icon: "/assets/personal-development-icon.svg",
      title: "Personal Development & Wellbeing",
      items: [
        "Direct Mentoring",
        "Life Coaching",
        "Relationship Advice",
        "Mental Health Support",
      ],
    },
    {
      icon: "/assets/finance-icon.svg",
      title: "Finance & Wealth Creation",
      items: [
        "Trading & Financial Market Education",
        "Money Management",
        "Property Investment",
        "Investment Strategies Beyond Trading (Real Estate, Funds, Crypto)",
      ],
    },
    {
      icon: "/assets/business-icon.svg",
      title: "Business, Marketing & Entrepreneurship",
      items: [
        "E-commerce",
        "Brand Building",
        "Digital Passive Income Education",
        "Business Learning & Development",
        "Marketing",
      ],
    },
  ];

  return (
    <section className="bg-black min-h-screen px-8 font-sans py-4 md:py-16 relative overflow-hidden">
      {/* Background Blur Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/assets/blur-background.png"
          alt="Background Blur"
          width={800}
          height={600}
          className="opacity-30"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-2 md:mb-16">
          <p className="text-[#3ED5A8] font-medium text-sm md:text-lg mb-2">
            What I Offer
          </p>
          <h2 className="text-white text-xl md:text-3xl lg:text-[40px] font-semibold mb-2">
            What You&apos;ll Get Inside The Mentorship
          </h2>
          <p className="text-gray-300 text-sm md:text-base  max-w-3xl mx-auto leading-relaxed">
            I&apos;m sharing my blueprint – proven strategies and compassionate
            mentorship to help you set clear goals, overcome obstacles, and
            build lasting success in your career, business, relationships, or
            personal growth.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="bg-transparent p-5 md:p-0  border-b md:border-b-0 md:border-l border-[#202026] md:pl-6 space-y-6"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full border border-[#202026] flex items-center justify-center">
                <Image
                  src={offering.icon}
                  alt={offering.title}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>

              {/* Title */}
              <h3 className="text-white text-xl font-medium leading-tight">
                {offering.title}
              </h3>

              {/* Items List */}
              <ul className="space-y-3">
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
        <div className="text-center mt-10 md:mt-[92px]">
          <button className="bg-transparent text-sm md:text-base border cursor-pointer border-[#3ED5A8] text-[#3ED5A8] p-[12px] rounded-full  font-semibold flex items-center space-x-2 mx-auto">
            <span>START NOW</span>
            <Image
              src="/assets/arrow-right-btn.svg"
              alt="Arrow Right"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatIOffer;
