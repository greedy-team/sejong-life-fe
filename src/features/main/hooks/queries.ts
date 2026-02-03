import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/query/queryKeys';
import type { HotPlaceApiResponse } from '../../../components/place-item-card/model/type';
import { fetchHotPlaces } from '../apis/hotPlaceApi';

export const useHotPlaces = () => {
  return useQuery<HotPlaceApiResponse>({
    queryKey: queryKeys.places.hot(),
    queryFn: () => fetchHotPlaces(),
    staleTime: 5 * 60 * 1000,
  });
};
