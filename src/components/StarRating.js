// src/components/StarRating.js
import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./StarRating.css";

export default function StarRating({ rating, onChange, max = 5 }) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (value) => {
    onChange(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      const currentRating = hoverValue || rating;
      if (i <= currentRating) {
        stars.push(
          <FaStar
            key={i}
            className="star filled"
            onClick={() => handleClick(i)}
            onMouseOver={() => handleMouseOver(i)}
          />
        );
      } else if (i - 0.5 === currentRating) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="star half"
            onClick={() => handleClick(i - 0.5)}
            onMouseOver={() => handleMouseOver(i - 0.5)}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="star empty"
            onClick={() => handleClick(i)}
            onMouseOver={() => handleMouseOver(i)}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="star-rating" onMouseLeave={handleMouseLeave}>
      {renderStars()}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </div>
  );
}
