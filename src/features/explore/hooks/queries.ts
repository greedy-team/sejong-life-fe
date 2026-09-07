import { useQuery } from '@tanstack/react-query';
import type {
  Category,
  CategoryProps,
  PageInfo,
  Place,
  PlaceProps,
  Tag,
  TagProps,
} from '../../../types/type';
import { queryKeys } from '../../../lib/query/queryKeys';
import { fetchCategories, fetchCategoryTags } from '../apis/filterApi';
import {
  fetchFilteredPlaces,
  type FetchFilteredPlacesParams,
} from '../apis/placeApi';
import { DEFAULT_PLACE_SORT, PLACE_SORT_TYPES } from '../constants/sortOptions';

export const useCategoryLists = () => {
  return useQuery<Category, Error, CategoryProps[]>({
    queryKey: queryKeys.categories.all,
    queryFn: () => fetchCategories(),
    select: (data) => [{ categoryId: 0, categoryName: '전체' }, ...data.data],
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useCategoryTagLists = (categoryId?: number) => {
  return useQuery<Tag, Error, TagProps[]>({
    queryKey: categoryId
      ? [...queryKeys.tags.all, categoryId]
      : queryKeys.tags.all,
    queryFn: () => fetchCategoryTags(categoryId),
    select: (data) => data.data || [],
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

type UseFilteredPlacesParams = Partial<FetchFilteredPlacesParams> &
  Pick<FetchFilteredPlacesParams, 'category' | 'page' | 'size'>;

export const useFilteredPlaces = ({
  category,
  tags = [],
  isPartnershipOnly = false,
  sortType = DEFAULT_PLACE_SORT,
  coords = null,
  keyword = '',
  page,
  size,
}: UseFilteredPlacesParams) => {
  const needsCoords = sortType === PLACE_SORT_TYPES.DISTANCE;
  const effectiveCoords = needsCoords ? coords : null;

  const params: FetchFilteredPlacesParams = {
    category,
    tags,
    isPartnershipOnly,
    sortType,
    coords: effectiveCoords,
    keyword,
    page,
    size,
  };

  return useQuery<Place, Error, { places: PlaceProps[]; pageInfo: PageInfo }>({
    queryKey: queryKeys.places.list(params),
    queryFn: () => fetchFilteredPlaces(params),
    select: (data) => ({
      places: data.data?.places || [],
      pageInfo: data.data?.page,
    }),
    enabled: !!category && (!needsCoords || !!coords),
    staleTime: 5 * 60 * 1000,
  });
};
