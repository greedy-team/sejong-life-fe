import type { Review } from '../../../types/type';
import api from '../../../api/api';

export const getPlaceReview = async (placeId: string): Promise<Review[]> => {
  try {
    const response = await api.get(`/places/${placeId}/reviews`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
