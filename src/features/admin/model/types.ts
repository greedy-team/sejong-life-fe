export interface LogStreamParams {
  studentId: string;
  role: string;
}

export interface LogEvent {
  timeout: number;
}

export interface ReviewTag {
  tagId: number;
  tagName: string;
}

export interface AdminReview {
  reviewId: number;
  rating: number;
  userId: number;
  userName: string;
  studentId: string;
  content: string;
  likeCount: number;
  createdAt: string;
  placeId: number;
  placeName: string;
  imagesCount: number;
  tags: ReviewTag[];
}

export interface AdminReviewsResponse {
  message: string;
  data: AdminReview[];
}

export interface UseAdminReviewStreamReturn {
  reviews: AdminReview[];
  isConnected: boolean;
  isLoading: boolean;
  error: Error | null;
  connect: (params: LogStreamParams) => void;
  disconnect: () => void;
  refresh: () => void;
}
