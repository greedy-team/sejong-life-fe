import { authApi } from '../../../api/api';

export const postPlace = async (formData: FormData) => {
  try {
    const response = await authApi.post(`/api/places`, formData);
    return response.data;
  } catch (error) {
    console.log('장소 등록 실패:', error);
    throw error;
  }
};
