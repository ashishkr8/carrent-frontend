type ReviewProps = {
    name: string;
    photo: string;
    stars: number;
    review: string;
    date: string;
  };
  const ReviewCard = ({ name, photo, stars, review, date }: ReviewProps) => {
    return (
      <div className="review">
        <div className="review-left">
          <img src={photo} alt={name} />
          <span>{name}</span>
        </div>
        <div className="review-right">
          <div className="review-stars">
            {"★".repeat(stars)}{"☆".repeat(5 - stars)}
          </div>
          <p className="review-text">{review}</p>
        </div>
          <span className="review-date">{date}</span>
        {/* Add a separator line */}
        {/* <div className="review-line"></div> */}
      </div>
    );
  };
  
  export default ReviewCard;
  
  