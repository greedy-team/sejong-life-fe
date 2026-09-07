import { useQuery } from '@tanstack/react-query';
import { fetchFilteredPlaces } from '../../explore/apis/placeApi';
import { DEFAULT_PLACE_SORT } from '../../explore/constants/sortOptions';
import { queryKeys } from '../../../lib/query/queryKeys';

export const usePartnershipPlacesForMap = (categoryName: string = '전체') => {
  return useQuery({
    queryKey: queryKeys.places.partnershipMapByCategory(categoryName),
    queryFn: () =>
      fetchFilteredPlaces({
        category: categoryName,
        tags: [],
        isPartnershipOnly: true,
        sortType: DEFAULT_PLACE_SORT,
        coords: null,
        keyword: '',
        page: 0,
        size: 1000,
      }),
    select: (data) => {
      return data.data?.places ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
