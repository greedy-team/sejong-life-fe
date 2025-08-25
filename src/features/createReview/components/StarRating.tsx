import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex w-full justify-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="cursor-pointer px-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`h-8 w-8 transition-colors duration-100 ${
                (hover || value) >= starValue
                  ? 'fill-yellow-400'
                  : 'fill-gray-300'
              }`}
            >
              <path
                d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 
                       1.402 8.172L12 18.896l-7.336 3.862 
                       1.402-8.172L.132 9.21l8.2-1.192z"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
