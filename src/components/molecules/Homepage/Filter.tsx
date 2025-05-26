// src/components/Filter/Filter.tsx
import { useState } from "react";
import "./css/Filter.css";
import RedInputBtn from "../../atoms/RedInputBtn";
import SelectField from "../../atoms/Homepage/SelectField";
import DateField from "../../atoms/Homepage/DateField";
import PriceRange from "../../atoms/Homepage/PriceRange";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../../context/FilterContext"; // Import your filter context

interface Filters {
  pickUpLoc: string;
  dropOffLoc: string;
  pickUpDate: string;
  dropOffDate: string;
  category: string;
  gearbox: string;
  engine: string;
  priceMin: number;
  priceMax: number;
}

export default function Filter() {
  const { setFilters } = useFilter(); // Get setFilters from context
  const navigate = useNavigate(); // For navigation to the Cars page

  const locations = [
    "Choose location",
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

  const categories = [
    "Passenger car", // Keeping this for alignment
    "SUV",
    "Van", // Keeping this for alignment
    "CROSSOVER",
    "PREMIUM",
    "SEDAN",
    "COMPACT SUV",
    "HATCHBACK",
    "LUXURY SUV",
    "SPORTS SUV",
  ];

  const gearboxes = ["AUTOMATIC", "MANUAL"];

  const engines = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"];
  const SLIDER = { min: 0, max: 5000, step: 50 };

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const initial: Filters = {
    pickUpLoc: locations[0],
    dropOffLoc: locations[0],
    pickUpDate: today,
    dropOffDate: tomorrow,
    category: categories[0],
    gearbox: gearboxes[0],
    engine: engines[0],
    priceMin: SLIDER.min,
    priceMax: SLIDER.max,
  };

  const [filters, setLocalFilters] = useState<Filters>(initial);
  const clearAll = () => {
    setLocalFilters(initial); // Reset local state
    setFilters(initial); // Reset global filter state
  };

  const onChange = <K extends keyof Filters>(key: K, val: Filters[K]) =>
    setLocalFilters((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Set the filters to the global state using setFilters
    setFilters(filters);
    // Navigate to the cars page
    navigate("/cars");
  };

  return (
    <section className="car-filter-section">
      <h2 className="filter-title">Choose a car for rental</h2>
      <form className="filter-container" onSubmit={handleSubmit}>
        <button type="button" className="clear-filters" onClick={clearAll}>
          Clear all filters
        </button>

        {/* First Row */}
        <div className="filter-row">
          <SelectField
            label="Pick-up location"
            value={filters.pickUpLoc}
            options={locations}
            onChange={(v) => onChange("pickUpLoc", v)}
          />
          <SelectField
            label="Drop-off location"
            value={filters.dropOffLoc}
            options={locations}
            onChange={(v) => onChange("dropOffLoc", v)}
          />
          <DateField
            label="Pick-up date"
            value={filters.pickUpDate}
            onChange={(v) => onChange("pickUpDate", v)}
          />
          <DateField
            label="Drop-off date"
            value={filters.dropOffDate}
            onChange={(v) => onChange("dropOffDate", v)}
          />
        </div>

        {/* Second Row */}
        <div className="filter-row">
          <SelectField
            label="Car category"
            value={filters.category}
            options={categories}
            onChange={(v) => onChange("category", v)}
          />
          <SelectField
            label="Gearbox"
            value={filters.gearbox}
            options={gearboxes}
            onChange={(v) => onChange("gearbox", v)}
          />
          <SelectField
            label="Type of engine"
            value={filters.engine}
            options={engines}
            onChange={(v) => onChange("engine", v)}
          />
          <PriceRange
            min={SLIDER.min}
            max={SLIDER.max}
            step={SLIDER.step}
            valueMin={filters.priceMin}
            valueMax={filters.priceMax}
            onMinChange={(v) => onChange("priceMin", v)}
            onMaxChange={(v) => onChange("priceMax", v)}
          />
          <div className="filter-item button-item">
            <RedInputBtn className="find-button" type="submit">
              Find a Car
            </RedInputBtn>
          </div>
        </div>
      </form>
    </section>
  );
}
