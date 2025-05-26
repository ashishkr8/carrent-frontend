import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CarCardState {
  carId:string;
  bookingId: string;
  bookingStatus: string;
  carImageUrl: string;
  carModel: string;
  orderDetails: string;
}

interface MyBookingsState {
  bookedCars: CarCardState[];
  filteredCars: CarCardState[];
}

const initialState: MyBookingsState = {
  bookedCars: [
    {
      carId:"",  
      bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "RESERVED",
        carImageUrl:
          "https://th.bing.com/th/id/OIP.qsVXdx-e2Wy8nLYV5f8YhAHaEK?rs=1&pid=ImgDetMain",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "RESERVED by SA",
        carImageUrl:
          "https://th.bing.com/th/id/OIP.q9zBVsaLXxbEKLvILNiScgHaEo?rs=1&pid=ImgDetMain",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "SERVICE STARTED",
        carImageUrl:
          "https://www.thedrive.com/uploads/2022/06/10/escalade-v-inline-B-1.jpg?auto=webp",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "CANCELLED",
        carImageUrl:
          "https://th.bing.com/th/id/OIP.qsVXdx-e2Wy8nLYV5f8YhAHaEK?rs=1&pid=ImgDetMain",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "SERVICE PROVIDED",
        carImageUrl:
          "https://th.bing.com/th/id/OIP.qsVXdx-e2Wy8nLYV5f8YhAHaEK?rs=1&pid=ImgDetMain",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "BOOKING FINISHED",
        carImageUrl:
          "https://www.thedrive.com/uploads/2022/06/10/escalade-v-inline-B-1.jpg?auto=webp",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
  ],
  filteredCars: [ {
    carId:"",    
    bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "RESERVED",
        carImageUrl:
          "https://th.bing.com/th/id/OIP.qsVXdx-e2Wy8nLYV5f8YhAHaEK?rs=1&pid=ImgDetMain",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "RESERVED by SA",
        carImageUrl:
          "https://th.bing.com/th/id/OIP.q9zBVsaLXxbEKLvILNiScgHaEo?rs=1&pid=ImgDetMain",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "SERVICE STARTED",
        carImageUrl:
          "https://www.thedrive.com/uploads/2022/06/10/escalade-v-inline-B-1.jpg?auto=webp",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "CANCELLED",
        carImageUrl:
          "https://th.bing.com/th/id/OIP.qsVXdx-e2Wy8nLYV5f8YhAHaEK?rs=1&pid=ImgDetMain",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "SERVICE PROVIDED",
        carImageUrl:
          "https://th.bing.com/th/id/OIP.qsVXdx-e2Wy8nLYV5f8YhAHaEK?rs=1&pid=ImgDetMain",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },
      {
        carId:"",
        bookingId: "ce3d9306-ec01-48a9-9d1a-f9818063c734",
        bookingStatus: "BOOKING FINISHED",
        carImageUrl:
          "https://www.thedrive.com/uploads/2022/06/10/escalade-v-inline-B-1.jpg?auto=webp",
        carModel: "Audi A6 Quattro 2023",
        orderDetails: "#2437 (05.10.2024)",
      },],
};

const myBookingsSlice = createSlice({
  name: "myBookings",
  initialState,
  reducers: {
    setBookedCars(state, action: PayloadAction<CarCardState[]>) {
      action.payload.map(item=>{
        state.bookedCars.push(item);
        state.filteredCars.push(item);
      })
    },
    addNewBookedCar(state, action: PayloadAction<CarCardState>) {
        const newBooking = action.payload;
        console.log(newBooking)
        state.filteredCars.unshift(newBooking);
        state.bookedCars.unshift(newBooking);
        
    },
    setFilteredCars(state, action: PayloadAction<string>) {
      state.filteredCars = state.bookedCars.filter(
        (item) => item.bookingStatus.includes(action.payload)
      );
    },
  },
});

export const { setBookedCars, addNewBookedCar, setFilteredCars } = myBookingsSlice.actions;

export const selectBookedCars = (state: RootState) => state.MyBookings.bookedCars;
export const selectFilteredCars = (state: RootState) => state.MyBookings.filteredCars;

export default myBookingsSlice.reducer;
