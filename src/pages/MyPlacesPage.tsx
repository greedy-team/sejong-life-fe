import { useEffect, useState } from 'react';
import { getMyPlaces } from '../features/myPage/apis/getMyPlaces';
import type { Place } from '../types/type';

function MyPlacesPage() {
  const [myPlaces, setMyPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchMyPlaces = async () => {
      const res = await getMyPlaces();
      console.log(res);

      setMyPlaces(res);
    };

    fetchMyPlaces();
  }, []);

  return <div>하이</div>;
}

export default MyPlacesPage;
