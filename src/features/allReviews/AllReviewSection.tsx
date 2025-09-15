import { useParams } from 'react-router-dom';
import PhotoStrip from '../placeDetail/PhotoStrip';
import ReviewStats from '../placeDetail/ReviewStats';
import ReviewCard from '../placeDetail/place-review-card/ReviewCard';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';
import { usePlaceReview } from '../../hooks/usePlaceReview';

const AllReviewSection = () => {
  const { id } = useParams<{ id: string }>();
  const { place } = usePlaceDetail(id!);
  const { reviews } = usePlaceReview(id!);

  if (!place || reviews.length === 0) return <div>로딩중...</div>;

  return (
    <div className="mx-auto mt-12 flex w-[75%] flex-col items-center gap-10 overflow-y-auto">
      <PhotoStrip images={place.images.map((image) => image.url)} />
      <ReviewStats />
      <div className="flex w-[90%] flex-col">
        {reviews.map((review) => (
          <>
            <div className="flex w-full border border-gray-100" />
            <ReviewCard key={review.reviewId} review={review} placeId={id!} />
          </>
        ))}
      </div>
    </div>
  );
};

export default AllReviewSection;
