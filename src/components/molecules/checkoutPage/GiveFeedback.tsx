import React, { useState } from 'react';
import './css/GiveFeedback.css';
import { useAppSelector } from '../../../../ReduxSetup/hooks';
import { selectUserSlice } from '../../../../ReduxSetup/slices/userProfileSlice';
import axios from 'axios';
import { BASE_URL } from '../../../../constants';

interface GiveFeedbackProps {
  bookingId: string;
  carId: string,
  onClose: () => void;
}

const GiveFeedback: React.FC<GiveFeedbackProps> = ({ onClose, bookingId, carId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState("");

  const clientId = (useAppSelector(selectUserSlice)).clientId;

  const handleSubmit = async() => {
    
    try {
      const response = await axios.post(`${BASE_URL}/feedbacks`,{
        bookingId,
        carId,
        clientId,
        feedbackText,
        rating
      })

      if(response.status === 201){
        alert(response.data.systemMessage);
      }
    } catch (error:any) {
      alert(`some error occured:${error.message}`)
      console.log(error);
    }
    onClose(); // Close after submission
  };

  return (
    <div className="feedback-overlay">
      <div className="feedback-modal">
        <h1 className="feedback-title">How was your experience?</h1>

        <div className="feedback-rating">
          <label>Rate your experience</label>
          <div className="stars">
            {Array.from({ length: 5 }).map((_, i) => {
              const starIndex = i + 1;
              return (
                <span
                  key={i}
                  className={`star ${starIndex <= (hoverRating || rating) ? 'filled' : ''}`}
                  onClick={() => setRating(starIndex)}
                  onMouseEnter={() => setHoverRating(starIndex)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  &#9733;
                </span>
              );
            })}
          </div>
        </div>

        <div className="feedback-review">
          <label htmlFor="review">Review</label>
          <textarea id="review" placeholder="Add your comment" onChange={e=>setFeedbackText(e.target.value)} value={feedbackText}/>
        </div>

        <div className="feedback-buttons">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default GiveFeedback;
