import type { PlaceInfo } from '../../place-item-card/model/type';

export interface ItemContainerProps {
  title: string;
  items: PlaceInfo[];
  iconSrc?: string;
}
