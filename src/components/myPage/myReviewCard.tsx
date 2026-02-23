import type { MyReview } from '../../types/type';
import { useState } from 'react';
import TagButton from '../share/TagButton';
import LightboxViewer from '../../features/placeDetail/LightboxViewer';
import { formatDateDot } from '../../utils/format';
import Rating from '../share/Rating';
import useIsContentLong from '../../hooks/useIsContentLong';

interface MyReviewCardProps {
  myReview: MyReview;
  onDelete: (reviewId: number) => void;
}

const MyReviewCard = ({ myReview, onDelete }: MyReviewCardProps) => {
  const haveImages = myReview.images && myReview.images.length > 0;
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { contentRef, isContentLong } = useIsContentLong({
    maxLines: 3,
    deps: [myReview.content],
  });

  return (
    <>
      <article className="flex flex-col gap-3 px-5 py-5">
        <div className="flex justify-between">
          <div className="text-lg font-bold">
            {String(myReview.studentId).slice(0, 2)}학번
          </div>
          <div className="text-small text-gray-500">
            {formatDateDot(myReview.createdAt)}
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
      </article>

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
