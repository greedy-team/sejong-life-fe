import { useNavigate } from 'react-router-dom';

const MeetingKakaoLoginPage = () => {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    navigate('/meeting/register');
  };
  return (
    <main className="bg-alabaster mx-auto flex min-h-screen w-full max-w-[448px] flex-col items-center justify-center px-6">
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">미팅 서비스</h1>
        <p className="text-gray-90 mt-4 text-lg font-semibold">
          카카오 로그인 후 이용할 수 있어요
        </p>
      </div>

      <button
        onClick={handleKakaoLogin}
        className="flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-bold text-[#3C1E1E]"
        style={{ backgroundColor: '#FEE500' }}
      >
        카카오로 시작하기
      </button>
      <p className="text-body-medium mt-5 text-center leading-relaxed text-gray-500">
        * 카카오 계정은{' '}
        <span className="font-semibold text-gray-700">1인 1계정 확인</span>
        용으로만 사용돼요
        <br />* 이름, 친구목록 등 개인정보는 일절 수집하지 않아요
      </p>
    </main>
  );
};

export default MeetingKakaoLoginPage;
