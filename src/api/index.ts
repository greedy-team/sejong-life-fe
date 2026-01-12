import type { DetailPlace } from '../types/type';
import type { HotPlaceApiResponse } from '../components/place-item-card/model/type';
import type { Tag } from '../types/type';
import { api } from './api';

// 장소 상세 정보 api
export const fetchPlaceDetail = async (
  placeId: number,
): Promise<DetailPlace> => {
  const response = await api.get(`/api/places/${placeId}`);
  return response.data;
};

// 인기 장소 api
export const fetchHotPlaces = async (): Promise<HotPlaceApiResponse> => {
  const response = await api.get('/api/places/hot');
  return response.data;
};

// 태그 api
export const fetchTagList = async (): Promise<Tag> => {
  const response = await api.get('/api/tags');
  return response.data;
};
