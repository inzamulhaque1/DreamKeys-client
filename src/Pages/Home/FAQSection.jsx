import  { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the answer if it's already open
    } else {
      setActiveIndex(index); // Open the answer
    }
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
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="w-full text-left text-xl font-medium text-gray-800 py-4"
                onClick={() => toggleAnswer(index)}
              >
                <span className="flex justify-between items-center">
                  {item.question}
                  <span className={`transform ${activeIndex === index ? "rotate-180" : ""}`}>
                    &#9660;
                  </span>
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-4 py-2 text-gray-600">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
