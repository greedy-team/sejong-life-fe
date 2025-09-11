import type { Review } from '../../../types/type';
import TagButton from '../../../components/share/TagButton';
import { useState } from 'react';
import LightboxViewer from '../LightboxViewer';
import LoginModal from '../../login/components/LoginModal';
import LoginWidget from '../../login/components/LoginWidget';
import { useReviewLike } from '../../../hooks/useReviewLike';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-toastify';


interface ReviewCardProps {
  review: Review;
  placeId: string;
}

const ReviewCard = ({ review, placeId }: ReviewCardProps) => {
  const haveImages = review.images && review.images.length > 0;
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isContentLong = review.content.length > 150;
  const { isLoggedIn } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { isLiked, likeCount, handleLike } = useReviewLike(
    placeId,
    review.reviewId,
    review.liked,
    review.likeCount,
  );

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
        <span key={`full-${i}`} className="text-[#77db30]">
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

  const handleLikeClick = () => {
    if (isLoggedIn) {
      handleLike();
    } else {
      toast.error('좋아요를 남기려면 로그인해주세요');
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 px-5 py-5">
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
                onClick={() => {
                  setIndex(i);
                  setIsLightboxOpen(true);
                }}
                className="h-24 w-24 flex-shrink-0 cursor-pointer object-cover"
              />
            ))}
          </div>
        )}
        <div
          className={`whitespace-pre-wrap ${!isExpanded ? 'line-clamp-3' : ''}`}
        >
          {review.content}
        </div>
        {isContentLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="-mt-2 text-left text-sm font-semibold text-gray-500"
          >
            {isExpanded ? '간락히보기' : '더보기...'}
          </button>
        )}
        <div className="flex gap-1 overflow-x-auto whitespace-nowrap">
          {review.tags.map((tag) => (
            <TagButton key={tag.tagId} size="small">
              {tag.tagName}
            </TagButton>
          ))}
        </div>
        <button
          onClick={handleLikeClick}
          className="flex cursor-pointer items-start text-base text-gray-500"
        >
          <img
            src={
              isLiked
                ? '/asset/place-detail-page/heart-red.svg'
                : '/asset/place-detail-page/heart-gray.svg'
            }
            alt="like"
            className="h-5 w-5"
          />
          {review.likeCount}
        </button>
      </div>

      <LightboxViewer
        isLightboxOpen={isLightboxOpen}
        index={index}
        images={review.images}
        onClose={() => setIsLightboxOpen(false)}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginWidget onClose={() => setIsLoginOpen(false)} />
      </LoginModal>
    </>
  );
};

export default ReviewCard;
