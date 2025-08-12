import { getCategories } from './handler/CategoryEndpoints';
import { getPlaces, getPlaceDetails } from './handler/PlaceEndpoints';
import { getTags, getCategoryTags } from './handler/TagEndPoints';

export const handlers = [
  getCategories,
  getPlaces,
  getPlaceDetails,
  getTags,
  getCategoryTags,
];
