import PhotoStrip from './PhotoStrip';
import PlaceInfo from './PlaceInfo';

import { useParams } from 'react-router-dom';
import ReviewStats from './ReviewStats';
import ReviewCard from './place-review-card/ReviewCard';
import ReviewWriteButton from './ReviewWriteButton';
import MoreReviewButton from './MoreReviewButton';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';
import { usePlaceReview } from '../../hooks/usePlaceReview';

const PlaceDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { place } = usePlaceDetail(id!);
  const { reviews } = usePlaceReview(id!);

  if (!place) return <div>로딩중...</div>;

  return (
    <div className="mx-auto mt-12 flex w-[75%] flex-col items-center gap-10 overflow-y-auto">
      <PhotoStrip images={place.images.map((image) => image.url)} />
      <PlaceInfo place={place} />
      <div className="flex w-full border border-gray-100" />
      <ReviewWriteButton placeName={place.name} placeId={id!} />
      <div className="flex w-full border border-gray-100" />
      <ReviewStats />
      <div className="flex w-[90%] flex-col">
        {reviews.slice(0, 2).map((review) => (
          <>
            <div className="flex w-full border border-gray-100" />
            <ReviewCard key={review.reviewId} review={review} placeId={id!} />
          </>
        ))}
        {reviews[2] && <MoreReviewButton />}
      </div>
    </div>
  );
};

export default PlaceDetailContainer;
