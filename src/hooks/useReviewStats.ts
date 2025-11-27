import { useState, useEffect } from 'react';
import type { ReviewStats } from '../types/type';
import { getReviewStats } from '../features/placeDetail/apis/reviewApi';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useReviewStats = (id: string) => {
  const [stats, setStats] = useState<ReviewStats | null>(null);

  useEffect(() => {
    fetchPlaceReviewStats();
  }, [id]);

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

  return { stats, refetchStats: fetchPlaceReviewStats };
};
