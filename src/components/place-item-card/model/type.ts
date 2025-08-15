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
  mainPhotoUrl: string;
  categories: PlaceCategory[];
  tags: PlaceTag[];
}

export interface PlaceItemCardProps {
  placeInfo: PlaceInfo;
}
