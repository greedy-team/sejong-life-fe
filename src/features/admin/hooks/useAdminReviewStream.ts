import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  connectLogStream,
  fetchAdminReviews,
  deleteAdminReview,
} from '../api/logApi';
import type {
  AdminReview,
  LogStreamParams,
  UseAdminReviewStreamReturn,
} from '../model/types';

export const useAdminReviewStream = (): UseAdminReviewStreamReturn => {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const paramsRef = useRef<LogStreamParams | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!paramsRef.current) return;

    setIsLoading(true);
    try {
      const response = await fetchAdminReviews(paramsRef.current);
      setReviews(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('리뷰 조회 실패'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const connect = useCallback(
    (params: LogStreamParams) => {
      if (abortControllerRef.current) return;

      paramsRef.current = params;
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      fetchReviews();

      connectLogStream(
        params,
        {
          onOpen: () => {
            setIsConnected(true);
            setError(null);
          },
          onTrigger: () => {
            fetchReviews();
          },
          onError: (err) => {
            setError(err);
            setIsConnected(false);
            abortControllerRef.current = null;
          },
          onClose: () => {
            setIsConnected(false);
            abortControllerRef.current = null;
          },
        },
        abortController,
      );
    },
    [fetchReviews],
  );

  const disconnect = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchReviews();
  }, [fetchReviews]);

  const removeReview = useCallback(
    async (placeId: number, reviewId: number) => {
      if (!paramsRef.current) return;

      try {
        await deleteAdminReview(placeId, reviewId, paramsRef.current);
        setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
        toast.success('리뷰가 삭제되었습니다.');
      } catch {
        toast.error('리뷰 삭제에 실패했습니다.');
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    reviews,
    isConnected,
    isLoading,
    error,
    connect,
    disconnect,
    refresh,
    removeReview,
  };
};
