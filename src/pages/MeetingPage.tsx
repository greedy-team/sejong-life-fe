import { useState } from 'react';
import { useMeetingProfiles } from '../features/meeting/hooks/useMeetingProfiles';
import { useOpenCard } from '../features/meeting/hooks/useOpenCard';
import ProfileCardList from '../features/meeting/components/ProfileCardList';
import ContactRevealModal from '../features/meeting/components/ContactRevealModal';
import type { CardOpenResponse } from '../types/meetingType';
import { toast } from 'react-toastify';

function MeetingPage() {
  const { data: profiles, isLoading, isError } = useMeetingProfiles();
  const [openCardResult, setOpenCardResult] = useState<CardOpenResponse | null>(
    null,
  );
  const { mutate: openCard, isPending: isOpening } = useOpenCard((data) => {
    setOpenCardResult(data);
  });

  const handleOpenCard = (profileId: number) => {
    openCard(profileId);
  };

  const handleCloseModal = () => {
    setOpenCardResult(null);
    toast('🧡 또 만나요! 새로운 인연이 기다리고 있어요', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  return (
    <main className="bg-meeting-surface mx-auto flex min-h-screen w-full max-w-[448px] flex-col">
      <header className="sticky top-0 z-10 w-full">
        {/* 메인 헤더 */}
        <div
          className="flex w-full flex-row items-center justify-between px-5 py-4"
          style={{
            background: 'rgba(255, 253, 249, 0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 107, 53, 0.08)',
          }}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-heading-2 text-shark">나의 인연 찾기</span>
            <p className="text-sm text-gray-400">
              카드를 눌러 연락처를 확인해보세요
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-2xl leading-none font-black">999명</span>{' '}
            <span className="text-xs text-gray-400">의 이성 프로필 등록됨</span>
          </div>
        </div>

        <div
          className="flex w-full flex-row items-center justify-between px-5 py-2.5"
          style={{
            background: 'rgba(255, 107, 53, 0.06)',
            borderBottom: '1px solid rgba(255, 107, 53, 0.1)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-gray-500">🎟️ 뽑기 기회</span>
            <span className="text-sm font-black">N회</span>
            <span className="text-sm text-gray-400">남음</span>
          </div>
          <span className="text-xs text-gray-400">00분 00초 후 +1 충전</span>
        </div>
      </header>

      <div className="mt-4 flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <span className="text-body-regular text-jumbo">불러오는 중...</span>
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <span className="text-body-regular text-jumbo">
              목록을 불러오지 못했습니다.
            </span>
          </div>
        )}
        {profiles && profiles.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <span className="text-4xl">🌸</span>
            <span className="text-body-regular text-jumbo">
              아직 등록된 프로필이 없어요 🥲
              <br /> 잠시 후 다시 방문해주세요.
            </span>
          </div>
        )}
        {profiles && profiles.length > 0 && (
          <ProfileCardList
            profiles={profiles}
            onOpenCard={handleOpenCard}
            isOpening={isOpening}
          />
        )}
      </div>

      {openCardResult && (
        <ContactRevealModal
          contact={openCardResult.contact}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default MeetingPage;
