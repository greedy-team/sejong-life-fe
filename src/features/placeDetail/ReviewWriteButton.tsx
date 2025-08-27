interface ReviewWiteButtonProps {
  placeName: string;
}

const ReviewWriteButton = ({ placeName }: ReviewWiteButtonProps) => {
  return (
    <div className="flex w-[90%] flex-col items-start gap-3 text-lg">
      <div className="flex text-lg font-bold">📝 리뷰</div>
      <div>
        <div className="flex">
          <span className="flex font-bold">{placeName}</span>에 다녀오셨나요?
        </div>
        <div className="flex">리뷰로 경험을 남겨보세요 !</div>
      </div>
      <button className="w-full cursor-pointer rounded bg-[#EFF6FF] p-2 font-semibold text-[#4A72EC] hover:brightness-90">
        ✍️리뷰쓰기
      </button>
    </div>
  );
};

export default ReviewWriteButton;
