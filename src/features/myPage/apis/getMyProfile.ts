import { authApi } from '../../../api/api';
import type { UserProfileResponseProps } from '../../../types/type';

export const getMyProfile = async (): Promise<UserProfileResponseProps> => {
  try {
    const response = await authApi.get(`/api/users`);
    return response.data.data;
  } catch (err) {
    console.error('유저정보 불러오기 실패', err);
    throw err;
  }
};
