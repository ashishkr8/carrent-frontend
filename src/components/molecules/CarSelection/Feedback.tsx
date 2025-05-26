import { useState } from "react";
import ReviewData from "./data/Review-Data.json";
import { selectCarFeedbacks } from "../../../../ReduxSetup/slices/currCarFeebackSlice";
import { useAppSelector } from "../../../../ReduxSetup/hooks";
import ReviewCard from "./ReviewCard";
import "./css/Feedback.css";

interface Review {
  name: string;
  photo: string;
  stars: number;
  review: string;
  date: string;
}

const ITEMS_PER_PAGE = 3;

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split(".");
  return new Date(`${year}-${month}-${day}`);
};

const Feedback = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("newest");

  const reviewsRedux = useAppSelector(selectCarFeedbacks);

  const sortedReviews = (reviewsRedux.length == 0 ? [...ReviewData]:[...reviewsRedux]).sort((a: Review, b: Review) => {
    switch (sortOption) {
      case "newest":
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      case "oldest":
        return parseDate(a.date).getTime() - parseDate(b.date).getTime();
      case "rating-low-high":
        return a.stars - b.stars;
      case "rating-high-low":
        return b.stars - a.stars;
      default:
        return 0;
    }
  });

  const totalReviews = sortedReviews.length;
  const totalPages = Math.ceil(totalReviews / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentReviews = sortedReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageClick = (page: number) => setCurrentPage(page);
  const handleNavigation = (step: number) => setCurrentPage((prev) => prev + step);

  const renderArrow = (direction: "left" | "right") => (
    <button
      className="arrow-btn"
      onClick={() => handleNavigation(direction === "left" ? -1 : 1)}
    >
      <svg width="1.25vw"  viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        {direction === "left" ? (
          <path d="M1.66663 7.0013H20.3333M1.66663 7.0013L6.99996 1.66797M1.66663 7.0013L6.99996 12.3346" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M20.3334 7.0013H1.66675M20.3334 7.0013L15.0001 12.3346M20.3334 7.0013L15.0001 1.66797" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    </button>
  );

  const renderPages = () => {
    if (totalPages <= 1) return null;
  
    const pages = [];
  
    if (currentPage > 1) {
      pages.push(renderArrow("left"));
    }
  
    let start = currentPage;
    let end = Math.min(currentPage + 1, totalPages);
  
    
    if (currentPage === totalPages && totalPages > 1) {
      start = currentPage - 1;
      end = currentPage;
    }
  
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
  
    if (currentPage < totalPages) {
      pages.push(renderArrow("right"));
    }
  
    return pages;
  };
  

  return (
    <div className="feedback">
      {/* <div className="feedback-header"> */}
        <div className="feedback-heading-wrap">
          <h3>Feedback</h3>
          <div className="selection">
            <label htmlFor="sort" className="sort-label">Sort by:</label>
            <div className="select-wrapper">
              <select
                id="sort"
                className="minimal-select"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="rating-low-high">Low to High</option>
                <option value="rating-high-low">High to Low</option>
              </select>
              <span className="custom-arrow">
                <svg width="0.972vw" height="" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      {/* </div> */}

      {currentReviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}

      <div className="pagination">{renderPages()}</div>
    </div>
  );
};

export default Feedback;
