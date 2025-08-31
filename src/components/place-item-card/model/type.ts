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

export interface PlaceItemCardProps {
  message: string;
  placeInfo: PlaceInfo[];
}
