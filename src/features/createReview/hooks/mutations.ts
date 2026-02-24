import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postReview } from '../api/postReviewApi';
import { queryKeys } from '../../../lib/query/queryKeys';
import { myReviewsQueryKey } from '../../myPage/queries/useMyReviewsQuery';

export const useCreateReview = (placeId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => postReview(placeId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.list(String(placeId)),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.places.detail(String(placeId)),
      });

      toast.success('리뷰가 성공적으로 등록되었습니다!');
      queryClient.invalidateQueries({ queryKey: myReviewsQueryKey });
      navigate(`/detail/${placeId}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error('필수 항목을 입력해주세요.');
    },
  });
};
