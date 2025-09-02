import { useState } from 'react';
import {
  addReviewLike,
  removeReviewLike,
} from '../features/placeDetail/apis/reviewApi';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useReviewLike = (
  placeId: string,
  reviewId: number,
  initialLiked: boolean,
  initialCount: number,
) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const handleLike = async () => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    try {
      if (isLiked) {
        const res = await removeReviewLike(placeId, reviewId, token);
        if (res.status === 200) {
          setIsLiked(false);
          setLikeCount((prev) => prev - 1);
        }
      } else {
        const res = await addReviewLike(placeId, reviewId, token);
        if (res.status === 200) {
          setIsLiked(true);
          setLikeCount((prev) => prev + 1);
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 404) {
          toast.error('존재하지 않는 리뷰이거나 유저입니다.');
        } else {
          toast.error('리뷰 좋아요 처리 중 오류가 발생했습니다.');
        }
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return { isLiked, likeCount, handleLike };
};
