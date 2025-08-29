import { useState } from 'react';
import LoginModal from '../login/components/LoginModal';
import LoginForm from '../login/components/LoginForm';

interface ReviewWiteButtonProps {
  placeName: string;
}

const ReviewWriteButton = ({ placeName }: ReviewWiteButtonProps) => {
  const isLoggedIn = false;
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleClickedReviewWriteButton = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <div className="flex w-[90%] flex-col items-start gap-3 text-lg">
        <div className="flex text-xl font-bold text-[#212529]">📝 리뷰</div>
        <div>
          <div className="flex">
            <span className="flex font-bold">{placeName}</span>에 다녀오셨나요?
          </div>
          <div className="flex">리뷰로 경험을 남겨보세요 !</div>
        </div>
        <a
          onClick={() => handleClickedReviewWriteButton()}
          className="flex w-full cursor-pointer items-center justify-center rounded-2xl border border-[#8BE34A] bg-[#77db30] px-6 py-3 font-semibold text-white hover:bg-[#8BE34A]"
        >
          ✍️리뷰쓰기
        </a>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <h2 className="mb-1 text-2xl font-bold text-[#8BE34A]">로그인</h2>
        <p className="mb-4 text-xs text-gray-500">
          리뷰작성 기능을 사용하려면 로그인해주세요.
        </p>
        <LoginForm />
      </LoginModal>
    </>
  );
};

export default ReviewWriteButton;
