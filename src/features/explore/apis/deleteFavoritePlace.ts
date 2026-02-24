import { authApi } from '../../../api/api';

export const deleteFavoritePlace = async (placeId: number) => {
  try {
    const response = await authApi.delete(`/api/places/${placeId}/favorite`);
    return response.data;
  } catch (error) {
    console.error('즐겨찾기 삭제 실패:', error);
    throw error;
  }
};
