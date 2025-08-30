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

export interface TagProps {
  tagId: number;
  tagName: string;
}

export interface Tag {
  message: string;
  data: TagProps[];
}

export type Review = {
  reviewId: number;
  userId: number;
  studentId: number;
  rating: number;
  content: string;
  likeCount: number;
  createdAt: string;
  images: string[];
  tags: { tagId: number; tagName: string }[];
};

export type ReviewStatsProps = {
  reviewCount: number;
  averageRate: number;
  ratingDistribution: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
};
