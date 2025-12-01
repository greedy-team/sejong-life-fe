import { useState } from 'react';
import { requestSignUp } from '../api/loginApi';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';

interface SignUpFormData {
  studentId: string;
  name: string;
  nickname: string;
}

interface SignUpFormProps {
  onClose: () => void;
}

const SignUpForm = ({ onClose }: SignUpFormProps) => {
  const { setIsLoggedIn } = useAuth();
  const [signUpForm, setSignUpForm] = useState<SignUpFormData>(() => {
    const savedStudentId = localStorage.getItem('studentId') || '';
    const savedName = localStorage.getItem('name') || '';

    return {
      studentId: savedStudentId,
      name: savedName,
      nickname: '',
    };
  });
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const isKoreanOnly = (text: string) => {
    if (!text) return true;
    const koreanRegex = /^[가-힣\s]+$/;
    return koreanRegex.test(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'nickname') {
      setIsNicknameValid(isKoreanOnly(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpForm.nickname) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const data = await requestSignUp(signUpForm);
      localStorage.setItem('accessToken', data.data);
      localStorage.removeItem('signUpToken');
      localStorage.removeItem('name');
      localStorage.removeItem('studentId');

      toast.success('회원가입에 성공하였습니다.');
      setIsLoggedIn(true);
      onClose();
    } catch (error) {
      console.error('회원가입 실패: ', error);
      toast.error('회원가입 실패');
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="studentId" className="mb-1 font-semibold">
        학번
      </label>
      <input
        type="text"
        id="studentId"
        name="studentId"
        value={signUpForm.studentId}
        readOnly
        className="mb-3 rounded-lg border-2 border-gray-300 bg-gray-200 p-2 text-sm text-gray-700 focus:ring-0 focus:outline-none"
      />
      <label htmlFor="name" className="mb-1 font-semibold">
        이름
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={signUpForm.name}
        readOnly
        className="mb-3 rounded-lg border-2 border-gray-300 bg-gray-200 p-2 text-sm text-gray-700 focus:ring-0 focus:outline-none"
      />
      <label htmlFor="nickname" className="mb-1 font-semibold">
        닉네임
      </label>

      <input
        type="text"
        id="nickname"
        name="nickname"
        value={signUpForm.nickname}
        onChange={handleChange}
        placeholder="한글로 된 닉네임을 적어주세요."
        className="mb-1 rounded-lg border-2 border-black p-2 text-sm transition-all duration-100 focus:border-[#8BE34A] focus:ring-2 focus:ring-[#8BE34A] focus:outline-none"
      />
      {!isNicknameValid && signUpForm.nickname && (
        <span className="mb-1 indent-2 text-[12px] text-red-500">
          닉네임은 한글로만 설정 가능합니다.
        </span>
      )}
      <button
        type="submit"
        disabled={!signUpForm.nickname || !isNicknameValid}
        className="cursor-pointer rounded-md bg-[#8BE34A] p-2 font-semibold text-white hover:bg-[#77db30] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUpForm;
