import { useEffect, useState } from "react";
import CarsFeedback from "../../atoms/Homepage/CarsFeedback";
import "./css/Feedback.css";
import FeedbackData from "../../../../public/feedbacks.json";

const Feedback = () => {
  const [feedback, setFeedback] = useState<any[]>([]);

  // fetching data for popular cars

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setFeedback(FeedbackData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeedback();
  }, []);

  useEffect(() => {
    const container = document.querySelector(
      ".feedback-container"
    ) as HTMLElement | null;
    const scrollRight = document.getElementById("scroll-right");
    const scrollLeft = document.getElementById("scroll-left");

    if (container && scrollRight && scrollLeft) {
      scrollRight.addEventListener("click", () => {
        container.scrollBy({
          left: container.offsetWidth / 3 + 16,
          behavior: "smooth",
        });
      });

      scrollLeft.addEventListener("click", () => {
        container.scrollBy({
          left: -(container.offsetWidth / 3 + 16),
          behavior: "smooth",
        });
      });

      // Cleanup to avoid memory leaks
      return () => {
        scrollRight.removeEventListener("click", () => {});
        scrollLeft.removeEventListener("click", () => {});
      };
    }
  }, []);
  return (
    <section id="feedback">
      <div className="subheadings">(RECENT FEEDBACK)</div>
      <div className="feedback-container">
        {feedback.map((elem, idx) => {
          return (
            <CarsFeedback
              key={idx}
              carImage={elem.image}
              carName={elem.car_model}
              orderDate={elem.feedback.date}
              orderHistory={elem.feedback.order_history}
              customerName={elem.feedback.customer_name}
              rating={elem.feedback.rating}
              review={elem.feedback.review}
              location={elem.feedback.location}
            />
          );
        })}
      </div>
      <div id="scroll-button">
        <svg
          id="scroll-left"
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="39"
            rx="19.5"
            stroke="#DCDCDD"
          />
          <path
            d="M11 20H29M11 20L16.1429 25M11 20L16.1429 15"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          id="scroll-right"
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="39"
            rx="19.5"
            stroke="#DCDCDD"
          />
          <path
            d="M29 20H11M29 20L23.8571 25M29 20L23.8571 15"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default Feedback;
