import { useDispatch  } from "react-redux";
import { setIsSorryPageActive } from "../../../../ReduxSetup/slices/currBookingSlice";
import "./css/SorryCard.css"
import React from "react"

const SorryCard: React.FC = () => {
  const dispatch = useDispatch();
    
  const handleOk = () => {
    dispatch(setIsSorryPageActive(false));
  }

  return (
    <>
      <div className="rejection-root">
        <div className="rejection-container">
          <p className="sorry-text">Sorry, </p>
          <p className="rejection-text">
            It seems like someone has already reserved this car. 
            You can find similar one <span className="link">here</span>
          </p>
          <button className="button" onClick={handleOk}>Ok</button>
        </div>
      </div>
    </>
  );
}

export default SorryCard;
