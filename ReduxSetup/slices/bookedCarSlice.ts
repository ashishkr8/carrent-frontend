import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// State interface
interface BookedCarsState {
  carIds: string[];
}

// Initial state
const initialState: BookedCarsState = {
  carIds: [],
};

// Slice
const bookedCarsSlice = createSlice({
  name: "bookedCars",
  initialState,
  reducers: {
    addCarId(state, action: PayloadAction<string>) {
      state.carIds.push(action.payload);
    },
  },
});

// Export actions and reducer
export const { addCarId } = bookedCarsSlice.actions;
export default bookedCarsSlice.reducer;

// Selector
export const selectBookedCarIds = (state: RootState) => state.BookedCars.carIds;
