import type { PlaceProps } from '../../../types/type';
import { authApi } from '../../../api/api';

export const getMyPlaces = async (): Promise<PlaceProps[]> => {
  try {
    const response = await authApi.get('/api/places/favorites/me');
    return response.data.data;
  } catch (err) {
    console.error('저장된 장소 조회 실패', err);
    throw err;
  }
};
