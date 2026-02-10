import type { Review } from '../../../types/type';
import TagButton from '../../../components/share/TagButton';
import Rating from '../../../components/share/Rating';
import { formatDateDot } from '../../../utils/format';
import { useState } from 'react';
import LightboxViewer from '../LightboxViewer';
import LoginModal from '../../login/components/LoginModal';
import LoginWidget from '../../login/components/LoginWidget';
import { useReviewLike } from '../hooks';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import useIsContentLong from '../../../hooks/useIsContentLong';

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
  const { contentRef, isContentLong } = useIsContentLong({
    maxLines: 3,
    deps: [review.content],
  });
  const { isLoggedIn } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isLiked, likeCount, handleLike } = useReviewLike(
    placeId,
    review.reviewId,
    review.liked,
    review.likeCount,
  );

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
            {formatDateDot(review.createdAt)}
          </div>
        </div>
        <div data-testid="review-rating">
          <Rating rating={review.rating} />
        </div>
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
          {review.isAuthor && (
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
