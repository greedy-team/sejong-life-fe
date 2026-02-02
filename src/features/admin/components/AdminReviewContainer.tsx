import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/userContext';
import { useAdminReviewStream } from '../hooks/useAdminReviewStream';
import { USER_ROLE } from '../../../types/role';

function AdminReviewContainer() {
  const auth = useContext(AuthContext);
  const { reviews, isConnected, isLoading, error, connect, removeReview } =
    useAdminReviewStream();

  const handleDelete = async (placeId: number, reviewId: number) => {
    if (!confirm('정말 이 리뷰를 삭제하시겠습니까?')) return;

    try {
      await removeReview(placeId, reviewId);
    } catch (err) {
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (auth?.studentId) {
      connect({
        studentId: String(auth.studentId),
        role: USER_ROLE.ADMIN,
      });
    }
  }, [auth?.studentId, connect]);

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">리뷰 관리</h1>
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-sm text-gray-600">
            {isConnected ? '실시간 연결됨' : '연결 안됨'}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
          {error.message}
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="rounded border border-gray-200 p-8 text-center text-gray-500">
            {isLoading ? '로딩 중...' : '리뷰가 없습니다'}
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="rounded border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.userName}</span>
                  <span className="text-sm text-gray-500">
                    ({review.studentId})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <span className="text-[#77db30]">
                      {'★'.repeat(review.rating)}
                    </span>
                    <span className="text-gray-300">
                      {'★'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>

              <div className="mb-2 flex items-center gap-1 text-sm text-blue-600">
                <img
                  src="/asset/place-detail-page/map.svg"
                  alt="장소"
                  className="h-4 w-4"
                />
                {review.placeName}
              </div>

              <p className="mb-3 text-gray-700">{review.content}</p>

              {review.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {review.tags.map((tag) => (
                    <span
                      key={tag.tagId}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                    >
                      #{tag.tagName}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <img
                      src="/asset/place-detail-page/heart-red.svg"
                      alt="좋아요"
                      className="h-4 w-4"
                    />
                    {review.likeCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src="/asset/place-detail-page/imageIcon.svg"
                      alt="이미지"
                      className="h-4 w-4"
                    />
                    {review.imagesCount}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm">ID: {review.reviewId}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(review.placeId, review.reviewId)
                    }
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    삭제하기
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        총 {reviews.length}개의 리뷰
      </div>
    </div>
  );
}

export default AdminReviewContainer;
