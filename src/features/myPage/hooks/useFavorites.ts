import { useCallback, useEffect, useState } from 'react';
import { getMyPlaces } from '../apis/getMyPlaces';
import { toast } from 'react-toastify';
import { deleteFavoritePlace } from '../../explore/apis/deleteFavoritePlace';
import { addFavoritePlace } from '../../explore/apis/addFavoritePlace';
import { useAuth } from '../../../hooks/useAuth';

export function useFavorites() {
  const [favoriteSet, setFavoriteSet] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  const refresh = useCallback(async () => {
    const favorites = await getMyPlaces();
    const set = new Set<number>(favorites.map((place) => place.placeId));
    setFavoriteSet(set);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoading(false);
      return;
    }
    (async () => {
      try {
        await refresh();
      } catch (e) {
        console.error('저장된 장소 로딩 실패', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [refresh, isLoggedIn]);

  const handleToggleFavorite = useCallback(
    async (placeId: number) => {
      const isFav = favoriteSet.has(placeId);

      // 낙관적 업데이트
      setFavoriteSet((prev) => {
        const next = new Set(prev);
        if (isFav) next.delete(placeId);
        else next.add(placeId);
        return next;
      });

      try {
        if (isFav) {
          await deleteFavoritePlace(placeId);
          toast.success('장소를 저장했어요.');
        } else {
          await addFavoritePlace(placeId);
          toast.success('장소를 저장했어요.');
        }
      } catch (e) {
        console.error('장소 저장 실패', e);

        // 실패하면 되돌리기
        setFavoriteSet((prev) => {
          const next = new Set(prev);
          if (isFav) next.add(placeId);
          else next.delete(placeId);
          return next;
        });

        toast.error('장소 저장을 실패했어요.');
      }
    },
    [favoriteSet],
  );

  const isFavorite = useCallback(
    (placeId: number) => favoriteSet.has(placeId),
    [favoriteSet],
  );

  return { favoriteSet, isFavorite, handleToggleFavorite, refresh, isLoading };
}
