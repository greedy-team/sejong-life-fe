import type { HotPlaceApiResponse } from '../components/place-item-card/model/type';
import type { DetailPlace } from '../types/type';
import { api } from './api';

// 장소 상세 정보 api
export const fetchPlaceDetail = async (
  placeId: number,
): Promise<DetailPlace> => {
  const response = await api.get(`/api/places/${placeId}`);
  return response.data;
};

export const fetchHotPlaces = async (): Promise<HotPlaceApiResponse> => {
  const response = await api.get('/api/places/hot');
  return response.data;
};
