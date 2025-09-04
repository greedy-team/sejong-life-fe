import api from '../../../api/api';
import type { DetailPlaceProps } from '../../../types/type';

export const getPlaceDetails = async (
  placeId: string,
): Promise<DetailPlaceProps> => {
  try {
    const response = await api.get(`/api/places/${placeId}`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
