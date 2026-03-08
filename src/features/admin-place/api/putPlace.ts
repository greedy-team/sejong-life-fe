import { authApi } from '../../../api/api';
import type { EditPlaceRequest } from '../../../types/type';

export const putPlace = async (
  placeId: number,
  body: EditPlaceRequest,
): Promise<void> => {
  try {
    await authApi.put(`/api/places/${placeId}`, body);
  } catch (error) {
    console.log('장소 수정 실패:', error);
    throw error;
  }
};
