import type { Review } from '../PlaceDetailContainer';
import TagButton from '../../../components/share/TagButton';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const haveImages = review.images && review.images.length > 0;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}.${month}.${day}`;
    } catch (error) {
      console.error('날짜 형식 오류:', error);
      return '';
    }
  };

  const rederStartIcons = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>,
      );
    }

    return stars;
  };

  return (
    <div className="flex w-full flex-col gap-2.5 border-t border-gray-200 px-5 py-5">
      <div className="flex justify-between">
        <div className="text-lg font-bold">
          {String(review.studentId).slice(0, 2)}학번
        </div>
        <div className="text-small text-gray-500">
          {formatDate(review.createdAt)}
        </div>
      </div>
      <div data-testid="review-rating">{rederStartIcons(review.rating)}</div>
      {haveImages && (
        <div className="flex gap-1 overflow-x-auto">
          {review.images.map((imgURL, i) => (
            <img
              key={i}
              src={imgURL}
              alt={'리뷰 사진 ${i+1}'}
              className="h-24 w-24 object-cover"
            />
          ))}
        </div>
      )}
      <div className="">{review.content}</div>
      <div className="flex flex-wrap gap-2">
        {review.tags.map((tag) => (
          <TagButton key={tag.tagId} size="small">
            {tag.tagName}
          </TagButton>
        ))}
      </div>
      <button className="flex cursor-pointer items-start text-base text-gray-500">
        ♡{review.likeCount}
      </button>
    </div>
  );
};

export default ReviewCard;
