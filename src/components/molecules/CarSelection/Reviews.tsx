import { useState } from "react";
import  reviews  from "./data/Review-Data.json"
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;

  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div>
      {currentReviews.map((rev, i) => (
        <ReviewCard key={i} {...rev} />
      ))}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
