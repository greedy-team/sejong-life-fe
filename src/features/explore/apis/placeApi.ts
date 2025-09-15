import type { Place } from '../../../types/type';
import { api } from '../../../api/api';

// 필터된 장소 api
export const fetchFilteredPlaces = async (
  selectedCategory: string,
  selectedTags: string[],
): Promise<Place> => {
  const params = new URLSearchParams();
  params.append('category', String(selectedCategory));

  if (selectedTags.length > 0) {
    const tagNames = selectedTags.map((tag) => tag).join(',');
    params.append('tags', tagNames);
  }

  const response = await api.get(`/api/places?${params.toString()}`);
  return response.data;
};
