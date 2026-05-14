import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useKakaoLogin } from '../features/meeting/hooks/useKakaoLogin';
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

  const hasCalledLogin = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (code && state && !hasCalledLogin.current) {
      hasCalledLogin.current = true;
      kakaoLogin({ code, state });
    }
  }, []);

  const handleKakaoLogin = async () => {
    const { data } = await authApi.get('/api/meeting/auth/kakao/state');

    window.location.href =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${KAKAO_CLIENT_ID}` +
      `&redirect_uri=${KAKAO_REDIRECT_URI}` +
      `&response_type=code` +
      `&state=${encodeURIComponent(data.data.state)}`;
  };
  return (
    <main className="bg-alabaster mx-auto flex min-h-screen w-full max-w-[448px] flex-col items-center justify-center px-6">
      <div className="mb-12 flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-gray-900">미팅 서비스</h1>
        <p className="font-semibold text-gray-900">
          카카오 로그인 후 이용할 수 있어요
        </p>
        <div className="mt-1 flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5">
          <span className="text-xs text-gray-500">
            📱 모바일 이용을 권장해요
          </span>
        </div>
      </div>

      <button
        onClick={handleKakaoLogin}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl py-4 font-bold text-[#3C1E1E]"
        style={{ backgroundColor: '#FEE500' }}
      >
        카카오로 시작하기
      </button>

      <div className="mt-6 flex w-full flex-col items-center gap-2">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-xs text-gray-400">🔒</span>
          <p className="text-xs leading-relaxed text-gray-400">
            카카오 계정은 로그인 인증용으로만 사용돼요
          </p>
        </div>
        <div className="flex gap-2">
          <span className="mt-0.5 text-xs text-gray-400">❌</span>
          <p className="text-xs leading-relaxed text-gray-400">
            이름, 친구목록 등 개인정보는 일절 수집하지 않아요
          </p>
        </div>
      </div>
    </main>
  );
};

export default MeetingKakaoLoginPage;
