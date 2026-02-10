import useMyReview from '../../hooks/useMyReviews';
import MyReviewCard from './myReviewCard';

const MyReviewList = () => {
  const { myReviews, handleDeleteMyReview } = useMyReview();

  return (
    <div className="mx-auto flex w-[75%] max-w-screen-lg flex-col items-center gap-10 overflow-y-auto">
      <ol className="flex w-full flex-col">
        {myReviews.map((review, index) => (
          <li key={review.reviewId}>
            {index != 0 && (
              <div className="flex w-full border border-gray-100" />
            )}
            <MyReviewCard myReview={review} onDelete={handleDeleteMyReview} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MyReviewList;
