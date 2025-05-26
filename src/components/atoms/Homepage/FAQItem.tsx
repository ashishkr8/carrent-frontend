import React from "react";
import "./css/FAQItem.css";

interface FAQPropTypese {
  index: any;
  question: string;
  toggleIsOpen: (index: any) => void;
  openIndex: any;
  answer: string;
}
const FAQItem: React.FC<FAQPropTypese> = ({
  index,
  question,
  toggleIsOpen,
  openIndex,
  answer,
}) => {
  return (
    <div className="faq-item" key={index}>
      <div className="faq-ques">
        {question}
        <div
          className="faq-button"
          id="oc-btn"
          onClick={() => toggleIsOpen(index)} // Pass the index to toggle the corresponding FAQ
        >
          {openIndex === index ? (
            <svg
              width="24" // Smaller size
              height="24" // Smaller size
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="15.5"
                stroke="#DCDCDD"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4142 8.58578L9.00001 9.99999L14.5858 15.5858L8.58577 21.5858L9.99999 23L16 17L21.7279 22.7279L23.1421 21.3137L17.4142 15.5858L22.7279 10.2721L21.3137 8.85785L16 14.1716L10.4142 8.58578Z"
                fill="black"
              />
            </svg>
          ) : (
            <svg
              width="24" // Smaller size
              height="24" // Smaller size
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="15.5"
                stroke="#DCDCDD"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 7H15V15H7V17H15V25H17V17H25V15H17V7Z"
                fill="black"
              />
            </svg>
          )}
        </div>
      </div>{" "}
      {/* Assuming "question" is the property for FAQ question */}
      {openIndex === index && (
        <div className="faq-ans">{answer}</div> // Display the answer if the FAQ is open
      )}
    </div>
  );
};

export default FAQItem;
