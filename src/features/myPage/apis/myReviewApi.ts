import type { MyReview } from '../../../types/type';
import { authApi } from '../../../api/api';

export const getMyReview = async (): Promise<MyReview[]> => {
  const res = await authApi.get('/api/mypage/reviews');
  return res.data.data;
};
