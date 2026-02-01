import { authApi } from '../../../api/api';

export const getFavoritePlaces = async () => {
  const response = await authApi.get(`/api/places/favorites/me`);
  return response.data;
};
