import type { PlaceLookUpItemResponseProps } from '../../../types/type';

type Props = {
  items: PlaceLookUpItemResponseProps[];
  onClose: () => void;
  onSelect: (place: PlaceLookUpItemResponseProps) => void;
};

export default function PlaceLookUpModal({ items, onClose, onSelect }: Props) {
  if (items.length === 0) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
        <div className="absolute top-full right-0 left-0 z-50 mt-2 rounded-lg border bg-white p-3 text-sm">
          검색 결과가 없어요
          <button type="button" className="ml-2 underline" onClick={onClose}>
            닫기
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-80 overflow-auto rounded-lg border bg-white shadow">
        <ul>
          {items.map((place) => (
            <li key={place.id}>
              <button
                type="button"
                onClick={() => onSelect(place)}
                className="w-full cursor-pointer px-3 py-2 text-left hover:bg-gray-50"
              >
                <div className="font-medium">{place.name}</div>
                <div className="text-xs text-gray-500">{place.address}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
