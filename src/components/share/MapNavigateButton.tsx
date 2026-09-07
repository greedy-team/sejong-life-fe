import { useLocation } from 'react-router-dom';
import { ICONS } from '../../features/share/constants/icons';

interface MapNavigateButtonProps {
  onClick?: () => void;
}

function MapNavigateButton({ onClick }: MapNavigateButtonProps) {
  // 전역 window.location을 읽으면 리액트가 추적하지 못해서, 같은 화면에서
  // 라우트만 바뀔 때 버튼 라벨이 갱신되지 않는다.
  const { pathname } = useLocation();
  const isMapPage = pathname.startsWith('/map');
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
