import type { PlaceProps } from '../../../types/type';
import { authApi } from '../../../api/api';
import { toast } from 'react-toastify';

export const getMyPlaces = async (): Promise<PlaceProps[]> => {
  try {
    const response = await authApi.get('/api/places/favorites/me');
    return response.data.data;
  } catch (err) {
    console.error('저장한 장소 조회 실패', err);
    toast.error('저장한 장소 불러오기를 실패했어요.');
    throw err;
  }
};
