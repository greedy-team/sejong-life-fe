import { useAuth } from './useAuth';
import type { MyReview } from '../types/type';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getMyReview } from '../features/myPage/apis/myReviewApi';
import { deleteMyReview } from '../features/myPage/apis/deleteMyReview';

const useMyReview = () => {
  const { isLoggedIn } = useAuth();
  const [myReviews, setMyReviews] = useState<MyReview[]>([]);
  const token = localStorage.getItem('accessToken') ?? '';

  useEffect(() => {
    const fetchMyReview = async () => {
      try {
        const reviewData = await getMyReview(token);
        setMyReviews(reviewData);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    };
    fetchMyReview();
  }, [isLoggedIn]);

  const handleDeleteMyReview = async (reviewId: number) => {
    const ok = confirm('정말 삭제하시겠습니까?');
    if (!ok) return false;

    try {
      const response = await deleteMyReview(reviewId);

      if (response.status === 200) {
        toast.success('리뷰가 삭제되었습니다.');
        setMyReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
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

  return { myReviews, handleDeleteMyReview };
};

export default useMyReview;
