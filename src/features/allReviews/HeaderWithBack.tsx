import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { usePlaceDetail } from '../placeDetail/hooks';

const HeaderWithBack = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { place } = usePlaceDetail(id);
  const isMyReviewPage = location.pathname.startsWith('/mypage/myReviews');

  return (
    <header className="sticky z-50 flex h-14 w-full border-b border-b-[#EEEFF1] bg-white px-[5%] py-2 lg:px-15">
      <button
        onClick={() =>
          isMyReviewPage ? navigate(-1) : navigate('/explore/?category=전체')
        }
        className="flex cursor-pointer items-center gap-5"
      >
        <img src="/asset/all-review/backArrow.svg" alt="뒤로가기" />

        {isMyReviewPage && (
          <span className="font-semibold text-[#354052]">내가 쓴 리뷰</span>
        )}

        {!isMyReviewPage && id && place?.name && (
          <span className="font-semibold text-[#354052]">{place.name}</span>
        )}

        {!isMyReviewPage && !id && (
          <span className="font-semibold text-[#354052]">검색결과</span>
        )}
      </button>
    </header>
  );
};

export default HeaderWithBack;
