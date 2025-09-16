import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('로그인이 필요한 서비스입니다.');
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;
