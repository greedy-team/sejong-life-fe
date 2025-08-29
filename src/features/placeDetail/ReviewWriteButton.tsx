interface ReviewWiteButtonProps {
  placeName: string;
}

const ReviewWriteButton = ({ placeName }: ReviewWiteButtonProps) => {
  return (
    <div className="flex w-[90%] flex-col items-start gap-3 text-lg">
      <div className="flex text-xl font-bold text-[#212529]">📝 리뷰</div>
      <div>
        <div className="flex">
          <span className="flex font-bold">{placeName}</span>에 다녀오셨나요?
        </div>
        <div className="flex">리뷰로 경험을 남겨보세요 !</div>
      </div>
      <a className="flex w-full cursor-pointer items-center justify-center rounded-2xl border border-[#8BE34A] bg-[#77db30] px-6 py-3 font-semibold text-white hover:bg-[#8BE34A]">
        ✍️리뷰쓰기
      </a>
    </div>
  );
};

export default ReviewWriteButton;
