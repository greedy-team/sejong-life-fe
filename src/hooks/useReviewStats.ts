import { useState, useEffect } from 'react';
import type { ReviewStats } from '../types/type';
import { getReviewStats } from '../features/placeDetail/apis/reviewApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { usePlaceReview } from './usePlaceReview';

export const useReviewStats = (id: string) => {
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const { reviews } = usePlaceReview(id!);

  useEffect(() => {
    const fetchPlaceReviewStats = async () => {
      try {
        const statsData = await getReviewStats(id!);
        setStats(statsData);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    };
    fetchPlaceReviewStats();
  }, [id, reviews]);

  return { stats };
};
