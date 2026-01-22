import { useNavigate, useParams } from 'react-router-dom';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';

const HeaderWithBack = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { place } = usePlaceDetail(id);

  return (
    <>
      <header className="flex h-14 w-full border-b border-b-[#EEEFF1] px-[5%] py-2 lg:px-15">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-5"
        >
          <div className="flex items-center gap-5">
            <img src="/asset/all-review/backArrow.svg" alt="뒤로가기"></img>
            {id && place?.name && (
              <span className="font-semibold text-[#354052]">{place.name}</span>
            )}
            {!id && (
              <span className="font-semibold text-[#354052]">검색결과</span>
            )}
          </div>
        </button>
      </header>
    </>
  );
};

export default HeaderWithBack;
