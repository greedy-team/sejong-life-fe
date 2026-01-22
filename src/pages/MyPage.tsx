import ProfileCard from '../components/myPage/ProfileCard';
import MyReviews from '../components/myPage/MyReviews';

function MyPage() {
  return (
    <div className="mx-auto mt-10 flex w-[85%] flex-col gap-5 lg:w-[60%] lg:gap-8">
      <ProfileCard />

      <div className="flex grid grid-cols-2 gap-5 lg:gap-8">
        <MyReviews></MyReviews>
        <div className="h-40 rounded-3xl bg-white drop-shadow-[0_10px_15px_rgba(139,227,74,0.4)]"></div>
      </div>
    </div>
  );
}

export default MyPage;
