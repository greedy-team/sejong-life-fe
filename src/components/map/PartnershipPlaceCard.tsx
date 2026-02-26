// import { useNavigate } from 'react-router-dom';
// import type { PlaceProps } from '../../types/type';
import { ICONS } from '../../features/share/constants/icons';

interface PartnershipPlaceCardProps {
  isSheetOpen: boolean;
  //   place: PlaceProps;
}

export function PartnershipPlaceCard({
  isSheetOpen,
}: PartnershipPlaceCardProps) {
  //   const navigate = useNavigate();

  if (!isSheetOpen) return null;

  return (
    <button
      type="button"
      //   key={place.placeId}
      //   onClick={() => navigate(`/place/${place.placeId}`)}
      className="fixed right-0 bottom-0 left-0 z-[60] m-4 flex h-[150px] cursor-pointer items-center rounded-2xl bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.15)] hover:bg-gray-50"
    >
      <div className="mx-auto w-[90%] text-left sm:w-[95%]">
        <div className="flex items-center gap-4">
          <div className="h-[110px] w-[110px] overflow-hidden rounded-xl bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=70"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1 text-left">
            <div className="truncate text-[18px] font-semibold text-[#354052]">
              멘츠루 어린이대공원점
            </div>

            <div className="mt-1 flex items-center gap-2">
              <div className="h-4 w-1 bg-[#8BE34A]" />
              <span className="truncate text-[15px] font-medium text-[#354052]">
                최대 4만원dgsdgfdgdgdgdgdg
              </span>
            </div>

            <div className="mt-1 -ml-1 flex items-center gap-2 text-[13px] text-gray-500 sm:-ml-1.5">
              <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#8BE34A]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8BE34A]" />
              </span>
              <span className="truncate">
                어린이대공원역 · 서울 광진구 dkdkdkdkd
              </span>
            </div>
          </div>

          <div className="shrink-0 text-gray-300 transition group-hover:text-gray-400">
            <img src={ICONS.arrow} alt="바로가기" />
          </div>
        </div>
      </div>
    </button>
  );
}
