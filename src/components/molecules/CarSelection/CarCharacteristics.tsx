// import { Card } from "../../store/Car-Data"; // adjust import path!
import {
  AutomaticTransmissionIcon,
  PetrolIcon,
  FuelEfficiencyIcon,
  EngineIcon,
  SeatsIcon,
  TrunkIcon,
} from "./icons"; // adjust import path!
import type { Card } from "./types";

const CarCharacteristics: React.FC<{ car: Card }> = ({ car }) => {
  return (
    <div className="details">
      <div className="title-rating">
        <div className="text-container">
          <h2>{car.model}</h2>
          <p>{car.location}</p>
        </div>
        <span className="rating">
          <span>{car.carRating} </span>
          <span className="ratingStar">★</span>
        </span>
      </div>

      <div className="car-specs">
        <div className="left-side">
          <div className="car-feature">
            <span className="icon">
              <AutomaticTransmissionIcon />
            </span>
            <span className="car-label">{car.gearBoxType}</span>
          </div>
          <div className="car-feature">
          <span className="icon">
              <PetrolIcon />
            </span>
            <span className="car-label">{car.fuelType}</span>
          </div>
          <div className="car-feature">
          <span className="icon">
              <FuelEfficiencyIcon />
            </span>
            <span className="car-label">{car.fuelConsumption}</span>
          </div>
        </div>
        <div className="right-side">
            <div className="car-feature">
            <span className="icon">
                <EngineIcon />
              </span>
              <span className="car-label">{car.engineCapacity}</span>
            </div>
            <div className="car-feature">
            <span className="icon">
                <SeatsIcon />
              </span>
              <span className="car-label">{car.passengerCapacity} seats</span>
            </div>
            <div className="car-feature">
            <span className="icon">
                <TrunkIcon />
              </span>
              <span className="car-label">Dual-Zone Climate</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CarCharacteristics;
