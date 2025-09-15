import { useLocation, useNavigate } from 'react-router-dom';
import type { PlaceProps } from '../../types/type';
import TagButton from '../share/TagButton';

interface PlaceItemCardProps {
  placeInfo: PlaceProps;
  className?: string;
}

const PlaceItemCard = ({ placeInfo, className }: PlaceItemCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`h-[180px] w-[330px] cursor-pointer overflow-hidden rounded-xl shadow-sm transition-colors duration-200 hover:bg-[#fafafa] ${className}`}
      onClick={() =>
        navigate(`/detail/${placeInfo.placeId}`, {
          state: { from: location.pathname + location.search },
        })
      }
    >
      <div className="flex h-full w-full">
        {placeInfo.mainImageUrl ? (
          <img
            src={placeInfo.mainImageUrl}
            alt="장소 대표 이미지"
            className="aspect-[3/4] w-[50%]"
          />
        ) : (
          <div className="flex w-[50%] bg-[#F0F0F0]">
            <div className="align-center flex w-full justify-center gap-2">
              <img
                src="/asset/place-detail-page/camera.svg"
                alt="camera"
                className="w-5"
              />
              <span className="flex items-center text-xs text-[#354052]">
                사진이 없습니다
              </span>
            </div>
          </div>
        )}
        <div className="flex w-[50%] flex-col">
          <div className="flex flex-col gap-2 p-2.5">
            <div>
              <h3 className="text-lg font-medium">{placeInfo.placeName}</h3>
              <div className="text-xs text-gray-600">
                {placeInfo.categories.map((category) => (
                  <span key={category.categoryId} className="rounded-full">
                    {category.categoryName}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-0.5">
                <img
                  src="/asset/place-item-card/eye.svg"
                  alt="viewCount"
                  className="h-4 w-4 text-[#77db30]"
                />
                <span className="text-sm text-gray-600">
                  {placeInfo.viewCount}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <img
                  src="/asset/place-item-card/chat.svg"
                  alt="reviewCount"
                  className="h-4 w-4 text-[#77db30]"
                />
                <span className="text-sm text-gray-600">
                  {placeInfo.reviewCount}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {placeInfo.tags.slice(0, 3).map((tag) => (
                <TagButton key={tag.tagId}>{tag.tagName}</TagButton>
              ))}
              {placeInfo.tags.length > 3 && (
                <span className="w-fit cursor-pointer rounded-full bg-[#F3F4F5] px-3 py-1.5 text-[10px] font-semibold text-[#2C3037]">
                  +{placeInfo.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceItemCard;
