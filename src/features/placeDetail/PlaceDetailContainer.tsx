import PhotoStrip from './PhotoStrip';
import PlaceInfo from './PlaceInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from './place-review-card/ReviewCard';

export type PlaceDetail = {
  placeId: number;
  placeName: string;
  category: {
    categoryId: number;
    categoryName: string;
  };
  images: string[];
  tags: { tagId: number; tagName: string }[];
  mapLinks: {
    naverMap: string;
    kakaoMap: string;
    googleMap: string;
  };
};

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

const PlaceDetailContainer = () => {
  const [place, setPlace] = useState<PlaceDetail | null>(null);
  const [review, setReview] = useState<Review | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPlaceAndReviewDetail = async () => {
      try {
        const placeRes = await axios.get(`/sejonglife/api/places/${id}`);
        setPlace(placeRes.data.data);

        const reviewRes = await axios.get(
          `/sejonglife/api/places/${id}/reviews`,
        );
        setReview(reviewRes.data.data[0]);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    };
    fetchPlaceAndReviewDetail();
  }, [id]);

  if (!place || !review) return <div>로딩중...</div>;

  return (
    <main className="mx-auto my-16 flex h-[50rem] min-h-[50rem] w-[90%] max-w-[62.5rem] flex-col items-center gap-10 overflow-y-auto rounded-2xl bg-white shadow-lg">
      <PhotoStrip images={place.images} />
      <PlaceInfo place={place} />
      <ReviewCard review={review} />
    </main>
  );
};

export default PlaceDetailContainer;
