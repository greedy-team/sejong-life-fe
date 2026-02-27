import { api } from '../../../api/api';
import type { PlaceUrlResponseProps } from '../../../types/type';

export const createPlaceUrl = async (
  id: number,
  name: string,
): Promise<PlaceUrlResponseProps> => {
  const response = await api.post(`/api/places/urls`, {
    kakaoId: id,
    name: name,
  });
  return response.data.data;
};
