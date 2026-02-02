import { fetchEventSource } from '@microsoft/fetch-event-source';
import type { LogStreamParams, LogEvent } from '../model/types';

const BASE_URL = import.meta.env.VITE_API_URL;

interface LogStreamCallbacks {
  onMessage: (event: LogEvent) => void;
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

      try {
        const logEvent: LogEvent = JSON.parse(event.data);
        callbacks.onMessage(logEvent);
      } catch {
        console.log('SSE 시스템 메시지:', event.data);
      }
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
