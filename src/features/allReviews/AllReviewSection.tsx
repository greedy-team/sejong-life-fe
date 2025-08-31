import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import type { DetailPlaceProps, Review } from '../../types/type';
import { getPlaceDetails } from '../placeDetail/apis/placeDetailApi';
import { getPlaceReview } from '../placeDetail/apis/reviewApi';
import PhotoStrip from '../placeDetail/PhotoStrip';
import ReviewStats from '../placeDetail/ReviewStats';
import ReviewCard from '../placeDetail/place-review-card/ReviewCard';

const AllReviewSection = () => {
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
          toast.error(err.response.data.message);
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
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    };
    fetchPlaceReview();
  }, [id]);

  if (!place) return <div>로딩중...</div>;

  return (
    <div className="mx-auto mt-12 flex w-[70%] flex-col items-center gap-10 overflow-y-auto">
      <PhotoStrip images={place.images} />
      <ReviewStats />
      <div className="flex w-[90%] flex-col">
        {reviews.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviewSection;
