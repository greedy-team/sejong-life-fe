import type { Tag } from '../../../types/type';
import { api } from '../../../api/api';

export const fetchTagList = async (): Promise<Tag> => {
  try {
    const response = await api.get('/api/tags');
    return response.data;
  } catch (error) {
    console.error('태그 조회 실패:', error);
    throw error;
  }
};
