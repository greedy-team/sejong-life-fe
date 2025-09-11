import type { DetailPlaceProps } from '../../types/type';
import TagButton from '../../components/share/TagButton';

interface PlaceInfoProps {
  place: DetailPlaceProps;
}

const PlaceInfo = ({ place }: PlaceInfoProps) => {
  return (
    <div className="flex w-[90%] flex-col items-start gap-5">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-[#212529]">{place.name}</h1>
        <div className="rounded-full bg-[#f0f0f0] px-3.5 py-1.5 text-xs">
          {place.categories[0].categoryName}
        </div>
      </div>

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
        <div className="mt-4 flex w-full justify-between gap-3">
          <a
            href={place.mapLinks.naverMap}
            target="_blank"
            className="flex-1 rounded-2xl bg-[#03C75A] py-3 text-center text-lg text-white transition-colors hover:bg-[#02B350]"
          >
            네이버맵
          </a>
          <a
            href={place.mapLinks.kakaoMap}
            target="_blank"
            className="flex-1 rounded-2xl bg-[#FEE500] py-3 text-center text-lg transition-colors hover:bg-[#F5D400]"
          >
            카카오맵
          </a>
          <a
            href={place.mapLinks.googleMap}
            target="_blank"
            className="flex-1 rounded-2xl bg-[#868E96] py-3 text-center text-lg text-white transition-colors hover:bg-[#6C757D]"
          >
            구글맵
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfo;
