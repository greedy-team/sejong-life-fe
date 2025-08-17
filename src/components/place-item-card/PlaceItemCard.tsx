import type { PlaceProps } from '../../types/type';
import TagButton from '../share/TagButton';

interface PlaceItemCardProps {
  placeInfo: PlaceProps;
  className?: string;
}

const PlaceItemCard = ({ placeInfo, className }: PlaceItemCardProps) => {
  return (
    <div
      className={`box-border aspect-[16/9] w-[430px] rounded-[20px] p-3 shadow-[0_0_15px_0_rgba(0,0,0,0.1)] ${className}`}
    >
      <div className="mb-3 flex w-full gap-3">
        <img
          src={placeInfo.mainImageUrl}
          alt="장소 대표 이미지"
          className="aspect-square w-[30%]"
        />
        <div className="flex-1 p-1">
          <h3 className="text-lg font-extrabold">{placeInfo.placeName}</h3>
          <div className="flex gap-1 text-xs font-semibold text-[#70553D]">
            {placeInfo.categories.map((category) => (
              <span key={category.categoryId}>{category.categoryName}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 p-2">
        {placeInfo.tags.map((tag) => (
          <TagButton key={tag.tagId}>{tag.tagName}</TagButton>
        ))}
      </div>
    </div>
  );
};

export default PlaceItemCard;
