import { authApi } from '../../../api/api';

export const postReview = async (placeId: number, formData: FormData) => {
  try {
    const response = await authApi.post(
      `/api/places/${placeId}/reviews`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('리뷰 등록 실패:', error);
    throw error;
  }
};
