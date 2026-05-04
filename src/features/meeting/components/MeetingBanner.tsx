const MeetingBanner = () => {
  return (
    <div className="bg-main-gradient relative mx-4 mt-5 flex items-center justify-between overflow-hidden rounded-2xl p-5">
      <div className="relative z-10">
        <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-bold text-white">
          ✨ 축제 한정
        </span>
        <p className="text-[17px] leading-snug font-extrabold text-white">
          캠퍼스 미팅부스 OPEN!
        </p>
        <p className="mt-1 text-[11px] text-white/80">
          축제 기간 동안 운영되는 특별한 만남의 공간
        </p>
        <p className="mt-1 text-[10px] text-white/60">
          🕐 2026. 05. 20 (수) ~ 05. 22 (일)
        </p>
      </div>

      <button className="relative z-10 flex-shrink-0 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#f8433a]">
        참여하기 →
      </button>
    </div>
  );
};

export default MeetingBanner;
