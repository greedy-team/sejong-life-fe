import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeetingProfiles } from '../features/meeting/hooks/useMeetingProfiles';
import { useOpenCard } from '../features/meeting/hooks/useOpenCard';
import ProfileCardList from '../features/meeting/components/ProfileCardList';
import ContactRevealModal from '../features/meeting/components/ContactRevealModal';
import type { CardOpenResponse } from '../types/meetingType';

function MeetingPage() {
  const navigate = useNavigate();
  const { data: profiles, isLoading, isError } = useMeetingProfiles();
  const [openCardResult, setOpenCardResult] = useState<CardOpenResponse | null>(
    null,
  );
  const [remainOpenCount, setRemainOpenCount] = useState(1);

  const { mutate: openCard } = useOpenCard((data) => {
    setOpenCardResult(data);
    setRemainOpenCount(data.remainOpenCount);
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 2C6.686 2 4 4.686 4 8C4 11.314 6.686 14 10 14C13.314 14 16 11.314 16 8C16 4.686 13.314 4 10 2Z"
                stroke="#EB4763"
                strokeWidth="1.667"
              />
              <path
                d="M16.667 2.5L14.167 5"
                stroke="#EB4763"
                strokeWidth="1.667"
              />
              <path d="M15 2L17 4" stroke="#EB4763" strokeWidth="1.667" />
              <path
                d="M3.333 14.167L5.833 16.667"
                stroke="#EB4763"
                strokeWidth="1.667"
              />
              <path d="M2.5 15L5 17.5" stroke="#EB4763" strokeWidth="1.667" />
            </svg>
            <span className="text-heading-2 text-shark">오늘의 인연</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/meeting/register')}
            className="bg-choice-header-gradient flex cursor-pointer flex-row items-center gap-1.5 rounded-full px-4 py-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="1.335"
                y="1.335"
                width="5.33"
                height="5.33"
                rx="1"
                stroke="white"
                strokeWidth="1.333"
              />
              <rect
                x="9.335"
                y="1.335"
                width="5.33"
                height="5.33"
                rx="1"
                stroke="white"
                strokeWidth="1.333"
              />
              <rect
                x="1.335"
                y="9.335"
                width="5.33"
                height="5.33"
                rx="1"
                stroke="white"
                strokeWidth="1.333"
              />
              <path
                d="M9.667 12.333L12.333 12.333M12.333 9.667L12.333 14.999"
                stroke="white"
                strokeWidth="1.333"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-caption font-bold text-white">
              {remainOpenCount}개
            </span>
          </button>
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
            <button
              type="button"
              onClick={() => navigate('/meeting/register')}
              className="bg-main-gradient text-body-medium cursor-pointer rounded-full px-6 py-3 font-bold text-white"
            >
              내 프로필 등록하기
            </button>
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
