import { fetchEventSource } from '@microsoft/fetch-event-source';
import { authApi } from '../../../api/api';
import type { LogStreamParams, AdminReviewsResponse } from '../model/types';

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchAdminReviews = async (
  params: LogStreamParams,
): Promise<AdminReviewsResponse> => {
  const response = await authApi.get('/api/admin/reviews', {
    params: {
      studentId: params.studentId,
      role: params.role,
    },
  });
  return response.data;
};

export const deleteAdminReview = async (
  placeId: number,
  reviewId: number,
  params: LogStreamParams,
) => {
  const response = await authApi.delete(
    `/api/places/${placeId}/reviews/${reviewId}`,
    {
      params: {
        studentId: params.studentId,
        role: params.role,
      },
    },
  );
  return response.data;
};

interface LogStreamCallbacks {
  onTrigger: () => void;
  onOpen?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export const connectLogStream = (
  params: LogStreamParams,
  callbacks: LogStreamCallbacks,
  abortController: AbortController,
): void => {
  const token = localStorage.getItem('accessToken');
  const queryParams = new URLSearchParams({
    studentId: params.studentId,
    role: params.role,
  });

  fetchEventSource(`${BASE_URL}api/admin/reviews/stream?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: abortController.signal,
    onopen: async (response) => {
      if (response.ok) {
        callbacks.onOpen?.();
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    },
    onmessage: (event) => {
      if (!event.data) return;

      callbacks.onTrigger();
    },
    onerror: (error) => {
      callbacks.onError?.(
        error instanceof Error ? error : new Error('SSE 연결 오류'),
      );
      throw error;
    },
    onclose: () => {
      callbacks.onClose?.();
    },
  });
};
