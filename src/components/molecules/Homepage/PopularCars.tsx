import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Cards from "../../atoms/Cards";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/PopularCars.css";
import { BASE_URL } from "../../../../constants";

const PopularCars = () => {
  const isLarge = useMediaQuery({ minWidth: 1025 });
  const isDesktop = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const [popularCars, setPopularCars] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cars?pickupLocationId=`);
        console.log("API response:", response.data.content);

        let carsToDisplay = response.data.content.slice(0, 4); // You may need to adjust `.data` based on API response structure

        if (isLarge) {
          carsToDisplay = carsToDisplay.slice(0, 4);
        } else if (isDesktop) {
          carsToDisplay = carsToDisplay.slice(0, 3);
        }

        setPopularCars(carsToDisplay);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchPopularCars();
  }, [isLarge, isDesktop]);

  return (
    <section id="popular-cars">
      <div className="subheadings">(POPULAR CARS)</div>
      <div className="popularCars">
        {popularCars.map((car, index) => (
          <Cards
            key={index}
            carId={car.carId}
            carRating={car.carRating}
            model={car.model}
            img={car.imageUrl[0]}  // use a fallback image path if needed
            // img={car.images?.[0] ?? "/placeholder.jpg"}  // use a fallback image path if needed
            location={car.location}
            status={car.status}
            pricePerDay={car.pricePerDay}
          />
        ))}
      </div>
      <div id="go-to-car">
        <Link to="/cars">View all cars</Link>
      </div>
    </section>
  );
};
  
export default PopularCars;
