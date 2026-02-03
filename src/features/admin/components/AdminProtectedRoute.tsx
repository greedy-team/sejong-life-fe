import { useEffect, useState } from 'react';
import { checkAdmin } from '../api/checkAdmin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const ok = await checkAdmin();

      if (!mounted) return;

      if (!ok) {
        toast.error('관리자페이지 접근 권한이 없습니다.');
        navigate('/', { replace: true });
        setAllowed(false);
        return;
      }

      setAllowed(true);
    })();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (allowed === null) {
    return (
      <div className="mt-30 flex justify-center text-gray-500">
        관리자 권한 확인 중...
      </div>
    );
  }

  return allowed ? <>{children}</> : null;
};

export default AdminProtectedRoute;
