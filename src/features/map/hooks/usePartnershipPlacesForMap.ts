import { useQuery } from '@tanstack/react-query';
import { fetchFilteredPlaces } from '../../explore/apis/placeApi';

export const usePartnershipPlacesForMap = () => {
  return useQuery({
    queryKey: ['places', 'map', 'partnership'],
    queryFn: () => fetchFilteredPlaces('전체', [], true, 0, 1000),
    select: (data) => {
      return data.data?.places ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
