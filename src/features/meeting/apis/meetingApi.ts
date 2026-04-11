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
): Promise<{ id: number; message: string }> => {
  const response = await authApi.post('/meeting/profiles', payload);
  return response.data;
};

export const openMeetingCard = async (
  profileId: number,
): Promise<CardOpenResponse> => {
  const response = await authApi.post(`/meeting/profiles/${profileId}/open`);
  return response.data;
};
