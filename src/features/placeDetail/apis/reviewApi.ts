import type { Review, ReviewStatsProps } from '../../../types/type';
import api from '../../../api/api';

export const getPlaceReview = async (
  placeId: string,
  token: string,
): Promise<Review[]> => {
  try {
    if (token) {
      const response = await api.get(`/api/places/${placeId}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } else {
      const response = await api.get(`/api/places/${placeId}/reviews`);
      return response.data.data;
    }
  } catch (err) {
    throw err;
  }
};

export const getReviewStats = async (
  placeId: string,
): Promise<ReviewStatsProps> => {
  try {
    const response = await api.get(`/api/places/${placeId}/reviews/summary`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const addReviewLike = async (
  placeId: string,
  reviewId: number,
  token: string,
) => {
  const response = await api.post(
    `/api/places/${placeId}/reviews/${reviewId}/likes`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const removeReviewLike = async (
  placeId: string,
  reviewId: number,
  token: string,
) => {
  const response = await api.delete(
    `/api/places/${placeId}/reviews/${reviewId}/likes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
