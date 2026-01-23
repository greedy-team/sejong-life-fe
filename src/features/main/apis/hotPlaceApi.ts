import type { HotPlaceApiResponse } from '../../../components/place-item-card/model/type';
import { api } from '../../../api/api';

export const fetchHotPlaces = async (): Promise<HotPlaceApiResponse> => {
  try {
    const response = await api.get('/api/places/hot');
    return response.data;
  } catch (error) {
    console.error('인기 장소 조회 실패:', error);
    throw error;
  }
};
