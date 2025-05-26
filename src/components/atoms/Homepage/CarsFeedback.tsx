import React from "react";

import "./css/CarsFeedback.css";
interface feedbackCarsProps {
  carName: string;
  carImage: string;
  orderHistory: string;
  orderDate: string;
  rating: number;
  review: string;
  customerName: string;
  location: string;
}

const CarsFeedback: React.FC<feedbackCarsProps> = ({
  carName,
  carImage,
  orderDate,
  orderHistory,
  rating,
  review,
  customerName,
  location,
}) => {
  return (
    <div className="feedback-box">
      <div className="feedback-left">
        <img src={carImage} className="feedback-car-image" alt="Car Image" />
      </div>
      <div className="feedback-right">
        <div className="feedback-car-name">{carName}</div>
        <div className="feedback-order-history">
          Order history: {orderHistory} ({orderDate})
        </div>
        <div className="feedback-stars">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.04895 0.926641C6.34833 0.00537801 7.65167 0.00537539 7.95105 0.926638L8.79628 3.52768C8.93016 3.93967 9.31409 4.21861 9.74729 4.21863L12.4822 4.21873C13.4509 4.21877 13.8537 5.45832 13.07 6.02773L10.8575 7.63536C10.507 7.89 10.3604 8.34134 10.4942 8.75334L11.3392 11.3544C11.6385 12.2757 10.5841 13.0418 9.80042 12.4725L7.58776 10.865C7.23728 10.6104 6.76272 10.6104 6.41225 10.865L4.19958 12.4725C3.41588 13.0418 2.36145 12.2757 2.66076 11.3544L3.5058 8.75334C3.63965 8.34134 3.493 7.89 3.14255 7.63536L0.930002 6.02773C0.146341 5.45832 0.549093 4.21877 1.51778 4.21873L4.25271 4.21863C4.68591 4.21861 5.06984 3.93967 5.20372 3.52768L6.04895 0.926641Z"
                  fill="#F8B334"
                />
              </svg>
            ))}
          {Array(5 - rating)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.02441 1.08105C6.16476 0.649412 6.74577 0.622503 6.94141 1L6.97559 1.08105L7.82031 3.68262C8.00861 4.26173 8.5268 4.66548 9.12598 4.71387L9.24707 4.71875H11.9824C12.4364 4.71894 12.6418 5.26379 12.3428 5.56641L12.2764 5.62305L10.0635 7.23047C9.57071 7.58851 9.3471 8.20609 9.48633 8.79102L9.51855 8.9082L10.3633 11.5088C10.5036 11.9408 10.0493 12.3044 9.66895 12.1133L9.59473 12.0684L7.38184 10.4609C6.88889 10.1028 6.2321 10.0801 5.71875 10.3936L5.61816 10.4609L3.40527 12.0684C3.03809 12.3345 2.55268 12.0149 2.61621 11.5947L2.63672 11.5088L3.48145 8.9082C3.6697 8.32875 3.48797 7.69702 3.03125 7.30566L2.93652 7.23047L0.723633 5.62305C0.356542 5.35599 0.51076 4.79449 0.930664 4.72559L1.01758 4.71875H3.75293C4.36202 4.71865 4.90659 4.351 5.1377 3.7959L5.17969 3.68262L6.02441 1.08105Z"
                  stroke="#F8B334"
                />
              </svg>
            ))}
        </div>
        <div className="feedback-message">{review}</div>
        <div className="feedback-remarks">
          <div className="feedback-user-details">
            {customerName},{" "}
            <span className="feedback-user-location"> {location}</span>
          </div>
          <div className="feedback-date">{orderDate}</div>
        </div>
      </div>
    </div>
  );
};

export default CarsFeedback;
