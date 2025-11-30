import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

interface LoginWidgetProps {
  onClose: () => void;
}

const LoginWidget = ({ onClose }: LoginWidgetProps) => {
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <>
      {isNewUser ? (
        <>
          <h2 className="mb-4 text-2xl font-bold text-[#8BE34A]">로그인</h2>
          <LoginForm setIsNewUser={setIsNewUser} onClose={onClose} />
        </>
      ) : (
        <>
          <h2 className="mb-4 text-2xl font-bold text-[#8BE34A]">회원가입</h2>
          <SignUpForm onClose={onClose} />
        </>
      )}
    </>
  );
};

export default LoginWidget;
