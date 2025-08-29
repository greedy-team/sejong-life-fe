import type { PlaceDetail } from './PlaceDetailContainer';
import TagButton from '../../components/share/TagButton';

interface PlaceInfoProps {
  place: PlaceDetail;
}

const PlaceInfo = ({ place }: PlaceInfoProps) => {
  return (
    <div className="flex w-[90%] flex-col items-start gap-5">
      <div className="flex gap-4">
        <h1 className="text-2xl font-bold text-[#212529]">{place.placeName}</h1>
        <div className="rounded-full bg-[#f0f0f0] px-3.5 pt-1.5 text-sm">
          {place.categories.categoryName}
        </div>
      </div>

      <div className="text-lg font-semibold text-[#343A40]">
        🏷️ 태그
        <div className="mt-4 flex flex-wrap gap-2">
          {place.tags.map((tag) => (
            <TagButton key={tag.tagId} size="large">
              {tag.tagName}
            </TagButton>
          ))}
        </div>
      </div>

      <div className="w-full text-lg font-semibold text-[#343A40]">
        📍 지도 바로가기
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
