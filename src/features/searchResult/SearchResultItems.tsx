import { useEffect, useState } from 'react';
import PlaceItemCard from '../../components/place-item-card/PlaceItemCard';
import { useSearchParams } from 'react-router-dom';
import type { PlaceProps } from '../../types/type';
import { fetchSearchResult } from '../../api/searchResultApi';

const SearchResultItems = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [loading, setLoading] = useState(false);

  const [isPartnershipButtonOn, setIsPartnershipButtonOn] = useState(false);

  useEffect(() => {
    const search = async () => {
      const trimmed = keyword.trim();
      if (!trimmed) {
        setPlaces([]);
        return;
      }

      setLoading(true);
      const data = await fetchSearchResult({
        keyword: trimmed,
      });
      setPlaces(data ?? []);
      setLoading(false);
    };

    search();
  }, [keyword]);

  if (loading) return <div>검색 중...</div>;

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

export default SearchResultItems;
