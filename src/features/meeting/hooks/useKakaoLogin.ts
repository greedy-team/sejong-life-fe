import { useMutation } from '@tanstack/react-query';
import { kakaoLogin } from '../apis/meetingApi';
import { toast } from 'react-toastify';

export const useKakaoLogin = (onSuccess: (data: any) => void) => {
  return useMutation({
    mutationFn: ({ code, state }: { code: string; state: string }) =>
      kakaoLogin({ code, state }),
    onSuccess,
    onError: () => {
      toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
