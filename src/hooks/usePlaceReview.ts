import { useEffect, useState } from 'react';
import type { Review } from '../types/type';
import { getPlaceReview } from '../features/placeDetail/apis/reviewApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';

export const usePlaceReview = (id: string) => {
  const { isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const token = localStorage.getItem('accessToken') ?? '';

  useEffect(() => {
    const fetchPlaceReview = async () => {
      try {
        const reviewData = await getPlaceReview(id!, token);
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
  }, [isLoggedIn, id]);
  return { reviews };
};
