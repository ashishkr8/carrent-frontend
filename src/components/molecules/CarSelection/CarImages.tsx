import { useState } from "react";
import Rectangle1 from "./store/‏Rectangle1.jpg";
import Rectangle2 from "./store/Rectangle2.jpg";
import Rectangle3 from "./store/Rectangle3.jpg"; 
import Rectangle4 from "./store/Rectangle4.jpg"; 
import Rectangle5 from "./store/Rectangle5.jpg"; 




const CarImages=()=>{
    const thumbnails = [Rectangle1, Rectangle2, Rectangle3, Rectangle4, Rectangle5];
  const [mainImage, setMainImage] = useState(thumbnails[0]);
  
    
    
    return <>
    <div className="car-images">
            <div className="thumbnails">
              {thumbnails.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`car-thumb-${i}`}
                  onClick={() => setMainImage(src)}
                />
              ))}
            </div>
            <div className="main-image">
              <img src={mainImage} alt="main-car" />
              <span className="status-badge">Available</span>
            </div>
          </div></>
}

export default CarImages;



// import { useState } from "react";
// import carData from "../../../../backend/data/cars.json"; // path to your JSON


// type CarImagesProps = {
//     carId: string;
//   };
  
// const CarImages: React.FC<CarImagesProps> = ({ carId }) => {
//     const car = carData.find((c) => c.carId === carId);
  
//     const thumbnails = car?.images || car?.imageUrl || [];
  
//     const [mainImage, setMainImage] = useState(thumbnails[0]);
  
//     if (!car) return <p>Car not found.</p>;
  
//     return (
//       <div className="car-images">
//         <div className="thumbnails">
//           {thumbnails.map((src, i) => (
//             <img
//               key={i}
//               src={src}
//               alt={`car-thumb-${i}`}
//               onClick={() => setMainImage(src)}
//             />
//           ))}
//         </div>
//         <div className="main-image">
//           <img src={mainImage} alt="main-car" />
//           <span className="status-badge">
//             {car.status === "AVAILABLE" ? "Available" : "Unavailable"}
//           </span>
//         </div>
//       </div>
//     );
//   };

//   export default CarImages;
  