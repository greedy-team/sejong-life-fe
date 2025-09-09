import { useState } from 'react';
import { useAuth } from './useAuth';
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
  initialLikeCount: number,
) => {
  const { isLoggedIn } = useAuth();
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('인증 토큰이 없습니다. 로그인해주세요.');
      return;
    }

    const prevLiked = isLiked;
    const prevLikeCount = likeCount;
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      if (prevLiked) {
        await removeReviewLike(placeId, reviewId, token);
      } else {
        await addReviewLike(placeId, reviewId, token);
      }
    } catch (err) {
      setIsLiked(prevLiked);
      setLikeCount(prevLikeCount);
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
