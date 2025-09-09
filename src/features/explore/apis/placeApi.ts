import { api } from '../../../api/api';
import type { CategoryProps, Place, TagProps } from '../../../types/type';

// 필터된 장소 api
export const fetchFilteredPlaces = async (
  selectedCategory: CategoryProps,
  selectedTags: TagProps[],
): Promise<Place> => {
  const params = new URLSearchParams();
  params.append('category', String(selectedCategory.categoryId));

  if (selectedTags.length > 0) {
    const tagNames = selectedTags.map((tag) => tag.tagName).join(',');
    params.append('tags', tagNames);
  }

  const response = await api.get(`/api/places?${params.toString()}`);
  return response.data;
};
