import React, { useEffect, useState } from "react";
import "./css/CarBookingCard.css";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../../../ReduxSetup/hooks";
import {
  setIsSorryPageActive,
  selectPickDropDate,
  selectPickDropLocation,
} from "../../../../ReduxSetup/slices/currBookingSlice";
import { BASE_URL } from "../../../../constants";
import { useNavigate } from "react-router-dom";
import { selectUserSlice } from "../../../../ReduxSetup/slices/userProfileSlice";
import { locationsMap } from "../../../../constants";

interface CarBookingCardProps {
  carId: string;
  imageUrl: string;
  location: string;
  model: string;
  pricePerDay: number;
  isEditing: boolean;
  bookingId?: string;
}

const CarBookingCard: React.FC<CarBookingCardProps> = ({
  carId,
  imageUrl,
  location,
  model,
  pricePerDay,
  isEditing,
  bookingId,
}) => {
  const dispatchRedux = useAppDispatch();
  const navigate = useNavigate();
  const pickDropDate = useAppSelector(selectPickDropDate);
  const pickDropLocation = useAppSelector(selectPickDropLocation);
  const userData = useAppSelector(selectUserSlice);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = () => {
    const pickup = new Date(pickDropDate.pickupDate);
    const dropoff = new Date(pickDropDate.dropoffDate);
    const timeDiff = dropoff.getTime() - pickup.getTime();
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days > 0 ? pricePerDay * days : pricePerDay;
  };

  const handleConfirmReservation = async () => {
    try {
      const payload = {
        carId,
        clientId: userData.clientId,
        pickupDateTime: pickDropDate.pickupDate,
        dropOffDateTime: pickDropDate.dropoffDate,
        pickupLocationId: locationsMap[pickDropLocation.pickupLocation],
        dropOffLocationId: locationsMap[pickDropLocation.dropoffLocation],
      };

      const response = isEditing
        ? await axios.post(`${BASE_URL}/bookings/edit/${bookingId}`, payload)
        : await axios.post(`${BASE_URL}/bookings`, payload);

      if (response.status === 409 && response.data.message === "not available") {
        dispatchRedux(setIsSorryPageActive(true));
        return;
      }

      // const message: string = response.data?.message ?? "";
      // const match = message.match(/Your order: (#[0-9]+ \(\d{2}\.\d{2}\.\d{2}\))/);
      // const orderDetails = match ? match[1] : "Order details not found";

      
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to confirm reservation. Please try again later.");
    }
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [pickDropDate, pricePerDay]);

  return (
    <div className="car-booking-card">
      <div className="car-card-top">
        <figcaption>
          <img className="car-image" src={imageUrl} alt="Car" />
          <p className="car-model">{model}</p>
        </figcaption>
        <p className="order-history">{location}</p>
      </div>

      <div className="car-card-bottom">
        <hr className="hr-line" />
        <div className="price">
          <p className="car-model">
            <span>Total</span> <span>$ {totalPrice}</span>
          </p>
          <p className="order-history">Deposit: $ 2000</p>
        </div>
        <div>
          <button
            className="confirm-reservation"
            onClick={handleConfirmReservation}
          >
            Confirm reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarBookingCard;
