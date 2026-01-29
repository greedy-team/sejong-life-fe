const ProfileCard = () => {
  return (
    <div className="mx-auto flex w-full gap-7 rounded-3xl bg-gradient-to-r from-[#8BE34A]/70 via-[#8BE34A]/40 to-[#8BE34A]/10 p-5 shadow-lg lg:gap-15 lg:p-10">
      <div className="flex w-[30%] shrink-0 items-center justify-center lg:w-[40%]">
        <img src="/asset/mypage/user.svg" className="w-50 lg:h-50" />
      </div>
      <div className="my-auto flex flex-col justify-center gap-3 lg:gap-7">
        <div className="mt-5 flex items-end gap-2 lg:gap-5">
          <div className="text-2xl font-extrabold whitespace-nowrap text-[#222222] lg:text-7xl">
            신지우
          </div>
          <div className="max-w-[55%] truncate font-bold text-gray-700 lg:max-w-[70%] lg:text-4xl">
            (단지우)
          </div>
        </div>
        <div className="flex flex-col lg:gap-2">
          <div className="flex gap-3">
            <div className="lg:text-2xl">학번:</div>
            <div className="lg:text-2xl">22</div>
          </div>
          <div className="flex gap-3">
            <div className="lg:text-2xl">학과:</div>
            <div className="lg:text-2xl">소프트웨어학과</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
