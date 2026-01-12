import { useQuery } from '@tanstack/react-query';
import { fetchPlaceDetail, fetchTagList, fetchHotPlaces } from '../api';
import { queryKeys } from '../lib/query/queryKeys';
import type { DetailPlace, Tag } from '../types/type';
import type { HotPlaceApiResponse } from '../components/place-item-card/model/type';

export const usePlaceDetail = (placeId: number) => {
  return useQuery<DetailPlace>({
    queryKey: queryKeys.places.detail(String(placeId)),
    queryFn: () => fetchPlaceDetail(placeId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTagLists = () => {
  return useQuery<Tag>({
    queryKey: queryKeys.tags.all,
    queryFn: () => fetchTagList(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useHotPlaces = () => {
  return useQuery<HotPlaceApiResponse>({
    queryKey: queryKeys.places.hot(),
    queryFn: () => fetchHotPlaces(),
    staleTime: 5 * 60 * 1000,
  });
};
