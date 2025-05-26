
import React, { useState } from "react";
import "./css/CarCard.css";
import GiveFeedback from "./GiveFeedback";
import CancelBookingPopup from "./CancelBookingPopup "; 
import { BASE_URL, BookingStatusConstants } from "../../../../constants";
import { useNavigate } from "react-router-dom";

import carImage from "./../../../assets/f9e7840b187b00e0413b2008e149f3fb648d2dda.jpg"
import axios from "axios";

interface CarCardProps {
    carId:string,
    bookingId:string,
    bookingStatus:string,
    carImageUrl:string,
    carModel:string,
    orderDetails:string
}

const CarCard:React.FC<CarCardProps> = ({
  carId,
  bookingId,
  bookingStatus,
  carImageUrl,
  carModel,
  orderDetails,
}) => {
  const navigate = useNavigate();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const handleLeaveFeedback = () => {
  setShowFeedbackPopup(true);
};

const handleCloseFeedback = () => {
  setShowFeedbackPopup(false);
};

  const handleEditOrder = (bookingId:string)=>{
    // myBookings.content.shift();

    navigate(`/edit-bookings/${bookingId}`)
  }
   const handleCancelClick = () => {
    setShowCancelPopup(true);
  };
  const handleConfirmCancel = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/bookings/cancel/${bookingId}`);
    
    if (response.status === 200) {
      alert("Booking successfully cancelled.");
      window.location.reload(); // Optional: update UI without full reload
    } else {
      alert("Failed to cancel the booking. Please try again.");
    }

  } catch (error: any) {
    const errorMessage = error.response?.data?.message;

    if (errorMessage === "Booking can't be cancelled after 12 hours of creation") {
      alert("You can't cancel the booking after 12 hours of creation.");
    } else if (errorMessage) {
      alert(`Error: ${errorMessage}`);
    } else {
      alert("An unexpected error occurred during cancellation.");
    }

    console.error("Cancellation error:", error);
  } finally {
    setShowCancelPopup(false);
  }
};


  const handleResumeBooking = () => {
    setShowCancelPopup(false);
  };

  function renderBtns(bookingStatus:string){
    switch(bookingStatus){
      case BookingStatusConstants.RESERVED:
        return  (<div className="button-row">
                  <button className="cancel-btn" onClick={handleCancelClick}>
              Cancel
            </button>
                  <button className="edit-btn" onClick={() => handleEditOrder(bookingId)}>Edit</button>
                </div>)
      case BookingStatusConstants.RESERVEDBYSA:
        return  (<div className="button-row">
                  <button className="cancel-btn" onClick={handleCancelClick}>
              Cancel
            </button>
                  <button className="edit-btn" onClick={() => handleEditOrder(bookingId)}>Edit</button>
                </div>)
      case BookingStatusConstants.SERVICESTARTED:
        return null
      case BookingStatusConstants.CANCELLED:
        return null
      case BookingStatusConstants.SERVICEPROVIDED:
        return (<div className="button-row">
                  <button className="feedback-btn leave" onClick={handleLeaveFeedback}>
      Leave feedback
    </button>
                </div>)
      case BookingStatusConstants.BOOKINGFINISHED:
        return (<div className="button-row">
                  <button className="feedback-btn view">view feeback</button>
                </div>)
      default:
        return null
    }
  };

  return (<>
    <div className="car-card">
      <div className="car-card-top">
        <div className="booking-status">
          <p className="booking-status-text">{bookingStatus}</p>
        </div>
        <figcaption>
          <img
            className="car-image"
            src={carImageUrl?carImageUrl:carImage}
            alt="Car"
          />
          <p className="car-model">{carModel}</p>
        </figcaption>
        <p className="order-history">Order history: {orderDetails}</p>
      </div>


      <div className="car-card-bottom">
        {

           renderBtns(bookingStatus)

        }
       
        <p className="support-text">
          Have any question?{" "}
          <span className="support-link">Support chat</span>
        </p>
      </div>
    </div>
     {showCancelPopup && (
        <CancelBookingPopup
          onCancel={handleConfirmCancel}
          onResume={handleResumeBooking}
          onClose={handleResumeBooking}
        />
      )}
      {showFeedbackPopup && (
  <GiveFeedback onClose={handleCloseFeedback} bookingId={bookingId} carId={carId}/>
)}</>
  );
};

export default CarCard;
