import { useNavigate, useParams } from 'react-router-dom';

export interface ReviewStatsProps {
  reviewCount: number;
}

const MoreReviewButton = ({ reviewCount }: ReviewStatsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <a
        onClick={() => navigate(`/detail/${id}/reviews`)}
        className="mb-10 cursor-pointer rounded-xl border border-[#8BE34A] bg-[#77db30] px-6 py-3 font-semibold text-white hover:bg-[#8BE34A]"
      >
        더 많은 리뷰 보러가기 (+{reviewCount - 2})
      </a>
    </div>
  );
};

export default MoreReviewButton;
