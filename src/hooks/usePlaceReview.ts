import { useEffect, useState } from 'react';
import type { Review } from '../types/type';
import { getPlaceReview } from '../features/placeDetail/apis/reviewApi';
import axios from 'axios';
import { toast } from 'react-toastify';

export const usePlaceReview = (id: string) => {
  const [reviews, setReviews] = useState<Review[] | []>([]);
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
  return { reviews };
};
