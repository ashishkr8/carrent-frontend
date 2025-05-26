import React, { useEffect, useState } from "react";
import "./css/SideMenu.css";
import { useAppSelector, useAppDispatch } from "../../../../ReduxSetup/hooks";
import { selectUserSlice } from "../../../../ReduxSetup/slices/userProfileSlice";
import {
  selectCurrCarDetails,
  selectPickDropLocation,
  selectPickDropDate,
  setLocationDetails,
  setDateDetails,
} from "../../../../ReduxSetup/slices/currBookingSlice";
import axios from "axios";
import { BASE_URL } from "../../../../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locations = [
  "Ukraine, Kyiv",
  "Germany, Berlin",
  "France, Paris",
  "Italy, Rome",
  "Japan, Tokyo",
  "Canada, Toronto",
  "UK, London",
  "USA, Los Angeles",
  "USA, New York",
  "Australia, Sydney",
  "India, Mumbai",
  "Spain, Barcelona",
  "UAE, Dubai",
];

const formatDateTimeSimple = (input: string): string => {
  return input.replace("T", " ");
};

const formatDateTime = (input: string): string => {
  const date = new Date(input);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-US", options).replace("at", " | ");
};

const isDateBlocked = (date: Date, booked: { start: Date; end: Date }[]) => {
  return booked.some(({ start, end }) => date >= start && date <= end);
};

const SideMenu: React.FC = () => {
  const dispatchRedux = useAppDispatch();
  const { username, email, phone } = useAppSelector(selectUserSlice);
  const { pickupLocation, dropoffLocation } = useAppSelector(
    selectPickDropLocation
  );
  const { pickupDate, dropoffDate } = useAppSelector(selectPickDropDate);
  const carId = useAppSelector(selectCurrCarDetails).carId;

  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [tempPickupLoc, setTempPickupLoc] = useState(pickupLocation);
  const [tempDropoffLoc, setTempDropoffLoc] = useState(dropoffLocation);

  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempPickupDateRaw, setTempPickupDateRaw] = useState<Date | null>(null);
  const [tempDropoffDateRaw, setTempDropoffDateRaw] = useState<Date | null>(
    null
  );
  const [bookedRanges, setBookedRanges] = useState<
    { start: Date; end: Date }[]
  >([]);

  const saveLocation = () => {
    dispatchRedux(
      setLocationDetails({
        pickupLocation: tempPickupLoc,
        dropoffLocation: tempDropoffLoc,
      })
    );
    setIsEditingLocation(false);
  };

  const isDateConflict = (start: Date, end: Date) => {
    return bookedRanges.some((range) => start < range.end && end > range.start);
  };

  const saveDate = () => {
    if (!tempPickupDateRaw || !tempDropoffDateRaw) {
      alert("Please fill both pickup and dropoff dates.");
      return;
    }

    if (tempPickupDateRaw >= tempDropoffDateRaw) {
      alert("Pickup date must be before drop-off date.");
      return;
    }

    if (isDateConflict(tempPickupDateRaw, tempDropoffDateRaw)) {
      alert(
        "Selected dates conflict with existing bookings. Please choose different dates."
      );
      return;
    }

    dispatchRedux(
      setDateDetails({
        pickupDate: formatDateTimeSimple(tempPickupDateRaw.toISOString()),
        dropoffDate: formatDateTimeSimple(tempDropoffDateRaw.toISOString()),
      })
    );

    setIsEditingDate(false);
  };

  const fetchCarBookedDates = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings/dates/${carId}`);
      const ranges = response.data?.dates.map((booking: any) => ({
        start: new Date(booking.pickUpDateTime),
        end: new Date(booking.dropOffDateTime),
      }));
      setBookedRanges(ranges);
    } catch (error) {
      console.error("Failed to fetch booked dates:", error);
    }
  };

  useEffect(() => {
    fetchCarBookedDates();
  }, [carId]);

  return (
    <div className="side-menu">
      <div className="frame">
        <p className="frame-title">Personal Info</p>
        <div className="frame-box-1">
          <p className="frame-content">{username}</p>
          <p className="frame-content faded">{email}</p>
          <p className="frame-content faded">{phone}</p>
        </div>
      </div>

      <div className="frame">
        <p className="frame-title">Location</p>
        <div className="frame-box-2">
          <div className="inner-frame-box">
            <label className="label faded">Pick-up location</label>
            {isEditingLocation ? (
              <select
                className="filter-select"
                value={tempPickupLoc}
                onChange={(e) => setTempPickupLoc(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            ) : (
              <p className="frame-content">{pickupLocation}</p>
            )}
            <label className="label faded">Drop-off location</label>
            {isEditingLocation ? (
              <select
                className="filter-select"
                value={tempDropoffLoc}
                onChange={(e) => setTempDropoffLoc(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            ) : (
              <p className="frame-content">{dropoffLocation}</p>
            )}
          </div>
          <button
            onClick={
              isEditingLocation
                ? saveLocation
                : () => setIsEditingLocation(true)
            }
          >
            {isEditingLocation ? "Save" : "Change"}
          </button>
        </div>
      </div>

      <div className="frame">
        <p className="frame-title">Dates & Time</p>
        <div className="frame-box-2">
          <div className="inner-frame-box">
            <label className="label faded">Pick-up date & Time</label>
            {isEditingDate ? (
              <DatePicker
                selected={tempPickupDateRaw}
                onChange={(date: Date | null) => setTempPickupDateRaw(date)}
                showTimeSelect
                dateFormat="Pp"
                filterDate={(date) => !isDateBlocked(date, bookedRanges)}
                className="filter-select"
                calendarClassName="custom-calendar"
              />
            ) : (
              <p className="frame-content">{formatDateTime(pickupDate)}</p>
            )}

            <label className="label faded">Drop-off date & Time</label>
            {isEditingDate ? (
              <DatePicker
                selected={tempDropoffDateRaw}
                onChange={(date: Date | null) => setTempDropoffDateRaw(date)}
                showTimeSelect
                dateFormat="Pp"
                filterDate={(date) => !isDateBlocked(date, bookedRanges)}
                className="filter-select"
                calendarClassName="custom-calendar"
              />
            ) : (
              <p className="frame-content">{formatDateTime(dropoffDate)}</p>
            )}
          </div>
          <button
            onClick={isEditingDate ? saveDate : () => setIsEditingDate(true)}
          >
            {isEditingDate ? "Save" : "Change"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
