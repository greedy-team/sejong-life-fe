import ProfileCard from '../components/myPage/ProfileCard';
import MyReviews from '../components/myPage/MyReviews';
import LikePlaces from '../components/myPage/LikePlaces';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { UserProfileResponseProps } from '../types/type';
import { getMyProfile } from '../features/myPage/apis/getMyProfile';

function MyPage() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [myProfile, setMyProfile] = useState<UserProfileResponseProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getMyProfile();
        setMyProfile(res);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>유저 정보를 불러오지 못했어요</div>;
  if (!myProfile) return null;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  return (
    <div className="mx-auto mt-10 flex w-[85%] flex-col gap-8 lg:w-[60%] lg:gap-8">
      <ProfileCard myProfile={myProfile} />

      <div className="grid grid-cols-2 gap-5 lg:gap-8">
        <MyReviews reviewCount={myProfile.reviewCount} />
        <LikePlaces favoriteCount={myProfile.favoriteCount} />
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
  );
}

export default MyPage;
