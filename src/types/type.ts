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
  viewCount: number;
  reviewCount: number;
}

export interface Place {
  message: string;
  data: PlaceProps[];
}

export interface MapProps {
  naverMap: string;
  kakaoMap: string;
  googleMap: string;
}

export interface ImageProps {
  imageId: number;
  url: string;
}

export interface DetailPlaceProps {
  id: number;
  name: string;
  images: ImageProps[];
  categories: CategoryProps[];
  tags: TagProps[];
  viewCount: number;
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

export interface LoginPayload {
  sejongPortalId: string;
  sejongPortalPw: string;
}

export interface LoginResponseProps {
  accessToken: string;
  signUpToken: string;
  userInfo: {
    studentId: string;
    name: string;
  };
  newUser: boolean;
}

export interface LoginResponse {
  message: string;
  data: LoginResponseProps;
}
