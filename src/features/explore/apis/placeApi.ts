import type { Coordinates, Place, PlaceSortType } from '../../../types/type';
import { api } from '../../../api/api';
import { PLACE_SORT_TYPES } from '../constants/sortOptions';

export interface FetchFilteredPlacesParams {
  category: string;
  tags: string[];
  isPartnershipOnly: boolean;
  sortType: PlaceSortType;
  coords: Coordinates | null;
  keyword: string;
  page: number;
  size: number;
}

// 필터된 장소 api
export const fetchFilteredPlaces = async ({
  category,
  tags,
  isPartnershipOnly,
  sortType,
  coords,
  keyword,
  page,
  size,
}: FetchFilteredPlacesParams): Promise<Place> => {
  try {
    const params = new URLSearchParams();
    params.append('category', category);

    tags.forEach((tag) => params.append('tags', tag));

    params.append('partnershipOnly', String(isPartnershipOnly));

    params.append('sortType', sortType);

    if (sortType === PLACE_SORT_TYPES.DISTANCE && coords) {
      params.append('latitude', String(coords.latitude));
      params.append('longitude', String(coords.longitude));
    }

    params.append('page', String(page));
    params.append('size', String(size));

    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) params.append('keyword', trimmedKeyword);

    const response = await api.get(`/api/places?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('필터된 장소 조회 실패:', error);
    throw error;
  }
};
