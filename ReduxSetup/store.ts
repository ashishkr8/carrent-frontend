import {configureStore} from "@reduxjs/toolkit"
import CarBookingReducer from "./slices/currBookingSlice"
import MyBookingsReducer from "./slices/myBookingsSlice"
import UserProfileReducer from "./slices/userProfileSlice"
import BookedCarsReducer from "./slices/bookedCarSlice"
import CurrCarFeedbackReducer from "./slices/currCarFeebackSlice"

export const store =  configureStore({
    reducer:{
        CurrBooking:CarBookingReducer,
        MyBookings:MyBookingsReducer,
        UserProfile:UserProfileReducer,
        BookedCars:BookedCarsReducer,
        CurrCarFeedback:CurrCarFeedbackReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch