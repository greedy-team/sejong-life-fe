export interface CategoryProps {
  categoryId: number;
  categoryName: string;
}

export interface Category {
  message: string;
  data: CategoryProps[];
}

export interface TagProps {
  tagId: number;
  tagName: string;
}

export interface Tag {
  message: string;
  data: TagProps[];
}

export interface PlaceProps {
  placeId: number;
  placeName: string;
  mainImageUrl: string;
  categories: CategoryProps[];
  tags: TagProps[];
}

export interface Place {
  message: string;
  data: PlaceProps[];
}

export interface MapProps {
  naverMap: string;
  kakoaMap: string;
  googleMap: string;
}

export interface DetailPlaceProps {
  placeId: number;
  placeName: string;
  images: string[];
  categories: CategoryProps[];
  tags: TagProps[];
  mapLinks: MapProps;
}

export interface DetailPlace {
  message: string;
  data: DetailPlaceProps;
}
