import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-17 w-full px-20 py-4">
      <Link to="/">
        <img
          src="/asset/header/newLogo.svg"
          alt="로고 이미지"
          className="h-13"
        />
      </Link>
      <div className="flex flex-1 items-center justify-end gap-20">
        <button>
          <Link to="/login" className="font-bold">
            <img
              src="asset/header/loginIcon.svg"
              alt="로그인 이미지"
              className="h-8"
            />
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
