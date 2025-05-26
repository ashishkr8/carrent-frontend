import React, { useEffect, useState } from "react";
import SideMenu from "./../molecules/checkoutPage/SideMenu";
import "./css/CarBooking.css";
import CarBookingCard from "./../molecules/checkoutPage/CarBookingCard";

import { useAppDispatch, useAppSelector } from "./../../../ReduxSetup/hooks";
import {
  selectCurrCarDetails,
  selectIsSorryPageActive,
  setCurrCarDetails,
} from "../../../ReduxSetup/slices/currBookingSlice";
import SorryCard from "./../molecules/checkoutPage/SorryCard";

import logo from "./../../assets/chevron-right-light.png";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants";

interface CarBookingCardProps {
  carId: string;
  imageUrl: string;
  location: string;
  model: string;
  pricePerDay: number;
  isEditing:boolean;
  bookingId?:string;
}

const CarBooking: React.FC = () => {
  const isSorryPageActive = useAppSelector(selectIsSorryPageActive);
  const { bookingId } = useParams();
  const location = useLocation();
  const dispatchRedux = useAppDispatch();
  const details = useAppSelector(selectCurrCarDetails);

  const [carCardProps, setCarCardProps] = useState<CarBookingCardProps | null>(null);


  const fetchCarDetailsFromBooking = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bookings/car/${bookingId}`);

        const { carId, imageUrl, location, model, pricePerDay } = response.data.carDetails;
        console.log("edit -> " , response);
        // Update local state for Card component
        setCarCardProps({ carId, imageUrl, location, model, pricePerDay, isEditing:true, bookingId });

        // Dispatch full object to Redux
        dispatchRedux(setCurrCarDetails(response.data));
      } catch (error) {
        console.error("Failed to fetch car details for booking:", error);
      }
    };

  useEffect(() => {
    console.log("in effect")
    if (location.pathname.startsWith("/edit-bookings/") && bookingId) {
      console.log("in edit bookings")
      fetchCarDetailsFromBooking();
    } else if (location.pathname === "/car-bookings") {
      
      const { carId, imageUrl, location, model, pricePerDay } = details;
      setCarCardProps({ carId, imageUrl, location, model, pricePerDay, isEditing:false });
    }
  }, [location.pathname, bookingId, dispatchRedux]);

  return (
    <div className="booking-container">
      <div className="breadcrumbs">
        <Link to="/cars" className="path path-1">Cars</Link>
        <img src={logo} alt="logo" />
        <Link to="/book" className="path path-2">Car booking</Link>
      </div>

      <h1 className="booking-header">Car booking</h1>
      <div className="booking-body">
        <SideMenu />
        {carCardProps && <CarBookingCard {...carCardProps} />}
        <div className={isSorryPageActive ? "sorry" : "hide-sorry"}>
          <SorryCard />
        </div>
      </div>
    </div>
  );
};

export default CarBooking;
