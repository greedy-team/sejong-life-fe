import { api } from '../../../api/api';
import type { PlaceUrlResponseProps } from '../../../types/type';

interface createPlaceUrlProps {
  id: string;
  name: string;
}

export const createPlaceUrl = async ({
  id,
  name,
}: createPlaceUrlProps): Promise<PlaceUrlResponseProps> => {
  const response = await api.post(`/api/places/urls`, {
    kakaoId: id,
    name: name,
  });
  return response.data.data;
};
