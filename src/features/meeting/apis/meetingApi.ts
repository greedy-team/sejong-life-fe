import { authApi } from '../../../api/api';
import type {
  Profile,
  ProfileRegisterPayload,
  CardOpenResponse,
} from '../../../types/meetingType';

export const fetchMeetingProfiles = async (): Promise<Profile[]> => {
  const response = await authApi.get('/meeting/profiles');
  return response.data;
};

export const registerMeetingProfile = async (
  payload: ProfileRegisterPayload,
): Promise<{
  message: string;
  data: {
    accessToken: string;
    signUpToken: string;
    userInfo: { studentId: string; name: string };
    newUser: boolean;
  };
}> => {
  const signUpToken = sessionStorage.getItem('signUpToken');

  const response = await authApi.post('/meeting/auth/signup', payload, {
    headers: {
      Authorization: `Bearer ${signUpToken}`,
    },
  });
  return response.data;
};

export const openMeetingCard = async (
  profileId: number,
): Promise<CardOpenResponse> => {
  const response = await authApi.post(`/meeting/profiles/${profileId}/open`);
  return response.data;
};
