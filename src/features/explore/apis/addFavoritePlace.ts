import { authApi } from '../../../api/api';

export const addFavoritePlace = async (placeId: number) => {
  try {
    const response = await authApi.post(`/api/places/${placeId}/favorite`);
    return response.data;
  } catch (error) {
    console.error('즐겨찾기 추가 실패:', error);
    throw error;
  }
};
