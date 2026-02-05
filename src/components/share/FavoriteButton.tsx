import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import LoginModal from '../../features/login/components/LoginModal';
import LoginWidget from '../../features/login/components/LoginWidget';

interface FavoriteButtonProps {
  className?: string;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FavoriteButton = ({
  className,
  isFavorite,
  onToggleFavorite,
}: FavoriteButtonProps) => {
  const { isLoggedIn } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoggedIn) {
      onToggleFavorite(e);
    } else {
      toast.error('장소를 저장하려면 로그인해주세요');
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <button onClick={handleFavoriteClick} className={`${className}`}>
        {!isFavorite && (
          <img
            src="/asset/place-item-card/bookmark.svg"
            alt="비워진 북마크"
            className="h-7"
          />
        )}
        {isFavorite && (
          <img
            src="/asset/place-item-card/fillBookmark.svg"
            alt="채워진 북마크"
            className="h-7"
          />
        )}
      </button>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginWidget onClose={() => setIsLoginOpen(false)} />
      </LoginModal>
    </>
  );
};

export default FavoriteButton;
