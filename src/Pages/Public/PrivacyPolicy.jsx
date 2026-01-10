import React from "react";
import { FiUser, FiLock, FiShield, FiGlobe } from "react-icons/fi";

const PrivacyPolicy = () => {
  return (
    <section className="bg-base-100 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Hero Header */}
        <div className="text-center bg-primary/10 rounded-2xl py-10 px-6">
          <FiLock className="text-5xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl text-primary font-bold mb-2">Privacy Policy</h1>
          <p className="description">Last updated: January 2026</p>
        </div>

        {/* Section Cards */}
        <div className="grid gap-6">
          <Section
            icon={<FiUser />}
            title="Information We Collect"
            text="We collect personal information such as name, email address, and borrowing details to provide and improve our services."
          />

          <Section
            icon={<FiGlobe />}
            title="How We Use Your Information"
            text="Your information is used to manage accounts, process book requests, communicate updates, and enhance platform functionality."
          />

          <Section
            icon={<FiShield />}
            title="Data Security"
            text="We use industry-standard security measures including encryption and authentication to protect your personal data."
          />

          <Section
            icon={<FiLock />}
            title="Sharing of Information"
            text="BookCourier does not sell or rent user information. Data may only be shared with libraries or service providers necessary for operation."
          />

          <Section
            icon={<FiGlobe />}
            title="Cookies"
            text="We may use cookies to improve user experience, analyze usage, and personalize content."
          />

          <Section
            icon={<FiUser />}
            title="User Rights"
            text="Users have the right to access, update, or delete their personal information by contacting our support team."
          />

          <Section
            icon={<FiShield />}
            title="Third-Party Services"
            text="Our platform may include links or integrations with third-party services. We are not responsible for their privacy practices."
          />

          <Section
            icon={<FiLock />}
            title="Policy Updates"
            text="We may update this Privacy Policy periodically. Changes will be reflected on this page."
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

export default PrivacyPolicy;
