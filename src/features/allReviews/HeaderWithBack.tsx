import { useNavigate } from 'react-router-dom';

const HeaderWithBack = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="flex h-14 w-full border-b border-b-[#EEEFF1] px-15 py-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-5"
        >
          <img src="/asset/all-review/backArrow.svg" alt="뒤로가기"></img>
          리뷰
        </button>
      </header>
    </>
  );
};

export default HeaderWithBack;
