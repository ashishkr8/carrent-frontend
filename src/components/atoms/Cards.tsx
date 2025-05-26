// import React from "react";
// import SecInputBtn from "./SecInputBtn";
// import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../../ReduxSetup/hooks";
// import { setCurrCarDetails } from "../../../ReduxSetup/slices/currBookingSlice";
// import { Navigate } from "react-router-dom";
// import "./css/Cards.css";

// interface TypeProps {
//   carRating: string;
//   model: string;
//   img: string;
//   location: string;
//   status: string;
//   pricePerDay: number;
// }
// const Cards: React.FC<TypeProps> = ({
//   carRating,
//   model,
//   img,
//   location,
//   status,
//   pricePerDay,
// }) => {
//   const dispatchRedux = useAppDispatch();
//   const navigate = useNavigate()
//   const handleBooking = () => {
//     dispatchRedux(setCurrCarDetails({
//         carId:"92c87432-3383-4328-85f8-7d20ba8715ec",
//         carRating,
//         imageUrl:img,
//         location,
//         model,
//         pricePerDay,
//         serviceRating:carRating,
//         status
//     }));

//     navigate("/car-booking")
//   }
//   return (
//     <div className="cards" id="card1" >
//       <div className="cars_image">
//         <img src={img} alt={model} />
//         <div className="car_status">{status}</div>
//       </div>
//       <div id="car_details">
//         <Link to="/cars/car-info" className="no-underline text-black">
//           <div className="car_name hover-bold">{model}</div>
//         </Link>
//         <div className="car_rating hover-bold">
//           <span>{carRating}</span>
//           <svg
//             width="10"
//             height="10"
//             viewBox="0 0 10 10"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M4.04895 0.926638C4.34833 0.00537562 5.65167 0.0053761 5.95105 0.926639L6.34722 2.14577C6.4811 2.55776 6.86502 2.8367 7.29822 2.83672L8.58011 2.83676C9.5488 2.8368 9.95155 4.07635 9.16789 4.64576L8.13085 5.39927C7.78039 5.65391 7.63375 6.10525 7.7676 6.51725L8.16367 7.73641C8.46298 8.65769 7.40855 9.42378 6.62485 8.85443L5.58775 8.10099C5.23728 7.84638 4.76272 7.84638 4.41225 8.10099L3.37515 8.85443C2.59144 9.42378 1.53702 8.65769 1.83633 7.73641L2.23241 6.51725C2.36626 6.10525 2.21961 5.65391 1.86915 5.39927L0.832114 4.64576C0.0484526 4.07635 0.451207 2.8368 1.41989 2.83676L2.70178 2.83672C3.13498 2.8367 3.5189 2.55776 3.65278 2.14577L4.04895 0.926638Z"
//               fill="#F8B334"
//             />
//           </svg>
//         </div>
//       </div>
//       <div className="car_location">{location}</div>

//       <SecInputBtn value={`Book the Car - ${pricePerDay}/day`} onClick={handleBooking}/>
//       <div id="see-more-details">
//         <Link to="/cars/car-info" className="text-black hover-bold">
//           See more details
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Cards;
import React from "react";
import SecInputBtn from "./SecInputBtn";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../ReduxSetup/hooks";
import { setCurrCarDetails } from "../../../ReduxSetup/slices/currBookingSlice";
import "./css/Cards.css";
import { selectUserSlice } from "../../../ReduxSetup/slices/userProfileSlice";
import { setFeedbacks } from "../../../ReduxSetup/slices/currCarFeebackSlice";
import axios from "axios";
import { BASE_URL } from "../../../constants";

interface TypeProps {
  carRating: string;
  model: string;
  img: string;
  location: string;
  status: string;
  pricePerDay: number;
  carId: string;
}

const Cards: React.FC<TypeProps> = ({
  carRating,
  model,
  img,
  location,
  status,
  pricePerDay,
  carId,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loginStatus } = useAppSelector(selectUserSlice);

  const handleCollectReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/feedbacks/${carId}`);
      console.log("API response:", response.data);
      if (response.data?.carFeedback) {
        dispatch(setFeedbacks(response.data.carFeedback));
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleBooking = () => {
    dispatch(
      setCurrCarDetails({
        carId,
        carRating,
        imageUrl: img,
        location,
        model,
        pricePerDay,
        serviceRating: carRating,
        status,
      })
    );

    if (loginStatus) {
      navigate("/car-bookings");
    } else {
      navigate("/login?next=car-bookings");
    }
  };

  return (
    <div className="cards" id="card1">
      <div className="cars_image">
        <img src={img} alt={model} />
        <div className="car_status">{status}</div>
      </div>
      <div id="car_details">
        <Link to={`/cars/car-info/${carId}`} className="no-underline text-black">
          <div className="car_name hover-bold">{model}</div>
        </Link>
        <div className="car_rating hover-bold">
          <span>{carRating}</span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.04895 0.926638C4.34833 0.00537562 5.65167 0.0053761 5.95105 0.926639L6.34722 2.14577C6.4811 2.55776 6.86502 2.8367 7.29822 2.83672L8.58011 2.83676C9.5488 2.8368 9.95155 4.07635 9.16789 4.64576L8.13085 5.39927C7.78039 5.65391 7.63375 6.10525 7.7676 6.51725L8.16367 7.73641C8.46298 8.65769 7.40855 9.42378 6.62485 8.85443L5.58775 8.10099C5.23728 7.84638 4.76272 7.84638 4.41225 8.10099L3.37515 8.85443C2.59144 9.42378 1.53702 8.65769 1.83633 7.73641L2.23241 6.51725C2.36626 6.10525 2.21961 5.65391 1.86915 5.39927L0.832114 4.64576C0.0484526 4.07635 0.451207 2.8368 1.41989 2.83676L2.70178 2.83672C3.13498 2.8367 3.5189 2.55776 3.65278 2.14577L4.04895 0.926638Z"
              fill="#F8B334"
            />
          </svg>
        </div>
      </div>
      <div className="car_location">{location}</div>
      <SecInputBtn value={`Book the Car - ${pricePerDay}/day`} onClick={handleBooking} />
      <div id="see-more-details">
        <Link
          to={`/cars/car-info/${carId}`}
          onClick={handleCollectReviews}
          className="text-black hover-bold"
        >
          See more details
        </Link>
      </div>
    </div>
  );
};

export default Cards;
