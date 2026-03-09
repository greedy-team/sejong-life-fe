import AllReviewContainer from '../features/allReviews/AllReviewContainer';
import { useParams } from 'react-router-dom';
import { usePlaceDetail } from '../features/placeDetail/hooks';
import HeaderWithBack from '../components/share/HeaderWithBack';

function AllReviewPage() {
  const { id } = useParams<{ id: string }>();
  const { place } = usePlaceDetail(id!);
  return (
    <>
      <HeaderWithBack
        title={place?.name ?? '리뷰 상세'}
        fallbackPath={`/detail/${id}`}
      />
      <AllReviewContainer />;
    </>
  );
}

export default AllReviewPage;
