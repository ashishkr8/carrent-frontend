import React, { useState } from 'react';
import { useAppDispatch } from '../../../../ReduxSetup/hooks';
import { setFilteredCars } from '../../../../ReduxSetup/slices/myBookingsSlice';
import { BookingStatusConstants } from '../../../../constants';
import './css/MyBookingsFilter.css';

const MyBookingsFilter: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Bookings');
  const [isExpanded, setIsExpanded] = useState(false); // NEW
  const dispatch = useAppDispatch();

  const handleFilter = (filterText: string) => {
    setSelectedFilter(filterText);
    if (filterText === 'All Bookings') {
      dispatch(setFilteredCars(''));
    } else {
      dispatch(setFilteredCars(filterText));
    }

    // Auto-close on mobile/tablet
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="filter-root">
      <button
        className="toggle-filters-btn"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        {isExpanded ? 'Hide Filters' : 'Show Filters'}
      </button>

      <ul className={`filter ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <li
          className={selectedFilter === 'All Bookings' ? 'active' : 'non-active'}
          onClick={() => handleFilter('All Bookings')}
        >
          All bookings
        </li>
        <li
          className={selectedFilter === BookingStatusConstants.RESERVED ? 'active' : 'non-active'}
          onClick={() => handleFilter(BookingStatusConstants.RESERVED)}
        >
          Reserved
        </li>
        <li
          className={selectedFilter === BookingStatusConstants.SERVICESTARTED ? 'active' : 'non-active'}
          onClick={() => handleFilter(BookingStatusConstants.SERVICESTARTED)}
        >
          Service started
        </li>
        <li
          className={selectedFilter === BookingStatusConstants.SERVICEPROVIDED ? 'active' : 'non-active'}
          onClick={() => handleFilter(BookingStatusConstants.SERVICEPROVIDED)}
        >
          Service provided
        </li>
        <li
          className={selectedFilter === BookingStatusConstants.BOOKINGFINISHED ? 'active' : 'non-active'}
          onClick={() => handleFilter(BookingStatusConstants.BOOKINGFINISHED)}
        >
          Booking finished
        </li>
        <li
          className={selectedFilter === BookingStatusConstants.CANCELLED ? 'active' : 'non-active'}
          onClick={() => handleFilter(BookingStatusConstants.CANCELLED)}
        >
          Cancelled
        </li>
      </ul>
    </div>
  );
};

export default MyBookingsFilter;
