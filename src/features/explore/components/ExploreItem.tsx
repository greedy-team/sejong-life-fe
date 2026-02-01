import { useEffect, useState } from 'react';
import PlaceItemCard from '../../../components/place-item-card/PlaceItemCard';
import TagButton from '../../../components/share/TagButton';
import Spinner from '../../../components/share/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFilteredPlaces } from '../hooks/queries';
import { getFavoritePlaces } from '../apis/getFavoritePlaces';
import { toast } from 'react-toastify';
import { addFavoritePlace } from '../apis/addFavoritePlace';
import { deleteFavoritePlace } from '../apis/deleteFavoritePlace';

const ExploreItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFromQuery = params.get('category') || '';
  const tagsFromQuery = params.getAll('tags') || [];
  const [isPartnershipButtonOn, setIsPartnershipButtonOn] = useState(false);
  const { data: filteredPlaces = [], isLoading } = useFilteredPlaces(
    categoryFromQuery,
    tagsFromQuery,
    isPartnershipButtonOn,
  );
  const [favoriteSet, setFavoriteSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favorites = await getFavoritePlaces();

        const set = new Set<number>(
          favorites.map((fav: { placeId: number }) => fav.placeId),
        );

        setFavoriteSet(set);
      } catch (e) {
        console.error('즐겨찾기 불러오기 실패', e);
      }
    };

    getFavorites();
  }, []);

  const handleTag = (tagName: string) => {
    const newParams = new URLSearchParams(location.search);
    const currentTags = new Set(newParams.getAll('tags'));

    if (currentTags.has(tagName)) {
      currentTags.delete(tagName);
    } else {
      currentTags.add(tagName);
    }

    newParams.delete('tags');
    currentTags.forEach((tag) => newParams.append('tags', tag));

    navigate({ search: newParams.toString() }, { replace: true });
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleToggleFavorite = async (placeId: number) => {
    const isFav = favoriteSet.has(placeId);

    //낙관적 업데이트
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

      //실패하면 롤백
      setFavoriteSet((prev) => {
        const next = new Set(prev);
        if (isFav) next.add(placeId);
        else next.delete(placeId);
        return next;
      });

      toast.error('즐겨찾기 처리에 실패했습니다.');
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 py-15">
      <div className="flex items-center gap-0.5">
        <button
          data-selected={isPartnershipButtonOn}
          className="flex shrink-0 cursor-pointer transition-colors duration-100 hover:scale-105"
          onClick={() => setIsPartnershipButtonOn(!isPartnershipButtonOn)}
        >
          {isPartnershipButtonOn && (
            <img
              src="/asset/explore-page/check.svg"
              alt="check"
              className="h-9 w-9 shrink-0"
            />
          )}
          {!isPartnershipButtonOn && (
            <img
              src="/asset/explore-page/noneCheck.svg"
              alt="noneCheck"
              className="h-9 w-9 shrink-0"
            />
          )}
        </button>
        <span
          data-selected={isPartnershipButtonOn}
          className="lg-text-xl font-semibold whitespace-nowrap text-[#354052]"
        >
          제휴
        </span>
        <ul className="flex flex-nowrap gap-2 overflow-x-auto px-2 whitespace-nowrap">
          {tagsFromQuery.map((tag) => (
            <TagButton
              key={tag}
              size="middle"
              className="flex cursor-pointer items-center justify-center gap-3 px-1"
              onClick={() => handleTag(tag)}
            >
              {tag}
              <span>X</span>
            </TagButton>
          ))}
        </ul>
      </div>
      <div className="mb-10 flex w-full border border-gray-100" />
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPlaces.map((place) => (
          <PlaceItemCard
            key={place.placeId}
            placeInfo={place}
            className="w-full"
            isFavorite={favoriteSet.has(place.placeId)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreItem;
