import type { Place } from '../../../types/type';
import { api } from '../../../api/api';

// 필터된 장소 api
export const fetchFilteredPlaces = async (
  selectedCategory: string,
  selectedTags: string[],
  isPartnershipOnly: boolean = false,
  page: number = 1,
  size: number = 9,
): Promise<Place> => {
  try {
    const params = new URLSearchParams();
    params.append('category', selectedCategory);

    selectedTags.forEach((tag) => params.append('tags', tag));

    params.append('partnershipOnly', String(isPartnershipOnly));

    params.append('page', String(page));
    params.append('size', String(size));

    const response = await api.get(`/api/places?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('필터된 장소 조회 실패:', error);
    throw error;
  }
};
