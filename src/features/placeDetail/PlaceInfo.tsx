import type { DetailPlaceProps } from '../../types/type';
import TagButton from '../../components/share/TagButton';
import { toast } from 'react-toastify';

interface PlaceInfoProps {
  place: DetailPlaceProps;
}

const PlaceInfo = ({ place }: PlaceInfoProps) => {
  return (
    <div className="flex w-[90%] flex-col items-start gap-5">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-[#212529]">{place.name}</h1>
        <div className="rounded-full bg-[#f0f0f0] px-3.5 py-1.5 text-xs">
          {place.categories.map((category) => (
            <span key={category.categoryId} className="rounded-full">
              {category.categoryName}
            </span>
          ))}
        </div>
      </div>

      {place.isPartnership && (
        <div className="flex items-start justify-center gap-3">
          <div className="h-16 w-2 bg-[#77db30]" />
          <div className="my-auto flex flex-col justify-center gap-1.5">
            <div className="flex items-center gap-1">
              <span className="text-lg font-semibold text-[#343A40]">
                제휴 혜택
              </span>
            </div>
            <p className="text-m mb-1 leading-5 text-gray-700">
              {place.partnershipContent}
            </p>
          </div>
        </div>
      )}

      <div className="text-lg font-semibold text-[#343A40]">
        <div className="flex items-center gap-2">
          <img
            src="/asset/place-detail-page/tag.svg"
            alt="tag"
            className="text-[#77db30]"
          />
          <span>태그</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {place.tags.map((tag) => (
            <TagButton key={tag.tagId} size="large">
              {tag.tagName}
            </TagButton>
          ))}
        </div>
      </div>

      <div className="w-full items-center text-lg font-semibold text-[#343A40]">
        <div className="flex items-center gap-2">
          <img src="/asset/place-detail-page/map.svg" alt="map" />
          <span>지도 바로가기</span>
        </div>
        <div className="mt-4 grid w-full gap-3 sm:flex sm:justify-between">
          <a
            href={place.mapLinks.naverMap}
            target="_blank"
            onClick={(e) => {
              if (!place.mapLinks.naverMap) {
                e.preventDefault();
                toast.error('네이버맵에서는 이 장소 정보를 제공하지 않습니다.');
              }
            }}
            className="flex-1 rounded-2xl bg-[#03C75A] py-2 text-center text-white transition-colors hover:bg-[#02B350] sm:py-3 sm:text-lg"
          >
            네이버맵
          </a>
          <a
            href={place.mapLinks.kakaoMap}
            target="_blank"
            onClick={(e) => {
              if (!place.mapLinks.kakaoMap) {
                e.preventDefault();
                toast.error('카카오맵에서는 이 장소 정보를 제공하지 않습니다.');
              }
            }}
            className="flex-1 rounded-2xl bg-[#FEE500] py-2 text-center transition-colors hover:bg-[#F5D400] sm:py-3 sm:text-lg"
          >
            카카오맵
          </a>
          <a
            href={place.mapLinks.googleMap}
            target="_blank"
            onClick={(e) => {
              if (!place.mapLinks.googleMap) {
                e.preventDefault();
                toast.error('구글맵에서는 이 장소 정보를 제공하지 않습니다.');
              }
            }}
            className="flex-1 rounded-2xl bg-[#868E96] py-2 text-center text-white transition-colors hover:bg-[#6C757D] sm:py-3 sm:text-lg"
          >
            구글맵
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfo;
