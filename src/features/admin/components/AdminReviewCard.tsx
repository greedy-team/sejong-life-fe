import { useState } from 'react';
import type { AdminReview } from '../model/types';
import { formatDateDot } from '../../../utils/format';
import { ICONS } from '../constants/icons';
import IconText from '../../../components/share/IconText';
import Rating from '../../../components/share/Rating';
import LightboxViewer from '../../placeDetail/LightboxViewer';

interface AdminReviewCardProps {
  review: AdminReview;
  onDelete: (placeId: number, reviewId: number) => void;
}

function AdminReviewCard({ review, onDelete }: AdminReviewCardProps) {
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <article className="rounded border border-gray-200 bg-white p-4 shadow-sm">
      <header className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{review.userName}</span>
          <span className="text-sm text-gray-500">({review.studentId})</span>
        </div>
        <div className="flex items-center gap-2">
          <Rating rating={review.rating} />
          <time dateTime={review.createdAt} className="text-sm text-gray-500">
            {formatDateDot(review.createdAt)}
          </time>
        </div>
      </header>

      <IconText src={ICONS.map} alt="장소">
        <span className="text-sm text-blue-600">{review.placeName}</span>
      </IconText>

      <p className="my-3 text-gray-700">{review.content}</p>

      {review.images.length > 0 && (
        <div className="mb-3 flex gap-1 overflow-x-auto">
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

      <LightboxViewer
        isLightboxOpen={isLightboxOpen}
        index={index}
        images={review.images.map((img) => img.url)}
        onClose={() => setIsLightboxOpen(false)}
        setIndex={setIndex}
      />

      {review.tags.length > 0 && (
        <ul className="mb-3 flex flex-wrap gap-1">
          {review.tags.map((tag) => (
            <li
              key={tag.tagId}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              #{tag.tagName}
            </li>
          ))}
        </ul>
      )}

      <footer className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <IconText src={ICONS.heartRed} alt="좋아요">
            {review.likeCount}
          </IconText>
        </div>
        <div className="flex items-center gap-3">
          <span>ID: {review.reviewId}</span>
          <button
            type="button"
            onClick={() => onDelete(review.placeId, review.reviewId)}
            className="text-red-500 hover:text-red-700"
          >
            삭제하기
          </button>
        </div>
      </footer>
    </article>
  );
}

export default AdminReviewCard;
