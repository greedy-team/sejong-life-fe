import ProfileCard from '../components/myPage/ProfileCard';
import MyReviews from '../components/myPage/MyReviews';
import LikePlaces from '../components/myPage/LikePlaces';

function MyPage() {
  return (
    <div className="mx-auto mt-10 flex w-[85%] flex-col gap-5 lg:w-[60%] lg:gap-8">
      <ProfileCard />

      <div className="flex grid grid-cols-2 gap-5 lg:gap-8">
        <MyReviews />
        <LikePlaces />
      </div>
    </div>
  );
}

export default MyPage;
