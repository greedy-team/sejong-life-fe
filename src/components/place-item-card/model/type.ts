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
  mainImageUrl: string;
  categories: PlaceCategory[];
  tags: PlaceTag[];
}

// PlaceItemCardProps -> HotPlaceApiResponse
export interface HotPlaceApiResponse {
  message: string;
  data: PlaceInfo[];
}
