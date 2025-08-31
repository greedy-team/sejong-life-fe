const HeaderWithBack = () => {
  return (
    <>
      <header className="flex h-14 w-full border-b border-b-[#EEEFF1] px-20 py-2">
        <button className="flex items-center gap-5">
          <img src="/asset/all-review/backArrow.svg" alt="뒤로가기"></img>
          그리디카페
        </button>
      </header>
    </>
  );
};

export default HeaderWithBack;
