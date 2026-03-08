import { api } from '../../../api/api';
import type { DetailPlaceProps } from '../../../types/type';

export const getPlaceDetail = async (
  placeId: number,
): Promise<DetailPlaceProps> => {
  const response = await api.get(`/api/places/${placeId}`);
  return response.data.data;
};
