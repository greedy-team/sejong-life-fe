export const queryKeys = {
  places: {
    all: ['places'] as const,
    lists: () => [...queryKeys.places.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.places.lists(), filters] as const,
    details: () => [...queryKeys.places.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.places.details(), id] as const,
    hot: () => [...queryKeys.places.all, 'hot'] as const,
    partnershipMap: () =>
      [...queryKeys.places.all, 'map', 'partnership'] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    lists: () => [...queryKeys.reviews.all, 'list'] as const,
    list: (placeId: string) => [...queryKeys.reviews.lists(), placeId] as const,
    detail: (id: string) => [...queryKeys.reviews.all, id] as const,
  },
  categories: {
    all: ['categories'] as const,
  },
  tags: {
    all: ['tags'] as const,
  },
} as const;
