export interface LogStreamParams {
  studentId: string;
  role: string;
}

export interface LogEvent {
  timeout: number;
}

export interface UseLogStreamReturn {
  events: LogEvent[];
  isConnected: boolean;
  error: Error | null;
  connect: (params: LogStreamParams) => void;
  disconnect: () => void;
  clearEvents: () => void;
}
