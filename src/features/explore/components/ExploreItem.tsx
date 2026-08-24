import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import PlaceItemCard from '../../../components/place-item-card/PlaceItemCard';
import TagButton from '../../../components/share/TagButton';
import Spinner from '../../../components/share/Spinner';
import SortSelector from './SortSelector';
import { useSearchParams } from 'react-router-dom';
import type { PlaceSortType } from '../../../types/type';
import { useFilteredPlaces } from '../hooks/queries';
import { useUserLocation } from '../hooks/useUserLocation';
import { useFavorites } from '../../myPage/hooks/useFavorites';
import { getPageNumbers } from '../../../utils/pagination';
import {
  DEFAULT_PLACE_SORT,
  PLACE_SORT_TYPES,
  isPlaceSortType,
} from '../constants/sortOptions';

const PAGE_SIZE = 9;

const ExploreItem = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get('category') || '';
  const tagsFromQuery = searchParams.getAll('tags') || [];
  const currentPage = Number(searchParams.get('page') || '0');
  const sortFromQuery = searchParams.get('sort');
  const sortType: PlaceSortType = isPlaceSortType(sortFromQuery)
    ? sortFromQuery
    : DEFAULT_PLACE_SORT;
  const [isPartnershipButtonOn, setIsPartnershipButtonOn] = useState(false);
  const prevCategory = useRef(categoryFromQuery);
  const prevTags = useRef(tagsFromQuery.join(','));
  const prevPartnership = useRef(isPartnershipButtonOn);

  const { coords, status: locationStatus, requestLocation } = useUserLocation();
  const isDistanceSort = sortType === PLACE_SORT_TYPES.DISTANCE;

  useEffect(() => {
    if (isDistanceSort && locationStatus === 'idle') requestLocation();
  }, [isDistanceSort, locationStatus, requestLocation]);

  useEffect(() => {
    if (!isDistanceSort || locationStatus !== 'error') return;

    toast.error('위치 정보를 가져올 수 없어 기본 정렬로 변경했어요.');
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('sort');
        newParams.delete('page');
        return newParams;
      },
      { replace: true },
    );
  }, [isDistanceSort, locationStatus]);

  useEffect(() => {
    const categoryChanged = prevCategory.current !== categoryFromQuery;
    const tagsChanged = prevTags.current !== tagsFromQuery.join(',');
    const partnershipChanged =
      prevPartnership.current !== isPartnershipButtonOn;

    prevCategory.current = categoryFromQuery;
    prevTags.current = tagsFromQuery.join(',');
    prevPartnership.current = isPartnershipButtonOn;

    if (categoryChanged || tagsChanged || partnershipChanged) {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete('page');
          return newParams;
        },
        { replace: true },
      );
    }
  }, [categoryFromQuery, tagsFromQuery.join(','), isPartnershipButtonOn]);

  const { data, isLoading } = useFilteredPlaces({
    category: categoryFromQuery,
    tags: tagsFromQuery,
    isPartnershipOnly: isPartnershipButtonOn,
    sortType,
    coords,
    page: currentPage,
    size: PAGE_SIZE,
  });
  const { isFavorite, handleToggleFavorite } = useFavorites();

  const filteredPlaces = data?.places || [];
  const pageInfo = data?.pageInfo;

  const handleTag = (tagName: string) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        const currentTags = new Set(newParams.getAll('tags'));

        if (currentTags.has(tagName)) {
          currentTags.delete(tagName);
        } else {
          currentTags.add(tagName);
        }

        newParams.delete('tags');
        currentTags.forEach((tag) => newParams.append('tags', tag));
        return newParams;
      },
      { replace: true },
    );
  };

  const handleSortChange = (newSortType: PlaceSortType) => {
    if (newSortType === PLACE_SORT_TYPES.DISTANCE && !coords) {
      requestLocation();
    }

    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        if (newSortType === DEFAULT_PLACE_SORT) {
          newParams.delete('sort');
        } else {
          newParams.set('sort', newSortType);
        }
        newParams.delete('page');
        return newParams;
      },
      { replace: true },
    );
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        if (newPage === 0) {
          newParams.delete('page');
        } else {
          newParams.set('page', String(newPage));
        }
        return newParams;
      },
      { replace: true },
    );
  };

  const isPlacesLoading =
    isLoading || (isDistanceSort && !coords && locationStatus !== 'error');

  if (isPlacesLoading) {
    return <Spinner />;
  }

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
        <ul className="flex min-w-0 flex-1 flex-nowrap gap-2 overflow-x-auto px-2 whitespace-nowrap">
          {tagsFromQuery.map((tag) => (
            <TagButton
              key={tag}
              size="middle"
              className="flex cursor-pointer items-center justify-center gap-3 px-1"
              onClick={() => handleTag(tag)}
            >
              {tag}
              <span>X</span>
            </TagButton>
          ))}
        </ul>
        <SortSelector
          value={sortType}
          onChange={handleSortChange}
          isLocating={locationStatus === 'loading'}
        />
      </div>
      <div className="mb-10 flex w-full border border-gray-100" />
      <div className="mx-auto flex max-w-6xl">
        <div className="flex grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlaces.map((place) => (
            <PlaceItemCard
              key={place.placeId}
              placeInfo={place}
              className="w-full"
              isFavorite={isFavorite(place.placeId)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>

      {pageInfo && pageInfo.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-1">
          <button
            className="flex h-9 w-9 items-center justify-center rounded text-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lsaquo;
          </button>
          {getPageNumbers(currentPage, pageInfo.totalPages).map((item, idx) =>
            item === 'ellipsis' ? (
              <span
                key={`ellipsis-${idx}`}
                className="flex h-9 w-9 items-center justify-center text-sm text-gray-400"
              >
                &middot;&middot;&middot;
              </span>
            ) : (
              <button
                key={item}
                className={`flex h-9 w-9 items-center justify-center rounded text-sm font-semibold ${
                  currentPage === item
                    ? 'bg-[#8BE34A] text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => handlePageChange(item as number)}
              >
                {item + 1}
              </button>
            ),
          )}
          <button
            className="flex h-9 w-9 items-center justify-center rounded text-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
            disabled={!pageInfo.hasNext}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &rsaquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreItem;
