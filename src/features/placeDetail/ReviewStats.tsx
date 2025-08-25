import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export type ReviewStats = {
  reviewCount: number;
  averageRate: number;
  ratingDistribution: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
};

const ReviewStats = () => {
  const { id } = useParams<{ id: string }>();
  const [stats, setStats] = useState<ReviewStats | null>(null);

  useEffect(() => {
    const fetchPlaceReviewStats = async () => {
      try {
        const res = await axios.get(
          `/sejonglife/api/places/${id}/reviews/summary`,
        );
        setStats(res.data.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    };
    fetchPlaceReviewStats();
  }, [id]);

  if (!stats) {
    return <div> 리뷰 통계 로딩 중...</div>;
  }

  const sortedRatings = Object.keys(stats.ratingDistribution).sort((a, b) =>
    b.localeCompare(a),
  );
  const maxReviews = stats.reviewCount > 0 ? stats.reviewCount : 1;

  return (
    <div className="flex w-[90%] flex-col items-start border-t border-gray-200 pt-5">
      <div className="flex gap-2">
        <div className="flex gap-1.5">
          <div className="text-xl">⭐️</div>
          <div className="text-xl font-semibold">
            {stats.averageRate.toFixed(1)}점
          </div>
        </div>
        <div className="text-gray-700">총 {stats.reviewCount}개의 리뷰</div>
      </div>

      <div className="mt-4 flex w-full flex-col gap-1.5">
        {sortedRatings.map((rating) => {
          const count =
            stats.ratingDistribution[
              rating as keyof typeof stats.ratingDistribution
            ];
          const percentage = (count / maxReviews) * 100;
          return (
            <div key={rating} className="flex items-center gap-2">
              <span className="w-5 text-sm font-semibold">{rating}★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="w-4 text-right text-sm text-gray-500">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewStats;
