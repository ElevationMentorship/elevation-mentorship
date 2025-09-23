"use client";

import React, { useEffect } from "react";
import Cal from "@calcom/embed-react";

interface CalModalProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent) => void;
  eventType: string;
  className?: string;
  setShowCalendar?: (show: boolean) => void;
  theme?: "light" | "dark" | "auto";
}

/**
 * Reusable Cal.com scheduling modal component
 */
const CalModal: React.FC<CalModalProps> = ({
  isOpen,
  onClose,
  eventType,
  className = "",
  setShowCalendar = () => {},
  theme = "dark",
}) => {
  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setShowCalendar(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, setShowCalendar]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className={`bg-white mx-4 dark:bg-gray-900 p-4 rounded-lg w-full max-w-4xl h-auto max-h-[90vh] relative ${className} overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowCalendar(false)}
          className="absolute top-2 cursor-pointer right-2 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label="Close calendar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Content */}
        <div className="relative  w-full flex items-center flex-col justify-center">
          <Cal
            calLink={eventType}
            config={{
              name: "Enter your name",
              email: "Enter your email address",
              theme: theme,
              layout: "month_view",
            }}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "70vh",
              border: "none",
              overflowY: "auto",
            }}
          />
        </div>

        {/* Keyboard Hint */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-400 text-xs bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded">
          Press ESC to close
        </div>
      </div>
    </div>
  );
};

export default CalModal;
