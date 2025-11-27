import type { Review } from '../../../types/type';
import TagButton from '../../../components/share/TagButton';
import { useState, useEffect, useRef } from 'react';
import LightboxViewer from '../LightboxViewer';
import LoginModal from '../../login/components/LoginModal';
import LoginWidget from '../../login/components/LoginWidget';
import { useReviewLike } from '../../../hooks/useReviewLike';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

interface ReviewCardProps {
  review: Review;
  placeId: string;
  onDelete: (reviewId: number) => void;
}

const ReviewCard = ({ review, placeId, onDelete }: ReviewCardProps) => {
  const haveImages = review.images && review.images.length > 0;
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContentLong, setIsContentLong] = useState(false);
  const { isLoggedIn, studentId } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isLiked, likeCount, handleLike } = useReviewLike(
    placeId,
    review.reviewId,
    review.liked,
    review.likeCount,
  );
  const [isMyReview, setIsMyReview] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const checkContentLines = () => {
    if (contentRef.current) {
      const style = window.getComputedStyle(contentRef.current);
      const lineHeight = parseFloat(style.lineHeight);
      const lines = Math.round(contentRef.current.scrollHeight / lineHeight);

      setIsContentLong(lines > 3);
    }
  };

  useEffect(() => {
    checkContentLines();
  }, [review.content]);

  useEffect(() => {
    window.addEventListener('resize', checkContentLines);
    return () => {
      window.removeEventListener('resize', checkContentLines);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn && studentId) {
      setIsMyReview(String(review.studentId) === String(studentId));
    } else {
      setIsMyReview(false);
    }
  }, [isLoggedIn, studentId, review.studentId]);

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
            {review.images.map((image, i) => (
              <img
                key={image.imageId}
                src={image.url}
                alt={`리뷰 사진 ${i + 1}`}
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
          ref={contentRef}
          className={`whitespace-pre-wrap ${!isExpanded ? 'line-clamp-3' : ''}`}
        >
          {review.content}
        </div>

        {isContentLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="-mt-2 text-left text-sm font-semibold text-gray-500"
          >
            {isExpanded ? '간락히 보기' : '더보기...'}
          </button>
        )}
        <div className="flex gap-1 overflow-x-auto whitespace-nowrap">
          {review.tags.map((tag) => (
            <TagButton key={tag.tagId} size="small">
              {tag.tagName}
            </TagButton>
          ))}
        </div>
        <div className="flex justify-between">
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
            {likeCount}
          </button>
          {isMyReview && (
            <button
              className="cursor-pointer rounded-full border border-gray-400 px-2 text-xs text-gray-500"
              onClick={() => onDelete(review.reviewId)}
            >
              삭제
            </button>
          )}
        </div>
      </div>

      <LightboxViewer
        isLightboxOpen={isLightboxOpen}
        index={index}
        images={review.images.map((img) => img.url)}
        onClose={() => setIsLightboxOpen(false)}
        setIndex={setIndex}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginWidget onClose={() => setIsLoginOpen(false)} />
      </LoginModal>
    </>
  );
};

export default ReviewCard;
