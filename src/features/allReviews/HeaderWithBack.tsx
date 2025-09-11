import { useNavigate, useParams } from 'react-router-dom';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';

const HeaderWithBack = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { place } = usePlaceDetail(id!);

  return (
    <>
      <header className="flex h-14 w-full border-b border-b-[#EEEFF1] px-15 py-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-5"
        >
          <div className="flex items-center gap-2">
            <img src="/asset/all-review/backArrow.svg" alt="뒤로가기"></img>
            <span className="font-semibold text-[#354052]">{place?.name}</span>
          </div>
        </button>
      </header>
    </>
  );
};

export default HeaderWithBack;
