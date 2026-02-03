import { api } from './api';

type SearchParams = {
  keyword: string;
  category?: string;
};

export const fetchSearchResult = async ({
  keyword,
  category = '전체',
}: SearchParams) => {
  const trimmed = keyword.trim();

  try {
    const params: Record<string, string> = { category };
    if (trimmed) params.keyword = trimmed;

    const response = await api.get('/api/places', { params });
    return response.data.data ?? [];
  } catch (error) {
    console.error('검색 실패', error);
    return [];
  }
};
