import styled from 'styled-components';
import PhotoStrip from './PhotoStrip';
import PlaceInfo from './PlaceInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Base = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8rem auto;
  width: 62.5rem;
  height: 50rem;
  background: var(--background-color);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
`;

type PlaceDetail = {
  placeId: number;
  placeName: string;
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

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      try {
        const res = await axios.get('/sejonglife/api/places/1');
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
  }, []);

  if (!place) return <div>로딩중...</div>;

  return (
    <>
      <Base>
        <PhotoStrip images={place.images}></PhotoStrip>
        <PlaceInfo></PlaceInfo>
      </Base>
    </>
  );
};

export default PlaceDetailContainer;
