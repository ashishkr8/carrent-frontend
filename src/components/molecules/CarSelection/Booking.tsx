
import "react-datepicker/dist/react-datepicker.css";
import DateRangeSelector from "./DateRangeSelector";
import "./css/Booking.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";


interface BookingProps {
  isLoggedIn: boolean;
  setShowNotification: (show: boolean) => void;
}

const Booking = ({ isLoggedIn, setShowNotification }: BookingProps) => {
  // const [startDate, setStartDate] = useState<Date | null>(new Date());
  // const [endDate, setEndDate] = useState<Date | null>(new Date());

  const navigate = useNavigate()

  const handleBookClick = () => {
    if (!isLoggedIn) {
      setShowNotification(true);
    } else {
  
      navigate("/car-bookings")
    }
  };

  return (
    <div className="booking-section">
      {/* <div className="date-block"> */}
        {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MMMM d"
          customInput={<CustomInput />}
          popperPlacement="bottom-start"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="MMMM d"
          customInput={<CustomInput />}
          popperPlacement="bottom-start"
        /> */}
        <DateRangeSelector />
      {/* </div> */}

      <button
        className="book-now-btn"
        onClick={handleBookClick}
      >
        Book the car - $180/day
      </button>
    </div>
  );
};

export default Booking;
