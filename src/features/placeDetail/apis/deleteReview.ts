import { authApi } from '../../../api/api';

export const deleteReview = async (placeId: string, reviewId: number) => {
  const response = await authApi.delete(
    `/api/places/${placeId}/reviews/${reviewId}`,
  );

  return response;
};
