import { useNavigate } from 'react-router-dom';

const MyReviews = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/mypage/myReviews`)}
      className="flex h-38 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl bg-white drop-shadow-[0_6px_12px_rgba(139,227,74,0.4)] transition-shadow duration-200 hover:shadow-[0_8px_18px_rgba(139,227,74,0.35)] lg:h-60"
    >
      <img
        src="/asset/mypage/my-review.svg"
        alt="내가쓴리뷰"
        className="h-10 w-10 lg:h-20 lg:w-20"
      />
      <div className="flex flex-col items-center lg:gap-2">
        <div className="text-xl font-semibold text-[#222222] lg:text-2xl">
          내가 쓴 리뷰
        </div>
        <div className="text-gray-700 lg:text-lg">총 n개</div>
      </div>
    </button>
  );
};

export default MyReviews;
