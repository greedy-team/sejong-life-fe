import { useState, useCallback, useRef, useEffect } from 'react';
import { connectLogStream } from '../api/logApi';
import type {
  LogEvent,
  LogStreamParams,
  UseLogStreamReturn,
} from '../model/types';

export const useLogStream = (): UseLogStreamReturn => {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const connect = useCallback((params: LogStreamParams) => {
    if (abortControllerRef.current) return;

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    connectLogStream(
      params,
      {
        onOpen: () => {
          setIsConnected(true);
          setError(null);
        },
        onMessage: (logEvent) => {
          setEvents((prev) => [...prev, logEvent]);
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
  }, []);

  const disconnect = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    events,
    isConnected,
    error,
    connect,
    disconnect,
    clearEvents,
  };
};
