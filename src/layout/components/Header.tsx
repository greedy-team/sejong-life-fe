import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../features/login/components/LoginForm';
import LoginModal from '../../features/login/components/LoginModal';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
      <button
        onClick={() => setIsLoginOpen(true)}
        className="flex cursor-pointer items-center gap-1 rounded-md bg-[#8BE34A] px-3 py-1.5 text-sm font-semibold text-white transition-colors duration-100 hover:bg-[#77db30]"
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

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <h2 className="mb-4 text-2xl font-bold text-[#8BE34A]">로그인</h2>
        <LoginForm />
      </LoginModal>
    </header>
  );
};

export default Header;
