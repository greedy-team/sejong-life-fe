import { useState } from 'react';
import { requestLogin } from '../api/loginApi';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';

interface LoginFormProps {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const LoginForm = ({ setIsNewUser, onClose }: LoginFormProps) => {
  const { setIsLoggedIn } = useAuth();
  const [loginForm, setLoginForm] = useState({
    sejongPortalId: '',
    sejongPortalPw: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await requestLogin(loginForm);
      if (data.data.newUser) {
        localStorage.setItem('signUpToken', data.data.signUpToken);
        localStorage.setItem('name', data.data.userInfo.name);
        localStorage.setItem('studentId', data.data.userInfo.studentId);
        setIsNewUser(true);
        toast.info('회원가입 화면으로 이동합니다.');
        return;
      }
      localStorage.setItem('accessToken', data.data.accessToken);

      toast.success('로그인 성공');
      setIsLoggedIn(true);
      onClose();
    } catch (error) {
      console.error('로그인 실패: ', error);
      toast.error('로그인 실패');
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="sejongPortalId" className="mb-2 font-semibold">
        학번
      </label>
      <input
        type="text"
        id="sejongPortalId"
        name="sejongPortalId"
        value={loginForm.sejongPortalId}
        onChange={handleChange}
        placeholder="학번 (ex. 12345678)"
        className="mb-4 rounded-lg border-2 border-black p-2 text-sm transition-all duration-100 focus:border-[#8BE34A] focus:ring-2 focus:ring-[#8BE34A] focus:outline-none"
      />
      <label htmlFor="sejongPortalPw" className="mb-2 font-semibold">
        비밀번호
      </label>
      <input
        type="password"
        id="sejongPortalPw"
        name="sejongPortalPw"
        value={loginForm.sejongPortalPw}
        onChange={handleChange}
        placeholder="비밀번호"
        className="mb-0.5 rounded-lg border-2 border-black p-2 text-sm transition-all duration-100 focus:border-[#8BE34A] focus:ring-2 focus:ring-[#8BE34A] focus:outline-none"
      />
      <span className="mb-4 indent-2 text-[10px] text-[#73bd3e]">
        학사정보시스템 비밀번호를 사용해주세요.
      </span>
      <button
        type="submit"
        className="cursor-pointer rounded-md bg-[#8BE34A] p-2 font-semibold text-white hover:bg-[#77db30]"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
