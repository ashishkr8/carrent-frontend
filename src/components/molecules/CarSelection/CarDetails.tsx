import { useState,useEffect } from "react";
import CarCharacteristics from "./CarCharacteristics";
import Feedback from "./Feedback";
import Booking from "./Booking";
import Notification from "./Notifications";
import "./css/CarDetailsModal.css";
import "./css/CarCharacteristics.css"
import "./css/Feedback.css"
import axios from "axios";
import type { Card } from "./types";
import CarImages from "./CarImages";
import { useParams,useNavigate  } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../ReduxSetup/hooks";
import { selectUserSlice } from "../../../../ReduxSetup/slices/userProfileSlice";
import { setCurrCarDetails } from "../../../../ReduxSetup/slices/currBookingSlice";
import { BASE_URL } from "../../../../constants";


const CarDetails = () => {
  const navigate = useNavigate();
  const { carId } = useParams<{ carId: string }>();
   const [showNotification, setShowNotification] = useState(false);
  const [car, setCar] = useState<Card | null>(null);
  const user = useAppSelector(selectUserSlice);
  const dispatchRedux = useAppDispatch();

  

   useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cars/${carId}`);
        // console.log(response);
        // const response = await axios.get(`/api/cars?pickupLocationId=${carId}`);
        // const carData = response.data.find((c: Card) => c.carId === carId);
        // console.log(carData)
        const carData=response.data;
        if (carData) {
          setCar(carData);
          console.log(carData)

          dispatchRedux(setCurrCarDetails({
            carId:carData.carId,
            carRating:carData.carRating,
            imageUrl:carData.images[0],
            location:carData.location,
            model:carData.model,
            pricePerDay:carData.pricePerDay,
            serviceRating:carData.serviceRating,
            status:carData.status
          }));
          
        } else {
          
        }
      } catch (err) {
        console.error("Error fetching car data:", err);
        
      } 
      
    };

    if (carId) {
      fetchCarData();
    }
  }, [carId]);
 

  const handleCancel = () => setShowNotification(false);

  const handleLogin = () => {
    setShowNotification(false);
    navigate(`/login?next=car-booking`)
    // alert("Logged in successfully!");
  };
  const handleClose = () => {
    navigate(-1); // or navigate("/cars"); if you want to redirect to cars list
  };
  if (!car) return <div>Car not found</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div></div>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
          
        </div>

        <div className="modal-content">
          {/* <CarImages carId={data[0].carId}/> */}
            <CarImages/>
          <div className="car-info">
            <CarCharacteristics car={car} />
            <Booking
              isLoggedIn={user.loginStatus}
              setShowNotification={setShowNotification}
            />
          </div>
        </div>

        <Feedback />

        {showNotification && (
          <Notification onCancel={handleCancel} onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default CarDetails;


// function dispatchRedux(arg0: any) {
//   throw new Error("Function not implemented.");
// }

