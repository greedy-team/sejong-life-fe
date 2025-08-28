import { useNavigate } from 'react-router-dom';
import type { PlaceProps } from '../../types/type';
import TagButton from '../share/TagButton';

interface PlaceItemCardProps {
  placeInfo: PlaceProps;
  className?: string;
}

const PlaceItemCard = ({ placeInfo, className }: PlaceItemCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`box-border h-fit w-[330px] cursor-pointer rounded-md transition-colors duration-150 hover:bg-[#fafafa] ${className}`}
      onClick={() => navigate(`/detail/${placeInfo.placeId}`)}
    >
      <div className="flex w-full">
        <img
          src={placeInfo.mainImageUrl}
          alt="장소 대표 이미지"
          className="aspect-square w-[50%] rounded-md"
        />
        <div className="flex-1">
          <div className="m-2 rounded-md bg-[#F3F4F5] p-2">
            <h3 className="flex items-center gap-1 text-lg font-extrabold">
              <img
                src="asset/place-item-card/loc.svg"
                alt="장소 아이콘"
                width={17}
                height={17}
              />
              {placeInfo.placeName}
            </h3>
            <div className="flex gap-1 text-sm font-semibold text-[#70553D]">
              {placeInfo.categories.map((category) => (
                <span key={category.categoryId}>{category.categoryName}</span>
              ))}
            </div>
          </div>
          <div className="m-2 flex flex-wrap gap-2">
            {placeInfo.tags.map((tag) => (
              <TagButton key={tag.tagId}>{tag.tagName}</TagButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceItemCard;
