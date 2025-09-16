import { useState } from 'react';
import LoginModal from '../login/components/LoginModal';
import { useNavigate } from 'react-router-dom';
import LoginWidget from '../login/components/LoginWidget';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

interface ReviewWiteButtonProps {
  placeName: string;
  placeId: string;
}

const ReviewWriteButton = ({ placeName, placeId }: ReviewWiteButtonProps) => {
  const { isLoggedIn } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickedReviewWriteButton = () => {
    if (!isLoggedIn) {
      toast.error('리뷰를 남기려면 로그인해주세요');
      setIsLoginOpen(true);
    } else {
      navigate(`/write-review/${placeId}`);
    }
  };

  return (
    <>
      <div className="flex w-[90%] flex-col items-start gap-3 text-lg">
        <div className="flex text-xl font-bold text-[#212529]">
          <div className="flex items-center gap-2">
            <img src="/asset/place-detail-page/filePencil.svg" alt="review" />
            <span>리뷰쓰기</span>
          </div>
        </div>
        <div>
          <div className="flex">
            <span className="flex font-bold">{placeName}</span>에 다녀오셨나요?
          </div>
          <div className="flex">리뷰로 경험을 남겨보세요 !</div>
        </div>
        <a
          onClick={handleClickedReviewWriteButton}
          className="flex w-full cursor-pointer items-center justify-center rounded-2xl border border-[#8BE34A] bg-[#77db30] px-6 py-3 font-semibold text-white hover:bg-[#8BE34A]"
        >
          <div className="flex items-center gap-2">
            <img src="/asset/place-detail-page/pencil.svg" alt="map" />
            <span>리뷰쓰기</span>
          </div>
        </a>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginWidget onClose={() => setIsLoginOpen(false)} />
      </LoginModal>
    </>
  );
};

export default ReviewWriteButton;
