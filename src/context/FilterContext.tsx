import { createContext, useContext, useState, ReactNode } from "react";

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

interface FilterContextType {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const defaultFilters: Filters = {
  pickUpLoc: "Choose location",
  dropOffLoc: "Choose location",
  pickUpDate: new Date().toISOString().split("T")[0],
  dropOffDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  category: "Passenger car",
  gearbox: "AUTOMATIC",
  engine: "PETROL",
  priceMin: 0,
  priceMax: 5000,
};

const FilterContext = createContext<FilterContextType>({
  filters: defaultFilters,
  setFilters: () => {},
});

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
