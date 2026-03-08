import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { queryKeys } from '../../../lib/query/queryKeys';
import { putPlace } from '../api/putPlace';
import type { EditPlaceRequest } from '../../../types/type';

export const useEditPlace = (placeId: number, onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: EditPlaceRequest) => putPlace(placeId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.places.detail(String(placeId)),
      });
      toast.success('장소가 수정되었습니다.');
      onSuccess();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(
        error?.response?.data?.message ?? '장소 수정에 실패했습니다.',
      );
    },
  });
};
