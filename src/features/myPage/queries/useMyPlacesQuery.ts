import { useQuery } from '@tanstack/react-query';
import { getMyPlaces } from '../apis/getMyPlaces';
import { useAuth } from '../../../hooks/useAuth';

export const myPlacesQueryKey = ['myPlaces'] as const;

export function useMyPlacesQuery() {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: myPlacesQueryKey,
    queryFn: getMyPlaces,
    enabled: isLoggedIn,
    staleTime: 1000 * 30,
  });
}
