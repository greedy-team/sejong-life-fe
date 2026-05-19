import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/query/queryKeys';
import { fetchOpenCount } from '../apis/meetingApi';
import type { OpenCountResponse } from '../../../types/meetingType';

export const useOpenCount = () => {
  return useQuery<OpenCountResponse>({
    queryKey: queryKeys.meeting.openCount(),
    queryFn: fetchOpenCount,
    staleTime: 0,
  });
};
