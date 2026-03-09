import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/userContext';
import { useAdminReviewStream } from '../hooks/useAdminReviewStream';
import { USER_ROLE } from '../../../types/role';
import AdminReviewCard from './AdminReviewCard';
import HeaderWithBack from '../../../components/share/HeaderWithBack';

function ConnectionStatus({ isConnected }: { isConnected: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}
        aria-hidden="true"
      />
      <span className="text-sm text-gray-600">
        {isConnected ? '실시간 연결됨' : '연결 안됨'}
      </span>
    </div>
  );
}

function AdminReviewContainer() {
  const auth = useContext(AuthContext);
  const { reviews, isConnected, isLoading, error, connect, removeReview } =
    useAdminReviewStream();

  useEffect(() => {
    if (auth?.studentId) {
      connect({
        studentId: String(auth.studentId),
        role: USER_ROLE.ADMIN,
      });
    }
  }, [auth?.studentId, connect]);

  const handleDelete = async (placeId: number, reviewId: number) => {
    if (!confirm('정말 이 리뷰를 삭제하시겠습니까?')) return;

    try {
      await removeReview(placeId, reviewId);
    } catch {
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      <HeaderWithBack title={'리뷰 관리'} fallbackPath={`/admin`} />
      <section className="mx-auto max-w-4xl p-4">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">리뷰 관리</h1>
          <ConnectionStatus isConnected={isConnected} />
        </header>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded bg-red-100 p-3 text-red-700"
          >
            {error.message}
          </div>
        )}

        <section className="space-y-4" aria-label="리뷰 목록">
          {reviews.length === 0 ? (
            <p className="rounded border border-gray-200 p-8 text-center text-gray-500">
              {isLoading ? '로딩 중...' : '리뷰가 없습니다'}
            </p>
          ) : (
            reviews.map((review) => (
              <AdminReviewCard
                key={review.reviewId}
                review={review}
                onDelete={handleDelete}
              />
            ))
          )}
        </section>

        <p className="mt-4 text-sm text-gray-600">
          총 {reviews.length}개의 리뷰
        </p>
      </section>
    </>
  );
}

export default AdminReviewContainer;
