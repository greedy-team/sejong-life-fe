import { authApi } from '../../../api/api';

export const deleteMyReview = async (reviewId: number) => {
  const response = await authApi.delete(`/api/mypage/reviews/${reviewId}`);

  return response;
};
