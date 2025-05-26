import React from "react";
import "./css/CancelBookingPopup.css";

interface CancelBookingPopupProps {
  onCancel: () => void;
  onResume: () => void;
  onClose?: () => void; // Make it optional
}

const CancelBookingPopup: React.FC<CancelBookingPopupProps> = ({ 
  onCancel, 
  onResume, 
  onClose 
}) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Cancel booking?</h2>
        <div className="popup-text">
        <p>You are about to cancel your booking.</p>
        <p>Are you sure you want to proceed?</p>
        </div>
        
        <div className="popup-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Cancel booking
          </button>
          <button className="resume-button" onClick={onResume}>
            Resume booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingPopup;