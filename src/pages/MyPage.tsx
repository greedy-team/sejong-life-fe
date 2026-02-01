import ProfileCard from '../components/myPage/ProfileCard';
import MyReviews from '../components/myPage/MyReviews';
import LikePlaces from '../components/myPage/LikePlaces';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/share/ProtectedRoute';

function MyPage() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  return (
    <ProtectedRoute>
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
          <button className="cursor-pointer text-gray-400 lg:text-xl">
            탈퇴하기
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default MyPage;
