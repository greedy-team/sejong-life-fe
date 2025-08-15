import api from '../../../api/api';
import type { Category } from '../model/type';

// 카테고리 api
const fetchCategories = async (): Promise<Category> => {
  const response = await api.get('/categories');
  return response.data;
};

export default fetchCategories;
