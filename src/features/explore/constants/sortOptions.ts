import type { PlaceSortType } from '../../../types/type';

export const PLACE_SORT_TYPES = {
  REVIEW_COUNT: 'REVIEW_COUNT',
  RATING: 'RATING',
  VIEW_COUNT: 'VIEW_COUNT',
  DISTANCE: 'DISTANCE',
} as const;

export const DEFAULT_PLACE_SORT: PlaceSortType = PLACE_SORT_TYPES.REVIEW_COUNT;

export const PLACE_SORT_OPTIONS: { value: PlaceSortType; label: string }[] = [
  { value: PLACE_SORT_TYPES.REVIEW_COUNT, label: '리뷰 많은 순' },
  { value: PLACE_SORT_TYPES.RATING, label: '별점 순' },
  { value: PLACE_SORT_TYPES.VIEW_COUNT, label: '조회수 많은 순' },
  { value: PLACE_SORT_TYPES.DISTANCE, label: '거리순' },
];

export const isPlaceSortType = (
  value?: string | null,
): value is PlaceSortType => !!value && Object.hasOwn(PLACE_SORT_TYPES, value);

export const getPlaceSortLabel = (sortType: PlaceSortType) =>
  PLACE_SORT_OPTIONS.find((option) => option.value === sortType)?.label ?? '';
