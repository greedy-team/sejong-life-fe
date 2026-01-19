const PlaceRegisterForm = () => {
  return (
    <div className="mx-auto w-[500px]">
      <h1 className="mt-10 flex w-full border-b py-10 text-4xl text-[#8BE24A]">
        장소등록
      </h1>
      <div className="mt-5 flex flex-col gap-10 px-7 text-lg">
        <div>카테고리</div>
        <div>
          <div>장소명</div>
          <input className="border"></input>
        </div>
        <div>
          <div>제휴내용</div>
          <input className="border"></input>
        </div>
        <div>태그</div>
      </div>
    </div>
  );
};

export default PlaceRegisterForm;
