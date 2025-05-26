import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useFilter } from "../../../context/FilterContext";
import Cards from "../../atoms/Cards";
import "./css/Pagination.css";
import axios from "axios";
// import img1 from "../CarSelection/store/‏Rectangle1.jpg"
import { BASE_URL } from "../../../../constants";



interface Car {
  carRating: string;
  carId:string;
  model: string;
  imageUrl?: string;
  location: string;
  status: string;
  pricePerDay: number;
  category: string;
  gearbox: string;
  engine: string;
}

const Pagination = () => {
  const isLarge = useMediaQuery({ minWidth: 1025 });
  const isDesktop = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  const { filters } = useFilter();

  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(16);

  // Responsive items per page
  useEffect(() => {
    if (isLarge) setCarsPerPage(16);
    else if (isDesktop) setCarsPerPage(4);
    else setCarsPerPage(2);
  }, [isLarge, isDesktop]);

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cars?pickupLocationId=`);
        const data = response.data.content; // Access the actual data here
        // console.log(data);

        if (!Array.isArray(data)) {
          console.error("Unexpected data format", data);
          return;
        }

        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };

    fetchCars();
  }, []);

  // Filter cars when filters or original cars change
  useEffect(() => {
    const filtered = filterCars(cars, filters);
    setFilteredCars(filtered);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [filters, cars]);

  const filterCars = (cars: Car[], filters: any): Car[] => {
    return cars.filter((car) => {
      const isDefault = {
        pickUpLoc: filters.pickUpLoc === "Choose location",
        dropOffLoc: filters.dropOffLoc === "Choose location",
        category: filters.category === "Passenger car",
        gearbox: !filters.gearbox || filters.gearbox === "AUTOMATIC",
        engine: !filters.engine || filters.engine === "PETROL",
        price: filters.priceMin === 0 && filters.priceMax === 5000,
      };

      const locationMatch =
        isDefault.pickUpLoc || car.location.includes(filters.pickUpLoc.split(", ")[1] || "");

      const categoryMatch =
        isDefault.category || car.category === filters.category;

      const gearboxMatch =
        isDefault.gearbox || car.gearbox === filters.gearbox;

      const engineMatch =
        isDefault.engine || car.engine === filters.engine;

      const priceMatch =
        isDefault.price ||
        (car.pricePerDay >= filters.priceMin && car.pricePerDay <= filters.priceMax);

      return locationMatch && categoryMatch && gearboxMatch && engineMatch && priceMatch;
    });
  };

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const start = (currentPage - 1) * carsPerPage;
  const currentCars = filteredCars.slice(start, start + carsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="popular-cars">
      <div className="popularCars">
        {currentCars.length > 0 ? (
          currentCars.map((car, index) => (
            <Cards
              key={index}
              carId={car.carId}
              carRating={car.carRating}
              model={car.model}
              img={car.imageUrl || "/placeholder.jpg"}
              // img={car.images?.[0] || "/placeholder.jpg"}
              location={car.location}
              status={car.status}
              pricePerDay={car.pricePerDay}
            />
          ))
        ) : (
          <p>No cars found matching your filters.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? "active-page" : ""}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="arrow-btn"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default Pagination;
