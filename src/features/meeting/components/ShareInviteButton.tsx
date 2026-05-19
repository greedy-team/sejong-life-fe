import { toast } from 'react-toastify';

function ShareInviteButton() {
  const handleShare = async () => {
    const kakaoId = localStorage.getItem('kakaoId');
    if (!kakaoId) {
      toast.error('초대 링크를 만들 수 없어요. 다시 로그인해주세요.');
      return;
    }

    const shareUrl = `${window.location.origin}/meeting/kakaoLogin?ref=${encodeURIComponent(kakaoId)}`;
    const shareText =
      '슬종생 미팅에서 인연을 찾아보세요! 이 링크로 가입하면 친구에게 보너스 뽑기권이 지급돼요 🎟️';

    const copyFallback = async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast('🔗 초대 링크가 복사됐어요! 친구에게 붙여넣어 공유해보세요', {
          position: 'top-center',
          autoClose: 3000,
        });
      } catch {
        toast.error('공유에 실패했어요. 잠시 후 다시 시도해주세요.');
      }
    };

    if (!navigator.share) {
      await copyFallback();
      return;
    }

    try {
      await navigator.share({
        title: '슬종생 미팅',
        text: shareText,
        url: shareUrl,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      await copyFallback();
    }
  };

  return (
    <div className="from-meeting-surface via-meeting-surface fixed bottom-0 left-1/2 z-20 w-full max-w-[448px] -translate-x-1/2 bg-gradient-to-t to-transparent px-4 pt-3 pb-5">
      <button
        type="button"
        onClick={handleShare}
        className="bg-main-gradient text-button flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-4 font-bold text-white shadow-[0_12px_28px_rgba(255,95,109,0.35)] active:scale-[0.98]"
      >
        🎁 친구에게 공유하고 보너스 뽑기권 받기!
      </button>
    </div>
  );
}

export default ShareInviteButton;
