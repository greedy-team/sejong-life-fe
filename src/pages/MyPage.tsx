import ProfileCard from '../components/myPage/ProfileCard';
import MyReviews from '../components/myPage/MyReviews';
import LikePlaces from '../components/myPage/LikePlaces';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import deleteUser from '../features/myPage/apis/deleteUser';
import { toast } from 'react-toastify';
import axios from 'axios';

function MyPage() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  const handleMembershipCancellation = async () => {
    const ok = confirm('정말 탈퇴하시겠습니까?');
    if (!ok) return false;

    try {
      await deleteUser();

      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);

      toast.success('탈퇴 되었습니다.');
      navigate(`/`, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message);
      } else {
        console.error(err);
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="mx-auto mt-10 flex w-[85%] flex-col gap-8 lg:w-[60%] lg:gap-8">
      <ProfileCard />

      <div className="grid grid-cols-2 gap-5 lg:gap-8">
        <MyReviews />
        <LikePlaces />
      </div>

      <div className="mt-15 flex flex-col gap-3 text-xs">
        <button
          onClick={() => handleLogout()}
          className="cursor-pointer lg:text-xl"
        >
          로그아웃하기
        </button>
        <button
          onClick={() => handleMembershipCancellation()}
          className="cursor-pointer text-gray-400 lg:text-xl"
        >
          탈퇴하기
        </button>
      </div>
    </div>
  );
}

export default MyPage;
