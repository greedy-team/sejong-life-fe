import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { deleteFavoritePlace } from '../../explore/apis/deleteFavoritePlace';
import { addFavoritePlace } from '../../explore/apis/addFavoritePlace';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
  useMyPlacesQuery,
  myPlacesQueryKey,
} from '../queries/useMyPlacesQuery';

export function useFavorites() {
  const queryClient = useQueryClient();
  const { data: favorites = [], isLoading } = useMyPlacesQuery();

  const favoriteSet = useMemo(() => {
    return new Set<number>(favorites.map((p) => p.placeId));
  }, [favorites]);

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: myPlacesQueryKey });
  }, [queryClient]);

  const addMutation = useMutation({
    mutationFn: (placeId: number) => addFavoritePlace(placeId),
  });

  const deleteMutation = useMutation({
    mutationFn: (placeId: number) => deleteFavoritePlace(placeId),
  });

  const handleToggleFavorite = useCallback(
    async (placeId: number) => {
      const isFav = favoriteSet.has(placeId);

      try {
        if (isFav) {
          await deleteMutation.mutateAsync(placeId);
          toast.success('장소 저장을 취소했어요.');
        } else {
          await addMutation.mutateAsync(placeId);
          toast.success('장소를 저장했어요.');
        }
        await refresh();
      } catch (e) {
        console.error('장소 저장 실패', e);
        toast.error('장소 저장을 실패했어요.');
      }
    },
    [favoriteSet, addMutation, deleteMutation, refresh],
  );

  const isFavorite = useCallback(
    (placeId: number) => favoriteSet.has(placeId),
    [favoriteSet],
  );

  return { favoriteSet, isFavorite, handleToggleFavorite, refresh, isLoading };
}
