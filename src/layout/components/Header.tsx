import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full h-14 border-b-1 px-20 py-2 flex">
      <Link to="/">
        <img
          src="/asset/header/Logo.svg"
          alt="로고 이미지"
          className="h-full"
        />
      </Link>
      <ul className="flex flex-1 items-center px-20 gap-20">
        <li>
          <Link to="/" className="font-bold">
            홈
          </Link>
        </li>
        <li>
          <Link to="/discover" className="font-bold">
            탐색
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
