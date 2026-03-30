import PhotoStrip from './PhotoStrip';
import PlaceInfo from './PlaceInfo';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/share/Spinner';
import ReviewStatsSection from './ReviewStatsSection';
import ReviewCard from './place-review-card/ReviewCard';
import ReviewWriteButton from './ReviewWriteButton';
import MoreReviewButton from './MoreReviewButton';
import { usePlaceDetail, usePlaceReview, useReviewStats } from './hooks';

const PlaceDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { place } = usePlaceDetail(id!);
  const { stats, refetchStats } = useReviewStats(id!);
  const { reviews, handleDeleteReview } = usePlaceReview(id!, refetchStats);

  if (!place || !stats) return <Spinner />;

  return (
    <div className="mx-auto mt-6 flex w-full max-w-screen-lg flex-col items-center gap-10 overflow-y-auto lg:mt-10">
      <PhotoStrip images={place.images.map((image) => image.url)} />
      <PlaceInfo place={place} />
      <div className="flex w-full border border-gray-100" />
      <ReviewWriteButton placeName={place.name} placeId={id!} />
      <div className="flex w-full border border-gray-100" />
      <ReviewStatsSection stats={stats} />
      <div className="flex w-full flex-col sm:w-[90%]">
        {reviews.slice(0, 5).map((review) => (
          <div key={review.reviewId}>
            <div className="flex w-full border border-gray-100" />
            <ReviewCard
              review={review}
              placeId={id!}
              onDelete={handleDeleteReview}
            />
          </div>
        ))}
        {reviews.length > 5 && (
          <MoreReviewButton reviewCount={stats.reviewCount} />
        )}
      </div>
    </div>
  );
};

export default PlaceDetailContainer;
