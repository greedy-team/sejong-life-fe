import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useKakaoLogin } from '../features/meeting/hooks/useKakaoLogin';
import { useProfileCount } from '../features/meeting/hooks/useProfileCount';
import { authApi } from '../api/api';
import { MeetingInfoCard } from '../features/meeting/components/MeetingInfoCard';
import ProfileCard from '../features/meeting/components/ProfileCard';
import { meetingMockProfiles } from '../features/meeting/mock/meetingMockProfiles';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const MeetingKakaoLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: profileCount } = useProfileCount();

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
  }, [searchParams, kakaoLogin]);

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
    <main className="relative mx-auto min-h-screen w-full max-w-[448px] overflow-hidden bg-[#FFFDF9]">
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(70px) scale(1);
            }
            100% {
              transform: translateY(-70px) scale(1);
            }
          }
        `}
      </style>

      <div className="pointer-events-none fixed inset-0 opacity-60 blur-[1px]">
        {meetingMockProfiles.map((profile, index) => (
          <div
            key={profile.id}
            className={`absolute ${profile.position} w-[210px] rounded-3xl shadow-[0_8px_32px_rgba(255,107,53,0.2)] ring-1 ring-orange-200`}
            style={{
              animation: 'floatUp 12s linear infinite',
              animationDelay: `${index * -2}s`,
            }}
          >
            <ProfileCard
              profile={profile}
              onOpen={() => {}}
              isOpening={false}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white" />

      <section className="relative z-10 flex min-h-screen flex-col px-6 pt-10 pb-7">
        <div className="flex-1">
          <div className="mt-20 text-center">
            <h1 className="text-[32px] leading-tight font-black tracking-[-0.04em] text-gray-900">
              내 프로필을 등록하면
              <br />
              <span className="text-[#FF6B35]">
                인연 프로필을 뽑을 수 있어요
              </span>
            </h1>
            <p className="mt-3 text-base leading-relaxed font-medium text-gray-500">
              등록은 딱 한 번, 프로필은 축제 기간 동안 유지돼요
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="font-semibold text-[#FF5F6D]">
              ♀ 여자 {profileCount?.female ?? 0}명
            </span>
            <span className="h-3.5 w-px bg-gray-200" />
            <span className="font-semibold text-[#3B82F6]">
              ♂ 남자 {profileCount?.male ?? 0}명
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <MeetingInfoCard
              icon="🎟️"
              title={
                <>
                  <span className="text-[#FF6B35]">등록</span>하면 바로{' '}
                  <span className="text-[#FF6B35]">1회</span> 열람
                </>
              }
              description="내 프로필을 등록하면 다른 사람의 프로필을 1번 뽑을 수 있어요."
            />

            <MeetingInfoCard
              icon="⏰"
              title={
                <>
                  <span className="text-[#FF6B35]">1시간마다</span> 뽑기 기회{' '}
                  <span className="text-[#FF6B35]">+1</span>
                </>
              }
              description="프로필을 뽑은 후 1시간마다 +1의 뽑기 기회가 생겨요. 자주 방문할수록 더 많은 인연을!"
            />

            <MeetingInfoCard
              icon="🔗"
              title={
                <>
                  <span className="text-[#FF6B35]">링크 공유</span>하면 뽑기
                  기회 <span className="text-[#FF6B35]"> +1</span>
                </>
              }
              description="친구에게 슬종생 링크를 공유하면 추가로 뽑기 기회를 받을 수 있어요."
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 w-full max-w-[448px] -translate-x-1/2 bg-gradient-to-t from-white via-white to-transparent px-2 pt-4 pb-8">
          <button
            type="button"
            onClick={handleKakaoLogin}
            className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF5F6D] py-4 text-center leading-tight font-bold text-white shadow-[0_16px_36px_rgba(255,95,109,0.35)] active:scale-[0.98]"
          >
            <span>카카오 로그인하고 내 프로필 등록하기 ›</span>
          </button>

          <div className="mt-5 flex flex-col items-center gap-2 text-xs text-gray-400">
            <p>
              🔒 카카오 계정은 로그인 인증용으로 이름 등 개인정보는 수집하지
              않아요
            </p>
            <p>
              🧡 이미 프로필을 등록하셨다면 로그인 시 바로 인연 프로필 페이지가
              나와요
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MeetingKakaoLoginPage;
