import useMyReview from '../../hooks/useMyReviews';
import MyReviewCard from './myReviewCard';

const MyReviewList = () => {
  //   const { myReviews, handleDeleteMyReview } = useMyReview();
  const myReviews = useMyReview();

  return (
    <div className="mx-auto mt-12 flex w-[75%] max-w-screen-lg flex-col items-center gap-10 overflow-y-auto">
      <div className="flex w-full flex-col">
        {myReviews.map((review) => (
          <>
            <div className="flex w-full border border-gray-100" />
            <MyReviewCard
              key={review.reviewId}
              myReview={review}
              //   placeId={id!}
              //   onDelete={handleDeleteReview}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default MyReviewList;
