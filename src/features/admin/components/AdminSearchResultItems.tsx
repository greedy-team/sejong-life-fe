import { useEffect, useState } from 'react';
import PlaceItemCard from '../../../components/place-item-card/PlaceItemCard';
import { useSearchParams } from 'react-router-dom';
import type { PlaceProps } from '../../../types/type';
import { fetchSearchResult } from '../../../api/searchResultApi';
import PlaceRegisterForm from './PlaceRegisterForm';

const AdminSearchResultItems = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPartnershipButtonOn, setIsPartnershipButtonOn] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const search = async () => {
      setLoading(true);

      try {
        const data = await fetchSearchResult({ keyword });
        setPlaces(data ?? []);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [keyword, isFormOpen]);

  if (loading)
    return <div className="mt-25 flex justify-center">검색 중...</div>;
  if (places.length === 0 && keyword)
    return (
      <>
        <div className="mt-55 flex flex-col items-center gap-5">
          <span>검색결과가 없습니다</span>
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="mb-10 cursor-pointer rounded-xl border border-[#8BE34A] bg-[#77db30] px-6 py-3 font-semibold text-white hover:bg-[#8BE34A]"
          >
            + 장소 추가하기
          </button>
        </div>

        {isFormOpen && <PlaceRegisterForm setIsFormOpen={setIsFormOpen} />}
      </>
    );
  if (places.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-4 py-15">
      <div className="flex items-center gap-0.5">
        <button
          data-selected={isPartnershipButtonOn}
          className="flex shrink-0 cursor-pointer transition-colors duration-100 hover:scale-105"
          onClick={() => setIsPartnershipButtonOn(!isPartnershipButtonOn)}
        >
          {isPartnershipButtonOn && (
            <img
              src="/asset/explore-page/check.svg"
              alt="check"
              className="h-9 w-9 shrink-0"
            />
          )}
          {!isPartnershipButtonOn && (
            <img
              src="/asset/explore-page/noneCheck.svg"
              alt="noneCheck"
              className="h-9 w-9 shrink-0"
            />
          )}
        </button>
        <span
          data-selected={isPartnershipButtonOn}
          className="lg-text-xl font-semibold whitespace-nowrap text-[#354052]"
        >
          제휴
        </span>
      </div>
      <div className="mb-10 flex w-full border border-gray-100" />
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <PlaceItemCard
            key={place.placeId}
            placeInfo={place}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSearchResultItems;
