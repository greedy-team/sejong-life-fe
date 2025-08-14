import type { PlaceItemCardProps } from './model/type';

const PlaceItemCard = ({ placeInfo }: PlaceItemCardProps) => {
  return (
    <div className="w-[430px] h-[235px] rounded-lg border">
      <img src={placeInfo.mainPhotoUrl} alt="장소 대표 이미지" />
      <div>
        <h3>{placeInfo.placeName}</h3>
        <div>
          {placeInfo.categories.map((category) => (
            <span>{category.categoryName}</span>
          ))}
        </div>
        <div>
          {placeInfo.tags.map((tag) => (
            <span>{tag.tagName}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceItemCard;
