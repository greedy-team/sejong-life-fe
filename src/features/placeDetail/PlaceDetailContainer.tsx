import PhotoStrip from './PhotoStrip';
import PlaceInfo from './PlaceInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewStats from './ReviewStats';
import ReviewCard from './place-review-card/ReviewCard';
import ReviewWriteButton from './ReviewWriteButton';
import MoreReviewButton from './MoreReviewButton';
import type { DetailPlaceProps } from '../../types/type';
import { useNavigate } from 'react-router-dom';
import { getPlaceDetails } from './apis/placeDetailApi';
import type { Review } from '../../types/type';
import { getPlaceReview } from './apis/reviewApi';

const PlaceDetailContainer = () => {
  const [place, setPlace] = useState<DetailPlaceProps | null>(null);
  const [reviews, setReviews] = useState<Review[] | []>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      try {
        const placeData = await getPlaceDetails(id!);
        setPlace(placeData);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          alert(err.response.data.message);
          navigate(-1);
        } else {
          console.error(err);
        }
      }
    };
    fetchPlaceDetail();
  }, [id, navigate]);

  useEffect(() => {
    const fetchPlaceReview = async () => {
      try {
        const reviewData = await getPlaceReview(id!);
        setReviews(reviewData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaceReview();
  }, [id]);

  if (!place || reviews.length === 0) return <div>로딩중...</div>;

  return (
    <div className="mx-auto mt-12 flex w-[70%] flex-col items-center gap-10 overflow-y-auto">
      <PhotoStrip images={place.images} />
      <PlaceInfo place={place} />
      <div className="flex w-full border border-gray-100"></div>
      <ReviewWriteButton placeName={place.placeName} />
      <ReviewStats />
      <div className="flex w-[90%] flex-col">
        {reviews.slice(0, 2).map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))}
        {reviews[2] && <MoreReviewButton />}
      </div>
    </div>
  );
};

export default PlaceDetailContainer;
