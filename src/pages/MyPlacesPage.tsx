import { useEffect, useState } from 'react';
import { getMyPlaces } from '../features/myPage/apis/getMyPlaces';
import type { PlaceProps } from '../types/type';

function MyPlacesPage() {
  const [myPlaces, setMyPlaces] = useState<PlaceProps[]>([]);

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
