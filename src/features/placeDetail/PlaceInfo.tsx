import type { PlaceDetail } from './PlaceDetailContainer';
import TagButton from '../../components/share/TagButton';

interface PlaceInfoProps {
  place: PlaceDetail;
}

const PlaceInfo = ({ place }: PlaceInfoProps) => {
  return (
    <div className="flex w-[90%] flex-col items-start gap-8">
      <div className="flex gap-4">
        <h1 className="text-2xl font-bold">{place.placeName}</h1>
        <div className="rounded-full bg-[#f0f0f0] px-3.5 pt-1.5 text-sm">
          {place.category.categoryName}
        </div>
      </div>

      <div className="text-xl font-bold">
        🏷️ 태그
        <div className="mt-4 flex flex-wrap gap-2">
          {place.tags.map((tag) => (
            <TagButton key={tag.tagId} size="large">
              {tag.tagName}
            </TagButton>
          ))}
        </div>
      </div>

      <div className="w-full text-xl font-semibold">
        📍 지도 바로가기
        <div className="mt-4 flex w-full justify-between gap-8">
          <a
            href={place.mapLinks.naverMap}
            target="_blank"
            className="flex-1 rounded-full border border-[#D9D9D9] bg-[#D6F3D2] py-1.5 text-center text-lg hover:brightness-90"
          >
            네이버맵
          </a>
          <a
            href={place.mapLinks.kakaoMap}
            target="_blank"
            className="flex-1 rounded-full border border-[#D9D9D9] bg-[#FFE480] py-1.5 text-center text-lg hover:brightness-90"
          >
            카카오맵
          </a>
          <a
            href={place.mapLinks.googleMap}
            target="_blank"
            className="flex-1 rounded-full border border-[#D9D9D9] bg-[#ECEAE6] py-1.5 text-center text-lg hover:brightness-90"
          >
            구글맵
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfo;
