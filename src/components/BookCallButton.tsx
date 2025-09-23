"use client";

import React, { useState } from "react";
import Image from "next/image";
import CalModal from "./CalModal";

interface BookCallButtonProps {
  calLink: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  theme?: "light" | "dark" | "auto";
  buttonText?: string;
  showArrow?: boolean;
  arrowIconSrc?: string;
}

const BookCallButton: React.FC<BookCallButtonProps> = ({
  calLink,
  variant = "secondary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  theme = "dark",
  buttonText = "BOOK A FREE CALL NOW",
  showArrow = true,
  arrowIconSrc = "/assets/arrow-right-btn.svg",
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleBookCallClick = () => {
    setShowCalendar(true);
  };

  const handleCalendarClose = (event: React.MouseEvent) => {
    // Only close if clicking on the overlay (not the modal content)
    if (event.target === event.currentTarget) {
      setShowCalendar(false);
    }
  };

  // Variant styles
  const variantStyles = {
    primary:
      "bg-[#3ED5A8] border-[#3ED5A8] text-sm md:text-base text-white p-[12px] rounded-full font-semibold flex items-center space-x-2 mx-auto ",
    secondary: "bg-transparent text-[#3ED5A8] border-[#3ED5A8]",
    outline: "bg-transparent text-white border-white ",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-[12px] py-[12px] text-xs",
    md: "px-[12px] py-[12px] text-sm md:text-base",
    lg: "px-[12px] py-[12px] text-base md:text-lg",
  };

  const baseStyles = `
    border rounded-full font-semibold 
    transition-all duration-200 
    hover:scale-105 active:scale-95
    flex items-center justify-center space-x-2
    focus:outline-none focus:ring-2 focus:ring-[#3ED5A8] focus:ring-offset-2 focus:ring-offset-black
    cursor-pointer
  `;

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <>
      <button
        onClick={handleBookCallClick}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${widthStyle}
          ${className}
        `.trim()}
        aria-label="Book a free call"
      >
        {children || (
          <>
            <span>{buttonText}</span>
            {showArrow && variant === "secondary" && (
              <Image
                src={arrowIconSrc}
                alt=""
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
              />
            )}

            {showArrow && variant === "primary" && (
              <Image
                src="/assets/arrow-right-white.svg"
                alt=""
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
              />
            )}
          </>
        )}
      </button>

      {/* Cal.com Modal */}
      <CalModal
        isOpen={showCalendar}
        onClose={handleCalendarClose}
        eventType={calLink}
        setShowCalendar={setShowCalendar}
        theme={theme}
      />
    </>
  );
};

export default BookCallButton;
