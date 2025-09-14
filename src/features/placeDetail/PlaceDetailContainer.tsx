import PhotoStrip from './PhotoStrip';
import PlaceInfo from './PlaceInfo';
import { useParams } from 'react-router-dom';
import ReviewStatsSection from './ReviewStatsSection';
import ReviewCard from './place-review-card/ReviewCard';
import ReviewWriteButton from './ReviewWriteButton';
import MoreReviewButton from './MoreReviewButton';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';
import { usePlaceReview } from '../../hooks/usePlaceReview';
import { useReviewStats } from '../../hooks/useReviewStats';

const PlaceDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { place } = usePlaceDetail(id!);
  const { reviews } = usePlaceReview(id!);
  const { stats } = useReviewStats(id!);

  if (!place || !stats) return <div>로딩중...</div>;

  return (

    <div className="mx-auto mt-12 flex w-full max-w-screen-lg flex-col items-center gap-10 overflow-y-auto">

      <PhotoStrip images={place.images.map((image) => image.url)} />
      <PlaceInfo place={place} />
      <div className="flex w-full border border-gray-100" />
      <ReviewWriteButton placeName={place.name} placeId={id!} />
      <div className="flex w-full border border-gray-100" />
      <ReviewStatsSection stats={stats} />
      <div className="flex w-full flex-col sm:w-[90%]">
        {reviews.slice(0, 2).map((review) => (
          <>
            <div className="flex w-full border border-gray-100" />
            <ReviewCard key={review.reviewId} review={review} placeId={id!} />
          </>
        ))}
        {reviews.length > 2 && (
          <MoreReviewButton reviewCount={stats.reviewCount} />
        )}
      </div>
    </div>
  );
};

export default PlaceDetailContainer;
