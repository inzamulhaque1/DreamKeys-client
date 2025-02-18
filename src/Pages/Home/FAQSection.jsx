import { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What types of properties do you offer?",
      answer:
        "We offer a wide range of properties including apartments, houses, and commercial spaces to suit every budget and need.",
    },
    {
      question: "How can I schedule a property viewing?",
      answer:
        "You can schedule a property viewing by contacting us through the 'Contact Us' page or directly reaching out to our agents.",
    },
    {
      question: "Do you assist with home financing?",
      answer:
        "Yes, we work with trusted partners to offer financing options. Contact us for more details on the available plans.",
    },
    {
      question: "How can I list my property on DreamKeys?",
      answer:
        "To list your property, please visit our 'Sell or Rent' page, where you can submit details and get in touch with our team.",
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-[#0B0716] py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Heading & Subheading */}
        <div className="text-center mb-12">
          <h2 className="exo2 text-4xl font-bold text-blue-800 dark:text-white mb-4">
            Your Questions, Answered
          </h2>
          <p className="libre text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to commonly asked questions about our properties, financing options, and services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-300 dark:border-gray-600"
            >
              <button
                className="w-full text-left text-lg font-medium text-blue-800 dark:text-gray-200 py-4 flex justify-between items-center"
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
                <span
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  &#9660;
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-4 py-2 text-gray-600 dark:text-gray-400">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
