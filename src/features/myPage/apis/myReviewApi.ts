import type { MyReview } from '../../../types/type';
import { api } from '../../../api/api';

export const getMyReview = async (token: string): Promise<MyReview[]> => {
  try {
    if (token) {
      const response = await api.get(`/api/mypage/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } else {
      const response = await api.get(`/api/mypage/reviews`);
      return response.data.data;
    }
  } catch (err) {
    throw err;
  }
};
