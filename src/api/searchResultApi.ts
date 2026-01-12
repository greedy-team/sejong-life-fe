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
  if (!trimmed) return [];

  try {
    const response = await api.get('/api/places', {
      params: {
        category,
        keyword: trimmed,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('검색 실패', error);
    return [];
  }
};
