import type { PlaceItemCardProps } from './model/type';

const PlaceItemCard = ({ placeInfo }: PlaceItemCardProps) => {
  return (
    <div className="w-[430px] h-[235px] rounded-[20px] p-3 shadow-[0_0_15px_0_rgba(0,0,0,0.1)]">
      <div className="flex w-full mb-3 gap-3">
        <img
          src={placeInfo.mainPhotoUrl}
          alt="장소 대표 이미지"
          className="w-[30%] aspect-square"
        />
        <div className="flex-1 p-1">
          <h3 className="text-lg font-extrabold">{placeInfo.placeName}</h3>
          <div className="flex gap-1 text-xs text-[#70553D] font-semibold">
            {placeInfo.categories.map((category) => (
              <span>{category.categoryName}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 p-2">
        {placeInfo.tags.map((tag) => (
          <span className="rounded-full w-fit px-3 py-0.5 bg-blue-200 text-[10px] text-[#70553D] font-semibold border border-[#828282]">
            # {tag.tagName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PlaceItemCard;
