import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store"; // correct if store.ts exports RootState

// Interface
interface carDetailsState {
  carId: string,
  carRating: string,
  imageUrl: string,
  location: string,
  model: string,
  pricePerDay: number,
  serviceRating: string,
  status: string
}

interface CurrBookingState {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;

  carDetails: carDetailsState;

  isSorryPageActive: boolean;
}

// Initial state
const initialState: CurrBookingState = {
  pickupLocation: "Kyiv Hayatt Hotel",
  dropoffLocation: "Kyiv Hayatt Hotel",
  pickupDate: "November 11 | 10:00",
  dropoffDate: "November 16 | 16:00",

  carDetails: {
    carId: "92c87432-3383-4328-85f8-7d20ba8715ec",
    carRating: "4.5",
    imageUrl: "https://application.s3.eu-central-1.amazonaws.com/img/cars/audi-A6-quattro-2023.jpg",
    location: "Ukraine, Kyiv",
    model: "Audi A6 Quattro 2023",
    pricePerDay: 180,
    serviceRating: "4.8",
    status: "AVAILABLE"
  },

  isSorryPageActive:false
};

// Slice
export const currBookingSlice = createSlice({
  name: "currBooking",
  initialState,
  reducers: {
    setIsSorryPageActive(state, action:PayloadAction<boolean>){
      state.isSorryPageActive = action.payload;
    },
    setCurrCarDetails(state, action:PayloadAction<carDetailsState>){
      state.carDetails = action.payload;
    },
    setLocationDetails(state, action:PayloadAction<{pickupLocation:string,dropoffLocation:string}>){
      state.pickupLocation = action.payload.pickupLocation;
      state.dropoffLocation = action.payload.dropoffLocation;
    },
    setDateDetails(state, action:PayloadAction<{pickupDate:string,dropoffDate:string}>){
      state.pickupDate = action.payload.pickupDate;
      state.dropoffDate = action.payload.dropoffDate;
    }
  },
});

// Actions
export const {setIsSorryPageActive, setCurrCarDetails, setDateDetails, setLocationDetails} = currBookingSlice.actions;

// Selector

export const selectPickDropLocation = (state: RootState) => {
  return {
    pickupLocation: state.CurrBooking.pickupLocation,
    dropoffLocation: state.CurrBooking.dropoffLocation,
  };
};

export const selectPickDropDate = (state: RootState) => {
  return {
    pickupDate: state.CurrBooking.pickupDate,
    dropoffDate: state.CurrBooking.dropoffDate,
  };
};

export const selectCurrCarDetails = (state:RootState) => state.CurrBooking.carDetails
export const selectCurrCarStatus = (state:RootState) => state.CurrBooking.carDetails.status

export const selectIsSorryPageActive = (state:RootState) => state.CurrBooking.isSorryPageActive



// Reducer
export default currBookingSlice.reducer;
