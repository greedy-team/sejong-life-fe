import PlaceItemCard from '../components/place-item-card/PlaceItemCard';
import { useFavorites } from '../features/myPage/hooks/useFavorites';
import { useMyPlacesQuery } from '../features/myPage/queries/useMyPlacesQuery';

function MyPlacesPage() {
  const { data: myPlaces = [], isLoading } = useMyPlacesQuery();
  const { isFavorite, handleToggleFavorite } = useFavorites();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="mx-auto mt-10 mb-20 grid w-[90%] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {myPlaces.map((place) => (
        <PlaceItemCard
          key={place.placeId}
          placeInfo={place}
          className="w-full"
          isFavorite={isFavorite(place.placeId)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MyPlacesPage;
