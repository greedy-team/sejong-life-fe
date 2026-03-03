import { ICONS } from '../../features/share/constants/icons';

interface MapNavigateButtonProps {
  onClick?: () => void;
}

function MapNavigateButton({ onClick }: MapNavigateButtonProps) {
  const isMapPage = location.pathname.startsWith('/map');
  const text = isMapPage === true ? '목록 보기 ' : '제휴맵 보기';
  const icon = isMapPage === true ? ICONS.list : ICONS.map;

  return (
    <button
      onClick={onClick}
      className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#8BE34A] px-6 font-semibold text-[#354052] shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-95 active:scale-95"
    >
      <img src={icon} />
      <span className="text-[#354052]">{text}</span>
    </button>
  );
}

export default MapNavigateButton;
