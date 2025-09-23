"use client";

import React, { useState } from "react";
import Image from "next/image";

const FAQSection: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number>(0);

  const faqs = [
    {
      question: "What is EMG – Elevation Mentorship Group?",
      answer:
        "EMG is a mentorship and coaching platform dedicated to helping people grow in life",
    },
    {
      question: "Who can join EMG?",
      answer:
        "Anyone who is committed to personal growth and transformation can join EMG.",
    },
    {
      question: "What services do you provide?",
      answer:
        "We provide comprehensive mentorship services including personal development, business coaching, financial education, and wellness guidance.",
    },
    {
      question: "How do I get started?",
      answer:
        "You can get started by booking a free consultation call where we'll discuss your goals and how EMG can help you achieve them.",
    },
    {
      question: "Do I need prior experience?",
      answer:
        "No prior experience is needed. Our mentorship program is designed to meet you where you are and help you grow from there.",
    },
    {
      question: "Is EMG only about business and money?",
      answer:
        "No, EMG covers all aspects of life including personal development, relationships, health, wellness, and much more beyond just business and finance.",
    },
    {
      question: "How does the mentorship work?",
      answer:
        "Our mentorship includes one-on-one sessions, group coaching, educational resources, and ongoing support to help you achieve your goals.",
    },
    {
      question: "Can I connect with other members?",
      answer:
        "Yes, EMG has a strong community aspect where members can connect, share experiences, and support each other's growth journey.",
    },
    {
      question: "Is there support if I get stuck?",
      answer:
        "Absolutely! We provide ongoing support through direct mentoring, community help, and additional resources whenever you need assistance.",
    },
    {
      question: "Why should I join EMG?",
      answer:
        "EMG offers personalized mentorship, proven strategies, and a supportive community to help you achieve lasting transformation in all areas of your life.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? -1 : index);
  };

  return (
    <section className="bg-black min-h-screen px-8 py-4 md:py-16 relative overflow-hidden">
      {/* Background Blur Image at top center */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <Image
          src="/assets/faq-blur-background.png"
          alt="Background Blur"
          width={533}
          height={468}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6 md:mb-16">
          <p className="text-[#3ED5A8] text-sm md:text-lg font-medium mb-4">FAQ</p>
          <h2 className="text-white text-xl md:text-3xl lg:text-[40px] font-semibold">
            Few questions from our loved once
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-800">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-900/20 transition-colors duration-200"
              >
                <h3 className="text-white text-sm md:text-lg font-medium pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-white transform transition-transform duration-200 ${
                      openQuestion === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {openQuestion === index && (
                <div className="pb-6 pr-10">
                  <p className="text-gray-400 text-xs md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
