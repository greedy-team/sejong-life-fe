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
      <a className="flex w-full cursor-pointer items-center justify-center rounded-2xl border border-[#FFE5D1] bg-[#FFF4ED] px-6 py-3 font-semibold text-[#FF6F0F] transition-colors hover:bg-[#FFE5D1]">
        ✍️리뷰쓰기
      </a>
    </div>
  );
};

export default ReviewWriteButton;
