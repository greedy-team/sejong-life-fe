import { useParams } from 'react-router-dom';
import PhotoStrip from '../placeDetail/PhotoStrip';
import ReviewCard from '../placeDetail/place-review-card/ReviewCard';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';
import { usePlaceReview } from '../../hooks/usePlaceReview';
import { useReviewStats } from '../../hooks/useReviewStats';
import ReviewStatsSection from '../placeDetail/ReviewStatsSection';

const AllReviewSection = () => {
  const { id } = useParams<{ id: string }>();
  const { place } = usePlaceDetail(id!);
  const { stats, refetchStats } = useReviewStats(id!);
  const { reviews, handleDeleteReview } = usePlaceReview(id!, refetchStats);

  if (!place || !stats) return <div>로딩중...</div>;

  const reverseReviews = [...reviews].reverse();

  return (
    <div className="mx-auto mt-12 flex w-[75%] max-w-screen-lg flex-col items-center gap-10 overflow-y-auto">
      <PhotoStrip images={place.images.map((image) => image.url)} />
      <ReviewStatsSection stats={stats} />
      <div className="flex w-full flex-col">
        {reverseReviews.map((review) => (
          <>
            <div className="flex w-full border border-gray-100" />
            <ReviewCard
              key={review.reviewId}
              review={review}
              placeId={id!}
              onDelete={handleDeleteReview}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default AllReviewSection;
