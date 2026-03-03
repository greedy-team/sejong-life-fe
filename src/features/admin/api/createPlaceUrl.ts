import { api } from '../../../api/api';
import type { PlaceUrlResponseProps } from '../../../types/type';

interface CreatePlaceUrlProps {
  id: string;
  name: string;
}

export const CreatePlaceUrl = async ({
  id,
  name,
}: CreatePlaceUrlProps): Promise<PlaceUrlResponseProps> => {
  const response = await api.post(`/api/places/urls`, {
    kakaoId: id,
    name: name,
  });
  return response.data.data;
};
