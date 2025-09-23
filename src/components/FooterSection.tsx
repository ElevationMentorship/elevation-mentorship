"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BookCallButton from "./BookCallButton";

interface FooterSectionProps {
  onOpenContactModal: () => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContactModal,
}) => {
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | null>(
    null
  );

  const openModal = (type: "terms" | "privacy") => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  // Handle keyboard navigation for modals
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeModal) {
        closeModal();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeModal]);

  return (
    <>
      <footer className="bg-black relative overflow-hidden">
        {/* Background Blur Image at top center */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <Image
            src="/assets/footer-blur-background.png"
            alt="Background Blur"
            width={533}
            height={468}
          />
        </div>

        <div className="relative flex flex-col justify-between">
          {/* Main Content */}
          <div className="flex-1 relative flex items-center justify-center px-4 md:px-8 py-[43px] md:py-[80px]">
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
              <h2 className="text-white text-base md:text-2xl lg:text-[40px] font-bold mb-4 leading-tight">
                You&apos;re Not Lost – You Just Need Purpose & Guidance
              </h2>

              {/* Subtitle */}
              <p className="text-gray-300 mx-auto max-w-xs text-sm md:text-lg mb-7 leading-relaxed">
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
          <div className="px-4 md:px-8 py-[40px]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-white text-sm">
                © Copyright 2025, All Rights Reserved
              </div>

              {/* Footer Links */}
              <div className="flex space-x-2 md:space-x-8 text-sm">
                <button
                  onClick={onOpenContactModal}
                  className="text-white cursor-pointer hover:text-[#3ED5A8] transition-colors duration-200"
                >
                  Support
                </button>
                <button
                  onClick={() => openModal("terms")}
                  className="text-white cursor-pointer hover:text-[#3ED5A8] transition-colors duration-200"
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => openModal("privacy")}
                  className="text-white hover:text-[#3ED5A8] cursor-pointer transition-colors duration-200"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {activeModal && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70]"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-[80] p-4">
            <div className="bg-black border border-[#173D47] rounded-[16px] w-full max-w-4xl max-h-[90vh] relative overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#173D47] sticky top-0 bg-black rounded-t-[16px] z-10">
                <h2 className="text-white text-xl md:text-2xl font-bold">
                  {activeModal === "terms"
                    ? "Terms & Conditions"
                    : "Privacy Policy"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white cursor-pointer hover:text-[#3ED5A8] transition-colors duration-200 flex-shrink-0 p-2 hover:bg-[#173D47] rounded-lg"
                  aria-label="Close modal"
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

              {/* Modal Body - Scrollable Content */}
              <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar rounded-b-[16px]">
                <div className="text-gray-300 space-y-6 text-sm md:text-base leading-relaxed pb-20">
                  {activeModal === "terms" ? (
                    <>
                      <div>
                        <p className="text-gray-400 mb-4">
                          Effective Date: 23-09-2025
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          1. Introduction
                        </h3>
                        <p>
                          Welcome to EMG Elevation Mentorship Group
                          (&apos;EMG,&apos; &apos;we,&apos; &apos;us,&apos; or
                          &apos;our&apos;). By accessing or using our website,
                          services, or membership programs
                          (&apos;Services&apos;), you agree to be bound by these
                          Terms and Conditions. If you do not agree, please do
                          not use our Services.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          2. Eligibility
                        </h3>
                        <p>
                          Our Services are available to individuals who are at
                          least 18 years old or have parental/guardian consent.
                          By using our Services, you confirm that you meet these
                          requirements.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          3. Membership & Payments
                        </h3>
                        <ul className="space-y-2 pl-4">
                          <li>
                            • Access to EMG&apos;s mentorship programs may
                            require payment of subscription fees through our
                            secure payment processor (Stripe/LaunchPass).
                          </li>
                          <li>
                            • Membership is personal and non-transferable.
                          </li>
                          <li>
                            • All fees are non-refundable except as required by
                            law or under our refund policy (if any).
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          4. Services Provided
                        </h3>
                        <p>
                          EMG offers mentorship resources, community access
                          (including a private Telegram group), and related
                          educational content. We reserve the right to modify or
                          discontinue any part of the Services at our
                          discretion.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          5. User Responsibilities
                        </h3>
                        <p className="mb-2">By participating, you agree to:</p>
                        <ul className="space-y-2 pl-4">
                          <li>
                            • Provide accurate information during registration.
                          </li>
                          <li>
                            • Maintain the confidentiality of your login
                            credentials.
                          </li>
                          <li>
                            • Use the Services for lawful purposes only and
                            refrain from sharing or reselling access.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          6. Code of Conduct
                        </h3>
                        <p>
                          Members must act respectfully toward mentors, staff,
                          and other members. Offensive, harassing, or
                          inappropriate behaviour may result in suspension or
                          termination of membership without refund.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          7. Intellectual Property
                        </h3>
                        <p>
                          All content, materials, and resources provided through
                          EMG remain our intellectual property or that of our
                          licensors. You may not reproduce, distribute, or
                          exploit content without prior written permission.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          8. Limitation of Liability
                        </h3>
                        <p>
                          EMG strives to provide high-quality mentorship but
                          does not guarantee specific results. We are not liable
                          for indirect, incidental, or consequential damages
                          arising from your participation in the program.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          9. Termination
                        </h3>
                        <p>
                          We may suspend or terminate your membership at any
                          time for violating these Terms. You may also cancel
                          your subscription through your account settings.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          10. Policy Updates
                        </h3>
                        <p>
                          We may update these Terms periodically. Continued use
                          of the Services after updates constitutes acceptance
                          of the new Terms.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          11. Contact Information
                        </h3>
                        <p>
                          If you have any questions about these Terms, please
                          contact us at:{" "}
                          <a
                            href="mailto:info@elevationmentorship.co.uk"
                            className="text-[#3ED5A8] hover:underline"
                          >
                            info@elevationmentorship.co.uk
                          </a>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-gray-400 mb-4">
                          Effective Date: 23-09-2025
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          1. Introduction
                        </h3>
                        <p>
                          This Privacy Policy explains how EMG Elevation
                          Mentorship Group (&apos;EMG,&apos; &apos;we,&apos;
                          &apos;us,&apos; or &apos;our&apos;) collects, uses,
                          and protects your personal information when you use
                          our Services.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          2. Information We Collect
                        </h3>
                        <p className="mb-2">
                          We may collect the following types of information:
                        </p>
                        <ul className="space-y-2 pl-4">
                          <li>
                            • Personal Information: Name, email address, payment
                            details (processed securely by Stripe/Launch), and
                            other details you provide when registering.
                          </li>
                          <li>
                            • Usage Information: Data about how you use our
                            website and Services (e.g., log data, cookies).
                          </li>
                          <li>
                            • Communication Data: Messages and support requests
                            you send to us.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          3. How We Use Your Information
                        </h3>
                        <p className="mb-2">We use your information to:</p>
                        <ul className="space-y-2 pl-4">
                          <li>• Provide and manage your membership.</li>
                          <li>• Process payments securely.</li>
                          <li>
                            • Send transactional emails, including welcome
                            emails and Telegram access links.
                          </li>
                          <li>
                            • Communicate updates, support responses, and
                            optional newsletters.
                          </li>
                          <li>• Improve and personalize our Services.</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          4. Sharing Your Information
                        </h3>
                        <p className="mb-2">
                          We do not sell your personal information. We only
                          share it with:
                        </p>
                        <ul className="space-y-2 pl-4">
                          <li>
                            • Service providers (such as Stripe and LaunchPass
                            for payment processing).
                          </li>
                          <li>• Legal authorities if required by law.</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          5. Cookies and Tracking
                        </h3>
                        <p>
                          We may use cookies or similar technologies to improve
                          your user experience and analyse website performance.
                          You can control cookies through your browser settings.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          6. Data Retention
                        </h3>
                        <p>
                          We retain your personal information only as long as
                          necessary to provide Services and comply with legal
                          obligations.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          7. Data Security
                        </h3>
                        <p>
                          We implement appropriate technical and organisational
                          measures to protect your personal information from
                          unauthorised access, alteration, disclosure, or
                          destruction.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          8. Your Rights
                        </h3>
                        <p className="mb-2">
                          Depending on your location, you may have the right to:
                        </p>
                        <ul className="space-y-2 pl-4">
                          <li>
                            • Access, update, or delete your personal
                            information.
                          </li>
                          <li>• Opt out of marketing communications.</li>
                          <li>
                            • Request a copy of the data we hold about you.
                          </li>
                        </ul>
                        <p className="mt-2">
                          You can exercise these rights by contacting us at{" "}
                          <a
                            href="mailto:info@elevationmentorship.co.uk"
                            className="text-[#3ED5A8] hover:underline"
                          >
                            info@elevationmentorship.co.uk
                          </a>
                          .
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          9. Children&apos;s Privacy
                        </h3>
                        <p>
                          Our Services are not directed at children under 13 (or
                          the minimum age required in your country). We do not
                          knowingly collect personal information from children.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          10. Policy Updates
                        </h3>
                        <p>
                          We may update this Privacy Policy from time to time.
                          Updates will be posted on our website, and the
                          effective date will be revised accordingly.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3">
                          11. Contact Information
                        </h3>
                        <p>
                          If you have questions about this Privacy Policy or our
                          data practices, please contact us at:{" "}
                          <a
                            href="mailto:info@elevationmentorship.co.uk"
                            className="text-[#3ED5A8] hover:underline"
                          >
                            info@elevationmentorship.co.uk
                          </a>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer with Close Button */}
              <div className="sticky bottom-0 bg-black border-t border-[#173D47] px-6 py-4 rounded-b-[16px]">
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-[#3ED5A8] cursor-pointer text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#35c49a] transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FooterSection;
