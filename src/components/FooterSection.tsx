"use client";

import React from "react";
import Image from "next/image";
import BookCallButton from "./BookCallButton";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-black  relative overflow-hidden">
      {/* Background Blur Image at top center */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <Image
          src="/assets/footer-blur-background.png"
          alt="Background Blur"
          width={533}
          height={468}
        />
      </div>

      <div className="relative  flex flex-col justify-between ">
        {/* Main Content */}
        <div className="flex-1  relative flex items-center justify-center px-8 py-[43px] md:py-[80px]">
          <div className="absolute inset-0 opacity-30">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
                backgroundSize: "100px 100px",
              }}
            ></div>
          </div>
          <div className="text-center z-10 max-w-[656px]">
            {/* Call to Action Heading */}
            <h2 className="text-white  text-base md:text-2xl lg:text-[40px] font-bold mb-4 leading-tight">
              You&apos;re Not Lost – You Just Need Purpose & Guidance
            </h2>

            {/* Subtitle */}
            <p className="text-gray-300 mx-auto max-w-xs text-sm  md:text-lg mb-7 leading-relaxed">
              Join today and take the first step toward building the life you
              deserve.
            </p>

            <div className="text-center flex items-center justify-center">
              <BookCallButton
                calLink="elevationmentorship"
                variant="primary"
                size="md"
                theme="dark"
              />
            </div>

       
          </div>
        </div>

        {/* Footer Bottom */}
        <div className=" px-8 py-[40px]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-white text-sm">
              © Copyright 2022, All Rights Reserved
            </div>

            {/* Footer Links */}
            <div className="flex space-x-8 text-sm">
              <a href="#" className="text-white  ">
                Support
              </a>
              <a href="#" className="text-white  ">
                Terms & Conditions
              </a>
              <a href="#" className="text-white  ">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
