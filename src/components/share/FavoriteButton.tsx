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
  return (
    <button onClick={onToggleFavorite} className={`${className}`}>
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
  );
};

export default FavoriteButton;
