import type { MyReview } from '../../types/type';
import { useState, useRef, useEffect } from 'react';
import TagButton from '../share/TagButton';
import LightboxViewer from '../../features/placeDetail/LightboxViewer';
import { formatDate } from '../../utils/format';
import Rating from '../share/Rating';

interface MyReviewCardProps {
  myReview: MyReview;
  onDelete: (reviewId: number) => void;
}

const MyReviewCard = ({ myReview, onDelete }: MyReviewCardProps) => {
  const haveImages = myReview.images && myReview.images.length > 0;
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContentLong, setIsContentLong] = useState(false);

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
  }, [myReview.content]);

  useEffect(() => {
    window.addEventListener('resize', checkContentLines);
    return () => {
      window.removeEventListener('resize', checkContentLines);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 px-5 py-5">
        <div className="flex justify-between">
          <div className="text-lg font-bold">
            {String(myReview.studentId).slice(0, 2)}학번
          </div>
          <div className="text-small text-gray-500">
            {formatDate(myReview.createdAt)}
          </div>
        </div>
        <Rating rating={myReview.rating} />
        {haveImages && (
          <div className="flex gap-1 overflow-x-auto">
            {myReview.images.map((image, i) => (
              <img
                role="button"
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
          {myReview.content}
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
          {myReview.tags.map((tag) => (
            <TagButton key={tag.tagId} size="small">
              {tag.tagName}
            </TagButton>
          ))}
        </div>
        <div className="flex justify-end">
          {myReview.isAuthor && (
            <button
              className="cursor-pointer rounded-full border border-gray-400 px-2 text-xs text-gray-500"
              onClick={() => onDelete(myReview.reviewId)}
            >
              삭제
            </button>
          )}
        </div>
      </div>

      <LightboxViewer
        isLightboxOpen={isLightboxOpen}
        index={index}
        images={myReview.images.map((img) => img.url)}
        onClose={() => setIsLightboxOpen(false)}
        setIndex={setIndex}
      />
    </>
  );
};

export default MyReviewCard;
