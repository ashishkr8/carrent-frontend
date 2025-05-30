import { useEffect, useState } from "react";
import "./css/FAQ.css";
import FAQItem from "../../atoms/Homepage/FAQItem";
import FAQData from "../../../../public/about.json";

const FAQ = () => {
  const [faq, setFaq] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track the index of the open FAQ

  const toggleIsOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the clicked FAQ
  };

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setFaq([
          {
            question: "What documents do I need to rent a car?",
            answer:
              "To rent a car, you will need a valid driver's license, a credit card in your name, and a government-issued photo ID. International renters may need an International Driving Permit in addition to their home country driver’s license.",
          },
          {
            question: "What is the minimum age to rent a car?",
            answer:
              "The minimum age to rent a car is typically 21 years, but this can vary depending on the rental location and car category. Drivers under 25 years may incur a young driver surcharge.",
          },
          {
            question: "Can I cancel or modify my booking?",
            answer:
              "Yes, you can cancel or modify your booking. Free cancellations are available up to 24 hours before the scheduled pickup. Additional charges may apply for modifications.",
          },
          {
            question:
              "Are there any additional charges apart from the rental fee?",
            answer:
              "Yes, additional charges such as insurance, fuel charges, toll fees, and young driver or additional driver fees may apply. All charges will be detailed in the rental agreement.",
          },
        ]);
        console.log(FAQData.content);
      } catch (error) {
        console.error("Error fetching About Data:", error);
      }
    };
    fetchAbout();
  }, []);
  useEffect(() => {
    console.log(faq);
  }, []);

  return (
    <section id="faq">
      <div className="subheadings">(FAQ)</div>
      <div id="faq-container">
        {faq.map((item, index) => (
          <FAQItem
            key={index}
            index={index}
            question={item.question}
            answer={item.answer}
            toggleIsOpen={toggleIsOpen}
            openIndex={openIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
