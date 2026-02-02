import { useCallback, useEffect, useState } from 'react';
import { getMyPlaces } from '../apis/getMyPlaces';
import { toast } from 'react-toastify';
import { deleteFavoritePlace } from '../../explore/apis/deleteFavoritePlace';
import { addFavoritePlace } from '../../explore/apis/addFavoritePlace';

export function useFavorites() {
  const [favoriteSet, setFavoriteSet] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const favorites = await getMyPlaces();
    const set = new Set<number>(favorites.map((place) => place.placeId));
    setFavoriteSet(set);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await refresh();
      } catch (e) {
        console.error('즐겨찾기 로딩 실패', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [refresh]);

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
          toast.success('즐겨찾기에서 제거했어요.');
        } else {
          await addFavoritePlace(placeId);
          toast.success('즐겨찾기에 추가했어요.');
        }
      } catch (e) {
        console.error('즐겨찾기 토글 실패', e);

        // 실패하면 되돌리기
        setFavoriteSet((prev) => {
          const next = new Set(prev);
          if (isFav) next.add(placeId);
          else next.delete(placeId);
          return next;
        });

        toast.error('즐겨찾기 처리에 실패했습니다.');
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
