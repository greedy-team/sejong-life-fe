import { useAuth } from './useAuth';
import type { MyReview } from '../types/type';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getMyReview } from '../features/myPage/apis/myReviewApi';

const useMyReview = () => {
  const { isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const token = localStorage.getItem('accessToken') ?? '';

  useEffect(() => {
    const fetchMyReview = async () => {
      try {
        const reviewData = await getMyReview(token);
        setReviews(reviewData);
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

  //   const handleDeleteMyReview = async (reviewId: number) => {
  //     const ok = confirm('정말 삭제하시겠습니까?');
  //     if (!ok) return false;

  //     try {
  //       const response = await deleteReview(id, reviewId);

  //       if (response.status === 200) {
  //         toast.success('리뷰가 삭제되었습니다.');
  //         setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
  //       } else {
  //         toast.error('리뷰 삭제에 실패했습니다.');
  //       }
  //     } catch (err) {
  //       if (axios.isAxiosError(err) && err.response) {
  //         toast.error(err.response.data.message);
  //       } else {
  //         console.error(err);
  //       }
  //     }
  //   };

  //   return { reviews, handleDeleteReview };
  return reviews;
};

export default useMyReview;
