import { useQuery } from '@tanstack/react-query';
import { fetchFilteredPlaces } from '../../explore/apis/placeApi';
import { queryKeys } from '../../../lib/query/queryKeys';

export const usePartnershipPlacesForMap = (categoryName: string = '전체') => {
  return useQuery({
    queryKey: queryKeys.places.partnershipMapByCategory(categoryName),
    queryFn: () => fetchFilteredPlaces(categoryName, [], true, 0, 1000),
    select: (data) => {
      return data.data?.places ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
