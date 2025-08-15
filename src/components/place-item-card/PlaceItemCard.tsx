import type { PlaceItemCardProps } from './model/type';

const PlaceItemCard = ({ placeInfo }: PlaceItemCardProps) => {
  return (
    <div className="h-[235px] w-[430px] rounded-[20px] p-3 shadow-[0_0_15px_0_rgba(0,0,0,0.1)]">
      <div className="mb-3 flex w-full gap-3">
        <img
          src={placeInfo.mainPhotoUrl}
          alt="장소 대표 이미지"
          className="aspect-square w-[30%]"
        />
        <div className="flex-1 p-1">
          <h3 className="text-lg font-extrabold">{placeInfo.placeName}</h3>
          <div className="flex gap-1 text-xs font-semibold text-[#70553D]">
            {placeInfo.categories.map((category) => (
              <span>{category.categoryName}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 p-2">
        {placeInfo.tags.map((tag) => (
          <span className="w-fit rounded-full border border-[#828282] bg-blue-200 px-3 py-0.5 text-[10px] font-semibold text-[#70553D]">
            # {tag.tagName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PlaceItemCard;
