import type { DetailPlace } from '../types/type';
import api from './api';

// 장소 상세 정보 api
export const fetchPlaceDetail = async (
  placeId: number,
): Promise<DetailPlace> => {
  const response = await api.get(`/places/${placeId}`);
  return response.data;
};
