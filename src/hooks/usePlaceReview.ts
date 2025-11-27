import { useEffect, useState } from 'react';
import type { Review } from '../types/type';
import { getPlaceReview } from '../features/placeDetail/apis/reviewApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';
import { deleteReview } from '../features/placeDetail/apis/deleteReview';

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
  }, [isLoggedIn, id, reviews]);

  const handleDeleteReview = async (reviewId: number) => {
    const ok = confirm('정말 삭제하시겠습니까?');
    if (!ok) return false;

    try {
      const response = await deleteReview(id, reviewId);

      if (response.status === 200) {
        toast.success('리뷰가 삭제되었습니다.');
        setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
      } else {
        toast.error('리뷰 삭제에 실패했습니다.');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  };

  return { reviews, handleDeleteReview };
};
