import type { PlaceProps } from '../../../types/type';
import { authApi } from '../../../api/api';

export const getMyPlaces = async (): Promise<PlaceProps[]> => {
  const res = await authApi.get('/api/places/favorites/me');
  return res.data.data;
};
