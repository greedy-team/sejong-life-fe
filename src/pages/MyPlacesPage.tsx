import { useEffect, useState } from 'react';
import { getMyPlaces } from '../features/myPage/apis/getMyPlaces';
import type { PlaceProps } from '../types/type';
import PlaceItemCard from '../components/place-item-card/PlaceItemCard';
import { useFavorites } from '../features/myPage/hooks/useFavorites';

function MyPlacesPage() {
  const [myPlaces, setMyPlaces] = useState<PlaceProps[]>([]);
  const { isFavorite, handleToggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchMyPlaces = async () => {
      const res = await getMyPlaces();

      setMyPlaces(res);
    };

    fetchMyPlaces();
  }, []);

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
