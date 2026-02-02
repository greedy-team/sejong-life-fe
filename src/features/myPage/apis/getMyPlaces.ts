import type { Place } from '../../../types/type';
import { authApi } from '../../../api/api';

export const getMyPlaces = async (): Promise<Place[]> => {
  try {
    const response = await authApi.get('/api/places/favorites/me');
    return response.data.data;
  } catch (err) {
    console.error('내 즐겨찾기 조회 실패', err);
    throw err;
  }
};
