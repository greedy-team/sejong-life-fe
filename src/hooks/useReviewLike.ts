import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (isLoggedIn) {
      setIsLiked(initialLiked);
      setLikeCount(initialLikeCount);
    } else {
      setIsLiked(false);
      setLikeCount(initialLikeCount);
    }
  }, [isLoggedIn, initialLiked, initialLikeCount]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    const prevLiked = isLiked;
    const prevLikeCount = likeCount;

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      if (prevLiked) {
        await removeReviewLike(placeId, reviewId);
      } else {
        await addReviewLike(placeId, reviewId);
      }
    } catch (err) {
      setIsLiked(prevLiked);
      setLikeCount(prevLikeCount);

      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          toast.error(err.message);
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
