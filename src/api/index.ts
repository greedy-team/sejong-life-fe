import type { DetailPlace } from '../types/type';
import type { HotPlaceApiResponse } from '../components/place-item-card/model/type';
import type { Tag } from '../types/type';
import { api } from './api';

// 장소 상세 정보 api
export const fetchPlaceDetail = async (
  placeId: number,
): Promise<DetailPlace> => {
  try {
    const response = await api.get(`/api/places/${placeId}`);
    return response.data;
  } catch (error) {
    console.error('장소 상세 정보 조회 실패:', error);
    throw error;
  }
};

// 인기 장소 api
export const fetchHotPlaces = async (): Promise<HotPlaceApiResponse> => {
  try {
    const response = await api.get('/api/places/hot');
    return response.data;
  } catch (error) {
    console.error('인기 장소 조회 실패:', error);
    throw error;
  }
};

// 태그 api
export const fetchTagList = async (): Promise<Tag> => {
  try {
    const response = await api.get('/api/tags');
    return response.data;
  } catch (error) {
    console.error('태그 조회 실패:', error);
    throw error;
  }
};
