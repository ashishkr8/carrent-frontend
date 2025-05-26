import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// State interface
interface FeedbackState {
  name: string;
  photo: string;
  stars: number;
  review: string;
  date: string;
}

interface FeedbackListState {
  feedbacks: FeedbackState[];
}

// Initial state
const initialState: FeedbackListState = {
  feedbacks: [],
};

// Slice
const carFeedbacksSlice = createSlice({
  name: "carsFeedback",
  initialState,
  reducers: {
    setFeedbacks(state, action: PayloadAction<FeedbackState[]>) {
      state.feedbacks = action.payload;
    },
  },
});

// Export actions and reducer
export const { setFeedbacks } = carFeedbacksSlice.actions;
export default carFeedbacksSlice.reducer;

// Corrected selector
export const selectCarFeedbacks = (state: RootState) => state.CurrCarFeedback.feedbacks;