import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/query/queryKeys';
import type { Tag } from '../../../types/type';
import { fetchTagList } from '../apis/tagApi';

export const useTagLists = () => {
  return useQuery<Tag>({
    queryKey: queryKeys.tags.all,
    queryFn: () => fetchTagList(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
