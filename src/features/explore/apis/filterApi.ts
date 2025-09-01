import api from '../../../api/api';
import type { Category, Tag } from '../../../types/type';

// 카테고리 api
export const fetchCategories = async (): Promise<Category> => {
  const response = await api.get('/api/categories');
  return response.data;
};

// 카테고리별 태그 api
export const fetchCategoryTags = async (categoryId: number): Promise<Tag> => {
  const response = await api.get(`tags/${categoryId}`);
  return response.data;
};
