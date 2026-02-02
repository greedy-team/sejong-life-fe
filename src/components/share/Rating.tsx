import { renderStars } from '../../utils/format';

interface RatingProps {
  rating: number;
  maxRating?: number;
}

function Rating({ rating, maxRating = 5 }: RatingProps) {
  const stars = renderStars(rating, maxRating);

  return (
    <span aria-label={`${rating}점`}>
      <span className="text-[#77db30]">{stars.filled}</span>
      <span className="text-gray-300">{stars.empty}</span>
    </span>
  );
}

export default Rating;
