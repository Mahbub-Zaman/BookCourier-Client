import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUserPlus, FaBook, FaSearch, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl text-green-500 mb-4" />,
      title: 'Create an Account',
      description: 'Sign up for free to access BookCourier services and connect with nearby libraries.',
    },
    {
      icon: <FaBook className="text-4xl text-green-500 mb-4" />,
      title: 'Request a Book',
      description: 'Choose a book from partnered libraries and submit a pickup or delivery request easily.',
    },
    {
      icon: <FaSearch className="text-4xl text-green-500 mb-4" />,
      title: 'Track Your Request',
      description: 'Monitor your book’s status—from approval to dispatch—directly from your dashboard.',
    },
    {
      icon: <FaCheckCircle className="text-4xl text-green-500 mb-4" />,
      title: 'Receive or Return Books',
      description: 'Get books delivered to your home or schedule a pickup for returning them with ease.',
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-green-500 mb-8">How It Works</h2>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {step.icon}
            <h3 className="text-xl text-black font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
