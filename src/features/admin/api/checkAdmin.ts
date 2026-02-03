import { authApi } from '../../../api/api';

export const checkAdmin = async (): Promise<boolean> => {
  try {
    await authApi.get(`/api/auth/admin`);
    return true;
  } catch (error) {
    console.log('관리자인증 실패:', error);
    return false;
  }
};
