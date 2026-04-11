import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/query/queryKeys';
import { fetchMeetingProfiles } from '../apis/meetingApi';
import type { Profile } from '../../../types/meetingType';

export const useMeetingProfiles = () => {
  return useQuery<Profile[]>({
    queryKey: queryKeys.meeting.profiles(),
    queryFn: fetchMeetingProfiles,
    staleTime: 5 * 60 * 1000,
  });
};
