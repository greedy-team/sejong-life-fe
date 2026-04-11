import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { openMeetingCard } from '../apis/meetingApi';
import type { CardOpenResponse } from '../../../types/meetingType';

export const useOpenCard = (onSuccess: (data: CardOpenResponse) => void) => {
  return useMutation({
    mutationFn: (profileId: number) => openMeetingCard(profileId),
    onSuccess,
    onError: (error: unknown) => {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      if (status === 403) {
        toast.error('카드 오픈 횟수를 모두 사용했습니다.');
      } else if (status === 409) {
        toast.error('이미 오픈한 카드입니다.');
      } else if (status === 410) {
        toast.error('더 이상 오픈할 수 없는 카드입니다.');
      } else {
        toast.error('카드 오픈에 실패했습니다.');
      }
    },
  });
};
