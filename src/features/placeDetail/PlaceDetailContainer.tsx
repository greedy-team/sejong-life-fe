import PhotoStrip from './PhotoStrip';
import PlaceInfo from './PlaceInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewStats from './ReviewStats';

export type PlaceDetail = {
  placeId: number;
  placeName: string;
  category: {
    categoryId: number;
    categoryName: string;
  };
  images: string[];
  tags: { tagId: number; tagName: string }[];
  mapLinks: {
    naverMap: string;
    kakaoMap: string;
    googleMap: string;
  };
};

const PlaceDetailContainer = () => {
  const [place, setPlace] = useState<PlaceDetail | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      try {
        const res = await axios.get(`/sejonglife/api/places/${id}`);
        setPlace(res.data.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    };
    fetchPlaceDetail();
  }, [id]);

  if (!place) return <div>로딩중...</div>;

  return (
    <main className="mx-auto my-16 flex h-[50rem] min-h-[50rem] w-[90%] max-w-[62.5rem] flex-col items-center gap-10 rounded-2xl bg-white shadow-lg">
      <PhotoStrip images={place.images} />
      <PlaceInfo place={place} />

      <ReviewStats />
    </main>
  );
};

export default PlaceDetailContainer;
