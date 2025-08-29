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

export type Review = {
  reviewId: number;
  userId: number;
  studentId: number;
  rating: number;
  content: string;
  likeCount: number;
  createdAt: string;
  images: string[];
  tags: { tagId: number; tagName: string }[];
};

const PlaceDetailContainer = () => {
  const [place, setPlace] = useState<DetailPlaceProps | null>(null);
  const [reviews, setReviews] = useState<Review[] | []>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPlaceAndReviewDetail = async () => {
      try {
        const placeRes = await axios.get(`/sejonglife/api/places/${id}`);
        setPlace(placeRes.data.data);

        const reviewRes = await axios.get(
          `/sejonglife/api/places/${id}/reviews`,
        );
        setReviews(reviewRes.data.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    };
    fetchPlaceAndReviewDetail();
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
