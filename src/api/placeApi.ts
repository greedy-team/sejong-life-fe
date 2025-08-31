import type { PlaceItemCardProps } from '../components/place-item-card/model/type';
import type { DetailPlace } from '../types/type';
import api from './api';

// 장소 상세 정보 api
export const fetchPlaceDetail = async (
  placeId: number,
): Promise<DetailPlace> => {
  const response = await api.get(`/places/${placeId}`);
  return response.data;
};

export const fetchHotPlaces = async (): Promise<PlaceItemCardProps> => {
  const response = await api.get('/place/hot');
  return response.data;
};
