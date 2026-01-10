import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Faq = () => {
  const faqs = [
    {
      question: "What is BookCourier?",
      answer:
        "BookCourier is a library-to-home delivery platform where users can request and return books without visiting the library."
    },
    {
      question: "How do I request a book?",
      answer:
        "Simply create an account, browse available books, select the one you want, and send a request to the library or donor."
    },
    {
      question: "Is using BookCourier free?",
      answer:
        "Yes! BookCourier is completely free for all registered users."
    },
    {
      question: "How do I upload a book request?",
      answer:
        "Fill in the required details about the book you want to borrow, and submit the request through your dashboard."
    },
    {
      question: "Why am I getting an error while uploading book info?",
      answer:
        "Ensure all required fields are filled correctly and the file formats match the accepted types. Double-check your inputs."
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="whitebg py-12 px-4 md:px-8 min-h-screen border-b-theme">
     <div className="max-w-4xl mx-auto px-4 py-16">
        <title>BookCourier | FAQ</title>

        <h1 className="text-4xl font-bold text-center mb-12 text-green-600">
          ❓ Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              data-aos=""
              data-aos-delay={index * 100}
              className="graybg p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg md:text-xl text-blacktext font-semibold">{faq.question}</h3>
                {openIndex === index ? (
                  <FaChevronUp className="text-red-500 text-lg md:text-xl" />
                ) : (
                  <FaChevronDown className="text-green-500 text-lg md:text-xl" />
                )}
              </div>

              {openIndex === index && (
                <p className="mt-4 description text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
