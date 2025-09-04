import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../../features/login/components/LoginModal';
import LoginWidget from '../../features/login/components/LoginWidget';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  };

  return (
    <header className="flex h-14 w-full px-20 py-2">
      <Link to="/" className="w-fit">
        <img
          src="/asset/header/newLogo.svg"
          alt="로고 이미지"
          className="h-13"
        />
      </Link>
      <div className="flex flex-1 items-center justify-end gap-20">
        <button>
          <Link to="/login" className="font-bold"></Link>
        </button>
      </div>
      {!isLoggedIn ? (
        <button
          onClick={() => setIsLoginOpen(true)}
          className="flex cursor-pointer items-center gap-1 rounded-md bg-[#8BE34A] px-3 py-1.5 text-sm font-semibold text-[#2C3037] transition-colors duration-100 hover:bg-[#77db30]"
        >
          <img
            src="asset/header/loginIcon.svg"
            alt="로그인 이미지"
            width={21}
            height={21}
            className="h-8"
          />
          로그인
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-1 rounded-md bg-[#8BE34A] px-3 py-1.5 text-sm font-semibold text-[#2C3037] transition-colors duration-100 hover:bg-[#77db30]"
        >
          <img
            src="asset/header/loginIcon.svg"
            alt="로그인 이미지"
            width={21}
            height={21}
            className="h-8"
          />
          로그아웃
        </button>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginWidget />
      </LoginModal>
    </header>
  );
};

export default Header;
