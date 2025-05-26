import { Menu } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isBefore,
} from "date-fns";
 
const getCalendarDays = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const allDays = eachDayOfInterval({ start, end });
    const prefix = Array(start.getDay()).fill(null);
    return [...prefix, ...allDays];
};
 
const PeriodDropdown: React.FC<{
  onPeriodChange: (range: { start: Date | null; end: Date | null }) => void;
}> = ({ onPeriodChange }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [baseMonth, setBaseMonth] = useState(new Date());
    const [showTwoCalendars, setShowTwoCalendars] = useState(false);
 
    const dropdownRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
 
    const handleSelect = (day: Date) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(day);
            setEndDate(null);
        } else if (isBefore(day, startDate)) {
            setEndDate(startDate);
            setStartDate(day);
        } else {
            setEndDate(day);
        }
 
        setTimeout(() => {
            onPeriodChange({
                start: !startDate || (startDate && endDate) ? day : startDate,
                end: !startDate || (startDate && endDate) ? null : day,
            });
        }, 0);
    };
 
    const renderCalendar = (month: Date) => {
        const days = getCalendarDays(month);
        return (
            <div className="w-full max-w-xs p-2 bg-[#FFFBF3] rounded-md">
                <div className="text-center font-semibold mb-2">
                    {format(month, "MMMM yyyy")}
                </div>
                <div className="grid grid-cols-7 text-sm text-center font-medium mb-1">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d,i) => (
                        <div key={d+i}>{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm">
                    {days.map((day, idx) => {
                        if (!day) return <div key={idx} />;
                        const isSelected =
              (startDate && isSameDay(day, startDate)) ||
              (endDate && isSameDay(day, endDate));
                        const isInRange =
              startDate &&
              endDate &&
              isBefore(startDate, day) &&
              isBefore(day, endDate);
                        return (
                            <button
                                key={day.toString()}
                                onClick={() => handleSelect(day)}
                                className={`rounded-full w-8 h-8 text-center ${
                                    isSelected
                                        ? "bg-black text-white"
                                        : isInRange
                                            ? "bg-gray-200"
                                            : "hover:bg-gray-100"
                                }`}
                            >
                                {format(day, "d")}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };
 
    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
 
    // Observe dropdown size and toggle calendar count
    useEffect(() => {
        if (!popupRef.current) return;
 
        const observer = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;
            setShowTwoCalendars(width >= 500);
        });
 
        observer.observe(popupRef.current);
        return () => observer.disconnect();
    }, [isOpen]);
 
    return (
        <div className="relative w-full sm:w-64" ref={dropdownRef}>
            <Menu as="div" className="relative w-full">
                <Menu.Button
                    className="h-12 w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-[#FFFBF3] hover:border-gray-400 shadow-md flex items-center justify-between"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="text-gray-700 font-medium">
                        {startDate && endDate
                            ? `${format(startDate, "dd MMM")} - ${format(endDate, "dd MMM")}`
                            : "Period"}
                    </span>
                    <svg
                        className="w-4 h-4 text-gray-500 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </Menu.Button>
 
                {isOpen && (
                    <Menu.Items
                        static
                        ref={popupRef}
                        className="absolute left-0 z-20 mt-2 bg-[#FFFBF3] rounded-lg shadow-lg ring-1 ring-black/10 p-4 w-full sm:w-[600px] max-w-[95vw]"
                    >
                        <div className="flex justify-between items-center mb-4 px-2">
                            <button onClick={() => setBaseMonth(subMonths(baseMonth, 1))}>
                ←
                            </button>
                            <button onClick={() => setBaseMonth(addMonths(baseMonth, 1))}>
                →
                            </button>
                        </div>
 
                        <div
                            className={`flex ${
                                showTwoCalendars ? "space-x-4" : "justify-center"
                            }`}
                        >
                            {renderCalendar(baseMonth)}
                            {showTwoCalendars && renderCalendar(addMonths(baseMonth, 1))}
                        </div>
                    </Menu.Items>
                )}
            </Menu>
        </div>
    );
};
 
export default PeriodDropdown;
 
 