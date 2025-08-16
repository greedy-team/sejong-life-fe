import api from '../../../api/api';
import type { Category, Tag } from '../model/type';

// 카테고리 api
export const fetchCategories = async (): Promise<Category> => {
  const response = await api.get('/categories');
  return response.data;
};

// 카테고리병 태그 api
export const fetchCategoryTags = async (categoryId: number): Promise<Tag> => {
  const response = await api.get(`/tags/${categoryId}`);
  return response.data;
};
