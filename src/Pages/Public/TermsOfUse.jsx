import React from "react";
import { FaFileContract, FaExclamationCircle, FaBookOpen, FaUsers, FaShieldAlt } from "react-icons/fa";

const TermsOfUse = () => {
  return (
    <section className="bg-base-100 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Hero Header */}
        <div className="text-center bg-primary/10 rounded-2xl py-14 px-6">
          <FaFileContract className="text-5xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl text-primary font-bold mb-2">Terms of Use</h1>
          <p className="description">Last updated: January 2026</p>
        </div>

        {/* Section Cards */}
        <div className="grid gap-6">
          <Section
            icon={<FaExclamationCircle />}
            title="Acceptance of Terms"
            text="By accessing or using BookCourier, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you may not use our services."
          />

          <Section
            icon={<FaBookOpen />}
            title="Description of Service"
            text="BookCourier is a library-to-home book delivery platform that allows users to browse books, request deliveries, and manage borrowing and returns digitally."
          />

          <Section
            icon={<FaUsers />}
            title="User Responsibilities"
            text="Users are responsible for providing accurate information, maintaining account security, and returning borrowed books within the agreed timeframe."
          />

          <Section
            icon={<FaShieldAlt />}
            title="Prohibited Activities"
            text="Users may not misuse the platform, attempt unauthorized access, submit false requests, or engage in activities that harm the system or other users."
          />

          <Section
            icon={<FaBookOpen />}
            title="Intellectual Property"
            text="All content, logos, designs, and software associated with BookCourier are the intellectual property of BookCourier and may not be copied or reused without permission."
          />

          <Section
            icon={<FaExclamationCircle />}
            title="Termination"
            text="We reserve the right to suspend or terminate user accounts that violate these terms or misuse the platform."
          />

          <Section
            icon={<FaShieldAlt />}
            title="Limitation of Liability"
            text="BookCourier is not responsible for delays, losses, or damages resulting from misuse of the platform or external service interruptions."
          />

          <Section
            icon={<FaFileContract />}
            title="Changes to Terms"
            text="We may update these Terms of Use from time to time. Continued use of the platform indicates acceptance of the updated terms."
          />
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 mt-16">
          © 2026 BookCourier. All rights reserved.
        </div>

      </div>
    </section>
  );
};

/* Reusable Section Component */
const Section = ({ icon, title, text }) => (
  <div className="flex gap-4 p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition">
    <div className="text-primary text-3xl mt-1">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="description">{text}</p>
    </div>
  </div>
);

export default TermsOfUse;
