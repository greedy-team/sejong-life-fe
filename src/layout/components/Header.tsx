import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex h-14 w-full border-b-1 px-20 py-2">
      <Link to="/">
        <img
          src="/asset/header/Logo.svg"
          alt="로고 이미지"
          className="h-full"
        />
      </Link>
      <div className="flex flex-1 items-center gap-20 px-20">
        <button>
          <Link to="/" className="font-bold">
            홈
          </Link>
        </button>
        <button>
          <Link to="/explore" className="font-bold">
            탐색
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
