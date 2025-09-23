"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    setIsModalOpen(true);
    // Reset scroll position when opening modal
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar or modal is open
  useEffect(() => {
    if (isSidebarOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen, isModalOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 px-8 py-4 transition-all duration-300 ${
          isScrolled ? "bg-black/95 backdrop-blur-md" : ""
        }`}
      >
        {/* Faded Grid Lines Background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
              backgroundSize: "100px 100px",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
        </div>

        <div className="max-w-7xl font-sans mx-auto bg-[#0A1B1A]/10 rounded-full border border-[#173D47] px-8 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="Elevation Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-[#3ED5A8]"
                      : "text-white hover:text-[#3ED5A8]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleSidebar}
                className="text-white p-2 rounded-lg hover:bg-[#173D47] transition-colors duration-200 relative z-50"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Contact Us Button - Desktop Only */}
            <div className="hidden md:block">
              <button
                onClick={openModal}
                className="bg-transparent border border-[#173D47] text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2 backdrop-blur-[12px]"
              >
                <Image
                  src="/assets/phone-icon.svg"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#0A1B1A] border-r border-[#173D47] z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#173D47]">
          <Image
            src="/assets/logo.png"
            alt="Elevation Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
          <button
            onClick={closeSidebar}
            className="text-white p-2 rounded-lg hover:bg-[#173D47] transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="py-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeSidebar}
              className={`block px-6 py-4 text-lg font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-[#3ED5A8] bg-[#173D47]/20"
                  : "text-white hover:text-[#3ED5A8] hover:bg-[#173D47]/10"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Contact Button in Sidebar */}
        <div className="px-6 py-4 border-t border-[#173D47]">
          <button
            onClick={openModal}
            className="w-full bg-transparent border border-[#173D47] text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center space-x-2 backdrop-blur-[12px] hover:bg-[#173D47]/20 transition-colors duration-200"
          >
            <Image
              src="/assets/phone-icon.svg"
              alt="Phone"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Contact Us</span>
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
            onClick={closeModal}
          />

          {/* Modal Content - Fixed positioning and better centering */}
          <div className="fixed inset-0 font-sans flex items-start sm:items-center justify-center z-[90] p-4 overflow-y-auto">
            <div className="bg-black/90 border border-[#173D47] rounded-[12px] w-full max-w-2xl relative overflow-hidden my-4 sm:my-8">
              {/* Background Blur at top center */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/assets/modal-blur-background.png"
                  alt="Background Blur"
                  width={400}
                  height={300}
                  className="opacity-20"
                />
              </div>

              {/* Modal Header with Title and Close Button */}
              <div className="flex items-center justify-between px-4 pt-8 pb-6 relative z-10 border-b border-[#173D47]">
                <h2 className="text-white text-3xl lg:text-4xl font-bold">
                  Contact Form
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white cursor-pointer hover:text-[#3ED5A8] transition-colors duration-200 flex-shrink-0"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Form Content - Better height management */}
              <div className="px-4 pb-8 relative z-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <ContactForm onFormSubmit={closeModal} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Contact Form Component with Success/Error Modal
const ContactForm: React.FC<{ onFormSubmit?: () => void }> = ({
  onFormSubmit,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    areaOfInterest: "",
    message: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);

  const areaOptions = [
    "Personal Development & Wellbeing",
    "Finance & Wealth Creation",
    "Business, Marketing & Entrepreneurship",
    "Networking, Community & Specialized Mentoring",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAreaSelect = (area: string) => {
    setFormData((prev) => ({ ...prev, areaOfInterest: area }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setShowStatusModal(true);
        // Reset form
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          areaOfInterest: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          data.error || "An error occurred while submitting the form"
        );
        setShowStatusModal(true);
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setShowStatusModal(true);
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    if (submitStatus === "success" && onFormSubmit) {
      // Close the entire contact modal after successful submission
      setTimeout(() => {
        onFormSubmit();
      }, 300);
    }
  };

  return (
    <>
      <div className="space-y-6 font-sans pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-transparent border border-white/28 rounded-lg text-white placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-[#3ED5A8] transition-colors duration-200"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 bg-transparent border border-white/28 rounded-lg text-white placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-[#3ED5A8] transition-colors duration-200"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-transparent border border-white/28 rounded-lg text-white placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-[#3ED5A8] transition-colors duration-200"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Area of Interest - Custom Dropdown */}
          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2">
              Area of Interest
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  !isSubmitting && setIsDropdownOpen(!isDropdownOpen)
                }
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-transparent border border-white/28 rounded-lg text-left text-white focus:outline-none focus:border-[#3ED5A8] transition-colors duration-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  className={
                    formData.areaOfInterest ? "text-white" : "text-gray-400"
                  }
                >
                  {formData.areaOfInterest || "Select area of interest"}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
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
              </button>

              {isDropdownOpen && !isSubmitting && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0A1B1A] border border-white/28 rounded-lg shadow-xl z-20">
                  {areaOptions.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAreaSelect(option)}
                      className="w-full px-4 py-3 text-left text-white hover:bg-[#173D47]/20 hover:text-[#3ED5A8] transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Write short message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Please share more about your goals and how we can help..."
              rows={4}
              className="w-full px-4 py-3 bg-transparent border border-white/28 rounded-lg text-white placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-[#3ED5A8] transition-colors duration-200 resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Contact Info */}
          <div className="flex border-t border-white/28 flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-6">
            <div className="flex flex-col items-start space-y-1 text-gray-300">
              <Image
                src="/assets/mail-icon.svg"
                alt="Email"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-sm">Info@elevationmentorship.co.uk</span>
            </div>
            <div className="flex flex-col items-start space-y-1 text-gray-300">
              <Image
                src="/assets/instagram-icon.svg"
                alt="Instagram"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-sm">@elevation_mentorship_group</span>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting || !formData.areaOfInterest}
              className="w-full bg-[#3ED5A8] text-white px-12 py-[12px] rounded-[12px] font-semibold hover:bg-[#35c49a] transition-colors duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <Image
                    src="/assets/submit.svg"
                    alt="Arrow Right"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {showStatusModal && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
            onClick={closeStatusModal}
          />

          {/* Status Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-[90] p-4">
            <div className="bg-black/95 border border-[#173D47] rounded-[12px] w-full max-w-md p-6 relative">
              {submitStatus === "success" ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-bold">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-300">
                    Thank you for contacting us. We&apos;ll get back to you within
                    24-48 hours.
                  </p>
                  <button
                    onClick={closeStatusModal}
                    className="w-full bg-[#3ED5A8] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#35c49a] transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-bold">
                    Error Sending Message
                  </h3>
                  <p className="text-gray-300">{errorMessage}</p>
                  <button
                    onClick={closeStatusModal}
                    className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
