import type { Tag } from '../types/type';
import api from './api';

export const fetchTagList = async (): Promise<Tag> => {
  const response = await api.get('/tags');
  return response.data;
};
