import { useEffect, useRef, useState } from 'react';
import type { PlaceSortType } from '../../../types/type';
import {
  PLACE_SORT_OPTIONS,
  PLACE_SORT_TYPES,
  getPlaceSortLabel,
} from '../constants/sortOptions';

interface SortSelectorProps {
  value: PlaceSortType;
  onChange: (sortType: PlaceSortType) => void;
  isLocating?: boolean;
}

const SortSelector = ({
  value,
  onChange,
  isLocating = false,
}: SortSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (sortType: PlaceSortType) => {
    setIsOpen(false);
    if (sortType !== value) onChange(sortType);
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="정렬 기준 선택"
        className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold whitespace-nowrap text-[#354052] transition-colors duration-100 hover:bg-gray-50"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{getPlaceSortLabel(value)}</span>
        {isLocating && value === PLACE_SORT_TYPES.DISTANCE && (
          <span className="text-xs font-normal text-gray-400">
            위치 확인 중
          </span>
        )}
        <span
          aria-hidden="true"
          className={`text-[10px] text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="정렬 기준"
          className="absolute right-0 z-30 mt-1 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          {PLACE_SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`w-full cursor-pointer px-3 py-2 text-left text-sm whitespace-nowrap transition-colors duration-100 hover:bg-gray-100 ${
                  option.value === value
                    ? 'font-semibold text-[#8BE34A]'
                    : 'text-[#354052]'
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortSelector;
