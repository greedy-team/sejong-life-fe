import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface MeetingProtectedRouteProps {
  children: React.ReactNode;
  tokenType: 'access' | 'signup';
}

const MeetingProtectedRoute = ({
  children,
  tokenType,
}: MeetingProtectedRouteProps) => {
  const navigate = useNavigate();
  const hasAccess =
    tokenType === 'access'
      ? !!localStorage.getItem('meetingAccessToken')
      : !!sessionStorage.getItem('signUpToken');

  useEffect(() => {
    if (!hasAccess) {
      toast.error('잘못된 접근입니다. 로그인 후 이용해주세요.');
      navigate('/meeting/kakaoLogin', { replace: true });
    }
  }, [hasAccess, navigate]);

  return hasAccess ? children : null;
};

export default MeetingProtectedRoute;
