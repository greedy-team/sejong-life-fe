import ProfileCard from '../components/myPage/ProfileCard';
import MyReviews from '../components/myPage/MyReviews';
import LikePlaces from '../components/myPage/LikePlaces';

function MyPage() {
  return (
    <div className="mx-auto mt-10 flex w-[85%] flex-col gap-8 lg:w-[60%] lg:gap-8">
      <ProfileCard />

      <div className="flex grid grid-cols-2 gap-5 lg:gap-8">
        <MyReviews />
        <LikePlaces />
      </div>

      <div className="mt-15 flex flex-col gap-3 text-xs">
        <button className="lg:text-xl">로그아웃하기</button>
        <button className="text-gray-400 lg:text-xl">탈퇴하기</button>
      </div>
    </div>
  );
}

export default MyPage;
