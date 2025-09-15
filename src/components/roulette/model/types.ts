export type Place = { name: string; id?: number };

export interface RouletteProps {
  items: Place[];
  colors: string[];
}

export interface CategorySelectorProps {
  restaurants: Place[];
  cafes: Place[];
  allPlaces: Place[];
  isLoading: boolean;
  error: string | null;
  onToggleItem: (item: Place) => void;
  currentItems: Place[];
}

export interface AllPlacesResponse {
  places: {
    placeId: number;
    placeName: string;
  }[];
}
