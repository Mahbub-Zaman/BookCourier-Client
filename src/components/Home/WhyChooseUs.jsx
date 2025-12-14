import React from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaTruckFast className="text-4xl text-green-500 mb-4" />,
      title: "Fast Delivery",
      description:
        "Get your requested books delivered to your doorstep quickly and efficiently without visiting the library.",
    },
    {
      icon: <FaRegClock className="text-4xl text-green-500 mb-4" />,
      title: "Save Time & Effort",
      description:
        "No more long queues or busy library schedules. Request, track, and receive books from home.",
    },
    {
      icon: <IoShieldCheckmarkSharp className="text-4xl text-green-500 mb-4" />,
      title: "Secure & Reliable",
      description:
        "BookCourier ensures a trusted and safe system where your requests and returns are managed securely.",
    },
    {
      icon: <FaBookReader className="text-4xl text-green-500 mb-4" />,
      title: "Support for Readers",
      description:
        "Ideal for students, researchers, and book lovers who need easy access to reading materials anytime.",
    },
  ];

  return (
    <div className="whitebg py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-center text-green-500 mb-6">Why Choose BookCourier?</h2>
        <p className="text-lg text-secondary leading-relaxed mb-10">
          BookCourier brings the library to your home. With fast delivery, secure service, and
          student-friendly features, we make reading more accessible than ever.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {reasons.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center"
          >
            <div className="flex justify-center mb-1">{item.icon}</div>
            <h3 className="text-xl text-black font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
