import api from '../../../api/api';
import type { LoginPayload, LoginResponse } from '../../../types/type';

export const requestLogin = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post('/api/auth/login', payload);
  return response.data;
};
