import MyReviewList from '../components/myPage/MyReviewList';
import HeaderWithBack from '../components/share/HeaderWithBack';

function MyReviewPage() {
  return (
    <>
      <HeaderWithBack title="내가 쓴 리뷰" fallbackPath={`/mypage`} />
      <MyReviewList />
    </>
  );
}

export default MyReviewPage;
