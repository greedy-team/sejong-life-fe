import { useQuery } from '@tanstack/react-query';
import { getMyReview } from '../apis/myReviewApi';
import { useAuth } from '../../../hooks/useAuth';

export const myReviewsQueryKey = ['myReviews'] as const;

export function useMyReviewsQuery() {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: myReviewsQueryKey,
    queryFn: getMyReview,
    enabled: isLoggedIn,
    staleTime: 1000 * 30,
  });
}
