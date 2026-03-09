import HeaderWithBack from '../components/share/HeaderWithBack';
import CreateReview from '../features/createReview/components/CreateReview';
import { useParams } from 'react-router-dom';
import { usePlaceDetail } from '../features/placeDetail/hooks';

const CreateReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { place } = usePlaceDetail(id!);

  return (
    <>
      <HeaderWithBack
        title={place?.name ?? '리뷰 작성'}
        fallbackPath={`/detail/${id}`}
      />
      <CreateReview />
    </>
  );
};

export default CreateReviewPage;
