import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getPlaceDetails } from '../features/placeDetail/apis/placeDetailApi';
import type { DetailPlaceProps } from '../types/type';

export const usePlaceDetail = (id: string) => {
  const [place, setPlace] = useState<DetailPlaceProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      try {
        const placeData = await getPlaceDetails(id);
        setPlace(placeData);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message);
          navigate(-1);
        } else {
          console.error(err);
        }
      }
    };
    fetchPlaceDetail();
  }, [id, navigate]);

  return { place };
};
