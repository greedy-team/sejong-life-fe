import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useKakaoLogin } from '../features/meeting/hooks/useKaKaoLogin';
import { authApi } from '../api/api';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const MeetingKakaoLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutate: kakaoLogin } = useKakaoLogin((data) => {
    if (data.data.newUser) {
      sessionStorage.setItem('signUpToken', data.data.signUpToken);
      navigate('/meeting/register?step=gender');
    } else {
      localStorage.setItem('accessToken', data.data.accessToken);
      navigate('/meeting');
    }
  });

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (code && state) {
      kakaoLogin({ code, state }); //자동으로 mutate 하도록
    }
  }, []);

  const handleKakaoLogin = async () => {
    const { data } = await authApi.get('/meeting/auth/kakao/state');

    window.location.href =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${KAKAO_CLIENT_ID}` +
      `&redirect_uri=${KAKAO_REDIRECT_URI}` +
      `&response_type=code` +
      `&state=${data.state}`;
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
