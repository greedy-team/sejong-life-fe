import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';

const HeaderWithBack = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { place } = usePlaceDetail(id);
  const location = useLocation();
  const title = (location.state as { title?: string })?.title;

  const idAdminPlacePage = location.pathname.startsWith('/admin/places');
  const isPlaceDetailPage = id && place?.name;

  return (
    <header className="flex h-14 w-full border-b border-b-[#EEEFF1] px-[5%] py-2 lg:px-15">
      {idAdminPlacePage ? (
        <button
          onClick={() => navigate('/admin')}
          className="flex cursor-pointer items-center gap-5"
        >
          <img src="/asset/all-review/backArrow.svg" alt="뒤로가기"></img>
          <span className="font-semibold text-[#354052]">장소관리</span>
        </button>
      ) : isPlaceDetailPage ? (
        <button
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-5"
        >
          <img src="/asset/all-review/backArrow.svg" alt="뒤로가기" />
          <span className="font-semibold text-[#354052]">{place.name}</span>
        </button>
      ) : (
        <button
          onClick={() => navigate('/explore/?category=전체')}
          className="flex cursor-pointer items-center gap-5"
        >
          <img src="/asset/all-review/backArrow.svg" alt="뒤로가기" />
          <span className="font-semibold text-[#354052]">{title}</span>
        </button>
      )}
    </header>
  );
};

export default HeaderWithBack;
