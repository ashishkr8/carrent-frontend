import React, { useEffect } from 'react'
import CarCard from './../molecules/checkoutPage/CarCard.tsx'
import "./css/MyBookings.css"
import MyBookingsFilter from './../molecules/checkoutPage/MyBookingsFilter.tsx'
import { useAppDispatch, useAppSelector } from '../../../ReduxSetup/hooks.ts'
import { selectFilteredCars, setBookedCars } from '../../../ReduxSetup/slices/myBookingsSlice.ts'
import { selectUserSlice } from '../../../ReduxSetup/slices/userProfileSlice.ts'
import axios from 'axios'
import { BASE_URL } from '../../../constants.tsx'

interface cardItem {
      carId:string,
      bookingId:string,
      bookingStatus: string,
      carImageUrl:string,
      carModel: string,
      orderDetails: string,
}


const MyBookings:React.FC = () => {

  const myFilteredBookingsList = useAppSelector(selectFilteredCars) ;
  const clientId = (useAppSelector(selectUserSlice)).clientId
  const dispatchRedux = useAppDispatch();
  const fetchUserBookings = async() => {

    if(clientId){
      const response = await axios.get(`${BASE_URL}/bookings/user/${clientId}`);
      const mycars = response?.data?.content;
      console.log(mycars)
      dispatchRedux(
        setBookedCars(mycars)
      )
    }
  }

  

  useEffect(()=>{
    console.log(clientId)
    fetchUserBookings();
  },[clientId])
  return (
    <div className='mybookings-root'>
      <h2 className='mybookings-text'>My Bookings</h2>
      <MyBookingsFilter />
      <div className='mybookings-cards-container'>
        {
            myFilteredBookingsList.map((item:cardItem,index:number)=>{
                return <CarCard key={item.bookingId+index} {...item}/>
            })
        }
    </div>
    </div>
  )
}

export default MyBookings