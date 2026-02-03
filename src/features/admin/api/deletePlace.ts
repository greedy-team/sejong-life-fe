import { authApi } from '../../../api/api';

export const deletePlace = async (placeId: number) => {
  try {
    const response = await authApi.delete(`/api/places/${placeId}`);
    return response;
  } catch (error) {
    console.log('삭제실패:', error);
    throw error;
  }
};
