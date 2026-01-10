import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="whitebg py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= Hero ================= */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl text-primary font-bold">Contact Us</h1>
          <p className="text-lg description max-w-3xl mx-auto">
            Have questions, suggestions, or need assistance?
            Reach out to us — we’re here to help.
          </p>
        </div>

        {/* ================= Contact Info Cards ================= */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <ContactCard
            icon={<FaEnvelope />}
            title="Email"
            text="support@bookcourier.com"
          />
          <ContactCard
            icon={<FaPhoneAlt />}
            title="Phone"
            text="+880 1234-567890"
          />
          <ContactCard
            icon={<FaMapMarkerAlt />}
            title="Location"
            text="Dhaka, Bangladesh"
          />
        </div>

        {/* ================= Form + Info ================= */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <div className="p-8 graybg rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-semibold mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <button className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h2 className="text-2xl text-primary font-semibold">
              Why Contact BookCourier?
            </h2>

            <p className="description leading-relaxed">
              Whether you are a reader looking for assistance, a library
              interested in joining our platform, or a user with feedback,
              we value your communication.
            </p>

            <p className="description leading-relaxed">
              Our support team ensures timely responses and works continuously
              to improve the BookCourier experience for everyone.
            </p>

            <div className="bg-base-200 rounded-xl p-6">
              <p className="font-medium">⏰ Support Hours</p>
              <p className="description">
                Sunday – Thursday: 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* ================= Closing ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl text-primary font-bold">
            Let’s Stay Connected
          </h2>
          <p className="text-lg description">
            Your feedback helps us grow.
            Don’t hesitate to contact us anytime.
          </p>
        </div>

      </div>
    </section>
  );
};

/* ================= Reusable Card ================= */

const ContactCard = ({ icon, title, text }) => (
  <div
    className="graybg p-6 rounded-xl shadow-md  text-center space-y-2
               hover:shadow-xl hover:-translate-y-1 transition-all"
  >
    <div
      className="w-14 h-14 mx-auto flex items-center justify-center
                 rounded-full bg-primary/10 text-primary text-2xl"
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="description">{text}</p>
  </div>
);

export default Contact;
