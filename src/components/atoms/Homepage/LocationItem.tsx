import "./css/LocationItem.css";

export const LocationItem = ({
  locationPlace,
  locationDesc,
  onClick,
  isActive,
}: {
  locationPlace: string;
  locationDesc: string;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <div
      className={`location-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="location-item-place">{locationPlace}</div>
      <div className="location-item-description">{locationDesc}</div>
    </div>
  );
};
