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
  address?: string;
  latitude?: number;
  longitude?: number;
  mainImageUrl: string;
  categories: CategoryProps[];
  tags: TagProps[];
  viewCount: number;
  reviewCount: number;
  isPartnership: boolean;
  partnershipContent?: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface Place {
  message: string;
  data: {
    places: PlaceProps[];
    page: PageInfo;
  };
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
  isPartnership: boolean;
  partnershipContent: string;
}

export interface DetailPlace {
  message: string;
  data: DetailPlaceProps;
}

export type Review = {
  reviewId: number;
  userId: number;
  studentId: number;
  rating: number;
  liked: boolean;
  content: string;
  likeCount: number;
  createdAt: string;
  images: ImageProps[];
  tags: { tagId: number; tagName: string }[];
  isAuthor: boolean;
};

export type MyReview = {
  reviewId: number;
  rating: number;
  userId: number;
  userName: string;
  studentId: string;
  content: string;
  likeCount: number;
  createdAt: string;
  images: ImageProps[];
  tags: { tagId: number; tagName: string }[];
  isAuthor: boolean;
  place: { placeId: number; placeName: string }[];
};

export type ReviewStats = {
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

export interface UserProfileResponseProps {
  name: string;
  nickname: string;
  studentId: string;
  department: string;
  favoriteCount: number;
  reviewCount: number;
}
export interface UserProfileResponse {
  message: string;
  data: UserProfileResponseProps;
}

export interface PlaceLookUpItemResponseProps {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface PlaceLookUpItemResponse {
  message: string;
  data: PlaceLookUpItemResponseProps[];
}

export interface PlaceUrlResponseProps {
  kakaoUrl: string;
  naverUrl: string;
  googleUrl: string;
}

export interface PlaceUrlResponse {
  message: string;
  data: PlaceUrlResponseProps;
}
