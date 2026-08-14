import { api } from '../../../api/api';
import type { LoginPayload, LoginResponse } from '../../../types/type';

interface SignUpPayload {
  studentId: string;
  name: string;
  nickname: string;
}

interface SignUpResponse {
  message: string;
  data: string;
}

export const requestLogin = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  try {
    const response = await api.post('/api/auth/login', payload);
    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

export const requestSignUp = async (
  payload: SignUpPayload,
): Promise<SignUpResponse> => {
  try {
    const signUpToken = localStorage.getItem('signUpToken');
    const response = await api.post('/api/users/signup', payload, {
      headers: {
        Authorization: `Bearer ${signUpToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};
