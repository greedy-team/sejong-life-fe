import { useState } from 'react';
import { useMeetingProfiles } from '../features/meeting/hooks/useMeetingProfiles';
import { useOpenCard } from '../features/meeting/hooks/useOpenCard';
import ProfileCardList from '../features/meeting/components/ProfileCardList';
import ContactRevealModal from '../features/meeting/components/ContactRevealModal';
import { TodayConnectionIcon } from '../components/icons';
import type { CardOpenResponse } from '../types/meetingType';

function MeetingPage() {
  const { data: profiles, isLoading, isError } = useMeetingProfiles();
  const [openCardResult, setOpenCardResult] = useState<CardOpenResponse | null>(
    null,
  );

  const { mutate: openCard } = useOpenCard((data) => {
    setOpenCardResult(data);
  });

  const handleOpenCard = (profileId: number) => {
    openCard(profileId);
  };

  const handleCloseModal = () => {
    setOpenCardResult(null);
  };

  return (
    <main className="bg-meeting-surface mx-auto flex min-h-screen w-full max-w-[448px] flex-col">
      <header
        className="sticky top-0 z-10 w-full"
        style={{
          background: 'rgba(250, 250, 250, 0.8)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="flex w-full flex-row items-center justify-between px-5 py-4">
          <div className="flex flex-row items-center gap-2">
            <TodayConnectionIcon />
            <span className="text-heading-2 text-shark">나의 인연 찾기</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
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
              아직 등록된 프로필이 없어요
            </span>
          </div>
        )}
        {profiles && profiles.length > 0 && (
          <ProfileCardList profiles={profiles} onOpenCard={handleOpenCard} />
        )}
      </div>

      {openCardResult && (
        <ContactRevealModal
          contact={openCardResult.contact}
          remainOpenCount={openCardResult.remainOpenCount}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default MeetingPage;
