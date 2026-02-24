import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteMyReview } from '../apis/deleteMyReview';
import {
  myReviewsQueryKey,
  useMyReviewsQuery,
} from '../queries/useMyReviewsQuery';

const useMyReview = () => {
  const queryClient = useQueryClient();
  const { data: myReviews = [] } = useMyReviewsQuery();

  const deleteMutation = useMutation({
    mutationFn: (reviewId: number) => deleteMyReview(reviewId),
    onSuccess: () => {
      toast.success('리뷰가 삭제되었습니다.');

      queryClient.invalidateQueries({ queryKey: myReviewsQueryKey });
    },
    onError: (err) => {
      console.error(err);
      toast.error('리뷰 삭제에 실패했습니다.');
    },
  });

  const handleDeleteMyReview = (reviewId: number) => {
    const ok = confirm('정말 삭제하시겠습니까?');
    if (!ok) return;
    deleteMutation.mutate(reviewId);
  };

  return {
    myReviews,
    handleDeleteMyReview,
    isDeleting: deleteMutation.isPending,
  };
};

export default useMyReview;
