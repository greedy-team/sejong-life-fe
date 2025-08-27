import PhotoStrip from './PhotoStrip';
import PlaceInfo from './PlaceInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewStats from './ReviewStats';
import ReviewCard from './place-review-card/ReviewCard';
import ReviewWriteButton from './ReviewWriteButton';

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
  const [reviews, setReviews] = useState<Review[] | []>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPlaceAndReviewDetail = async () => {
      try {
        const placeRes = await axios.get(`/sejonglife/api/places/${id}`);
        setPlace(placeRes.data.data);

        const reviewRes = await axios.get(
          `/sejonglife/api/places/${id}/reviews`,
        );
        setReviews(reviewRes.data.data);
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

  if (!place || reviews.length === 0) return <div>로딩중...</div>;

  return (
    <main className="mx-auto mt-12 flex h-[50rem] min-h-[50rem] w-[90%] max-w-[62.5rem] flex-col items-center gap-10 overflow-y-auto rounded-2xl bg-white shadow-lg">
      <PhotoStrip images={place.images} />
      <PlaceInfo place={place} />
      <ReviewWriteButton placeName={place.placeName} />
      <ReviewStats />
      {reviews.map((review) => (
        <ReviewCard key={review.reviewId} review={review} />
      ))}
    </main>
  );
};

export default PlaceDetailContainer;
