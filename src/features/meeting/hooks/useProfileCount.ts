import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/query/queryKeys';
import { fetchProfileCount } from '../apis/meetingApi';
import type { ProfileCountResponse } from '../../../types/meetingType';

export const useProfileCount = () => {
  return useQuery<ProfileCountResponse>({
    queryKey: queryKeys.meeting.profileCount(),
    queryFn: fetchProfileCount,
    staleTime: 5 * 60 * 1000,
  });
};
