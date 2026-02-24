export interface PlaceCategory {
  categoryId: number;
  categoryName: string;
}

export interface PlaceTag {
  tagId: number;
  tagName: string;
}

export interface PlaceInfo {
  placeId: number;
  placeName: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  mainImageUrl: string;
  categories: PlaceCategory[];
  tags: PlaceTag[];
  viewCount: number;
  reviewCount: number;
  isPartnership: boolean;
  partnershipContent?: string;
}

// PlaceItemCardProps -> HotPlaceApiResponse
export interface HotPlaceApiResponse {
  message: string;
  data: PlaceInfo[];
}
