import { api } from '../../../api/api';
import type { PlaceLookUpItemResponseProps } from '../../../types/type';

export const getPlaceLookup = async (
  placeName: string,
): Promise<PlaceLookUpItemResponseProps> => {
  const response = await api.get(`/api/places/search`, {
    params: { query: placeName },
  });
  return response.data;
};
