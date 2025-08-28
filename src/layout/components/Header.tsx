import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../features/login/components/LoginForm';
import LoginModal from '../../features/login/components/LoginModal';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="flex h-14 w-full border-b-1 px-20 py-2">
      <Link to="/" className="w-fit">
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
      <button
        onClick={() => setIsLoginOpen(true)}
        className="cursor-pointer rounded-md bg-[#8BE34A] px-3 py-1.5 text-sm font-semibold text-white transition-colors duration-100 hover:bg-[#77db30]"
      >
        로그인
      </button>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <h2 className="mb-4 text-2xl font-bold text-[#8BE34A]">로그인</h2>
        <LoginForm />
      </LoginModal>
    </header>
  );
};

export default Header;
