import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerMeetingProfile } from '../apis/meetingApi';
import type { ProfileRegisterPayload } from '../../../types/meetingType';

export const useRegisterProfile = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ProfileRegisterPayload) =>
      registerMeetingProfile(payload),
    onSuccess: () => {
      toast.success('프로필이 등록되었습니다!');
      navigate('/meeting');
    },
    onError: () => {
      toast.error('프로필 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
