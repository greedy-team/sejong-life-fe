import { getCategories } from './handler/CategoryEndpoints';
import { getPlaces, getPlaceDetails } from './handler/PlaceEndpoints';
import { getReviewStats } from './handler/ReviewEndpoints';
import { getTags, getCategoryTags } from './handler/TagEndPoints';
import { getReviewDetail } from './handler/ReviewEndpoints';
import {
  getMeetingProfiles,
  getMeetingOpenCount,
  postMeetingSignup,
  openMeetingCard,
} from './handler/MeetingEndpoints';

export const handlers = [
  getCategories,
  getPlaces,
  getPlaceDetails,
  getTags,
  getCategoryTags,
  getReviewStats,
  getReviewDetail,
  getMeetingProfiles,
  getMeetingOpenCount,
  postMeetingSignup,
  openMeetingCard,
];
