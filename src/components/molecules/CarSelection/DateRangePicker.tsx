import { useState } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isWithinInterval } from 'date-fns';

const generateMonthMatrix = (month: Date) => {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });

  const dateMatrix: Date[][] = [];
  let current = start;
  while (current <= end) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(current);
      current = addDays(current, 1);
    }
    dateMatrix.push(week);
  }
  return dateMatrix;
};

const timeOptions = [
  '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM',
  '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
];

const Calendar = ({
  month,
  startDate,
  endDate,
  onDateClick,
  hoverDate,
  setHoverDate
}: {
  month: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
  hoverDate: Date | null;
  setHoverDate: (date: Date | null) => void;
}) => {
  const weeks = generateMonthMatrix(month);
  const isInRange = (date: Date) => {
    if (startDate && hoverDate && !endDate) {
      return isWithinInterval(date, {
        start: startDate < hoverDate ? startDate : hoverDate,
        end: startDate > hoverDate ? startDate : hoverDate
      });
    }
    if (startDate && endDate) {
      return isWithinInterval(date, { start: startDate, end: endDate });
    }
    return false;
  };

  return (
    <div className="calendar">
      <div className="month-title">{format(month, 'MMMM yyyy')}</div>
      <div className="weekdays">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="day-label">
            {format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i), 'E')[0]}
          </div>
        ))}
      </div>
      {weeks.map((week, i) => (
        <div className="week" key={i}>
          {week.map((day, idx) => {
            const sameDay = isSameDay(day, startDate!) || isSameDay(day, endDate!);
            const inRange = isInRange(day);
            const isToday = isSameDay(day, new Date());
            return (
              <div
                key={idx}
                className={`day ${!isSameMonth(day, month) ? 'dimmed' : ''} ${sameDay ? 'selected' : ''} ${inRange ? 'in-range' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => onDateClick(day)}
                onMouseEnter={() => setHoverDate(day)}
                onMouseLeave={() => setHoverDate(null)}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const TimePicker = ({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) => {
  return (
    <div className="time-picker">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {timeOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('07:00 AM');
  const [endTime, setEndTime] = useState<string>('10:30 AM');

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  return (
    <div className="date-range-picker">
      <div className="calendar-container">
        <Calendar
          month={new Date()}
          startDate={startDate}
          endDate={endDate}
          onDateClick={handleDateClick}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
        />
        <Calendar
          month={addMonths(new Date(), 1)}
          startDate={startDate}
          endDate={endDate}
          onDateClick={handleDateClick}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
        />
      </div>

      <div className="time-pickers">
        <TimePicker label="Pick-up time" value={startTime} onChange={setStartTime} />
        <TimePicker label="Drop-off time" value={endTime} onChange={setEndTime} />
      </div>
    </div>
  );
};

export default DateRangePicker;
