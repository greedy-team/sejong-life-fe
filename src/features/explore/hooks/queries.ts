import { useQuery } from '@tanstack/react-query';
import type {
  Category,
  CategoryProps,
  Place,
  PlaceProps,
  Tag,
  TagProps,
} from '../../../types/type';
import { queryKeys } from '../../../lib/query/queryKeys';
import { fetchCategories, fetchCategoryTags } from '../apis/filterApi';
import { fetchFilteredPlaces } from '../apis/placeApi';

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

export const useFilteredPlaces = (
  category: string,
  tags: string[],
  isPartnershipOnly: boolean,
) => {
  return useQuery<Place, Error, PlaceProps[]>({
    queryKey: queryKeys.places.list(
      `${category}-${tags.join(',')}-${isPartnershipOnly}`,
    ),
    queryFn: () => fetchFilteredPlaces(category, tags),
    select: (data) => {
      const places = data.data || [];
      if (isPartnershipOnly) {
        return places.filter((place) => place.isPartnership);
      }
      return places;
    },
    enabled: !!category && !!tags,
    staleTime: 5 * 60 * 1000,
  });
};
