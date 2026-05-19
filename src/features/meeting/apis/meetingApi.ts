import { api, authApi } from '../../../api/api';
import type {
  Profile,
  ProfileRegisterPayload,
  CardOpenResponse,
  OpenCountResponse,
  ProfileCountResponse,
  LoginResponse,
} from '../../../types/meetingType';

export const fetchMeetingProfiles = async (): Promise<Profile[]> => {
  const response = await authApi.get('/api/meeting/profiles');
  return response.data;
};

export const fetchOpenCount = async (): Promise<OpenCountResponse> => {
  const response = await authApi.get('/api/meeting/profiles/open-count');
  return response.data?.data ?? response.data;
};

export const fetchProfileCount = async (): Promise<ProfileCountResponse> => {
  const response = await api.get('/api/meeting/profiles/count');
  return response.data?.data ?? response.data;
};

export const registerMeetingProfile = async (
  payload: ProfileRegisterPayload,
): Promise<LoginResponse> => {
  const signUpToken = sessionStorage.getItem('signUpToken');
  const ref = sessionStorage.getItem('meetingRef');

  const response = await authApi.post('/api/meeting/auth/signup', payload, {
    headers: {
      Authorization: `Bearer ${signUpToken}`,
    },
    params: ref ? { ref } : undefined,
  });
  return response.data;
};

export const openMeetingCard = async (
  profileId: number,
): Promise<CardOpenResponse> => {
  const response = await authApi.post(
    `/api/meeting/profiles/${profileId}/open`,
  );
  return response.data;
};

export const kakaoLogin = async ({
  code,
  state,
}: {
  code: string;
  state: string;
}) => {
  const response = await api.post('/api/meeting/auth/kakao/login', {
    code,
    state,
  });
  return response.data;
};
