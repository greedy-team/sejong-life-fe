import { useEffect, useState } from 'react';
import type { DetailPlaceProps } from '../../../types/type';
import { fetchPlaceDetail } from '../../../api/placeApi';
import { useParams } from 'react-router-dom';

const CreateReview = () => {
  const [placeInfo, setPlaceInfo] = useState<DetailPlaceProps>();
  const { placeId } = useParams();

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      const res = await fetchPlaceDetail(Number(placeId));
      setPlaceInfo(res.data);
    };

    fetchPlaceInfo();
  }, []);

  return <div></div>;
};

export default CreateReview;
