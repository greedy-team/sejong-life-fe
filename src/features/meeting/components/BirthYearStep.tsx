import { useRef, useEffect, useState } from 'react';
import { CURRENT_YEAR } from '../constants/meetingConstants';
const MIN_YEAR = 1980;
const MAX_YEAR = 2008;
const ITEM_HEIGHT = 56;
const VISIBLE_ITEMS = 5;

const years = Array.from(
  { length: MAX_YEAR - MIN_YEAR + 1 },
  (_, index) => MAX_YEAR - index,
);

interface BirthYearStepProps {
  value: number;
  onChange: (year: number) => void;
}

function BirthYearStep({ value, onChange }: BirthYearStepProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [displayedYear, setDisplayedYear] = useState(value);

  const containerHeight = ITEM_HEIGHT * VISIBLE_ITEMS;
  const verticalPadding = ITEM_HEIGHT * 2;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const index = years.indexOf(value);
    if (index !== -1) {
      container.scrollTop = index * ITEM_HEIGHT;
    }
  }, []);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rawIndex = container.scrollTop / ITEM_HEIGHT;
    const nearestIndex = Math.round(rawIndex);
    const clampedIndex = Math.max(0, Math.min(nearestIndex, years.length - 1));
    const nearestYear = years[clampedIndex];

    if (nearestYear !== displayedYear) {
      setDisplayedYear(nearestYear);
    }

    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }
    scrollEndTimerRef.current = setTimeout(() => {
      container.scrollTo({
        top: clampedIndex * ITEM_HEIGHT,
        behavior: 'smooth',
      });
      onChange(years[clampedIndex]);
    }, 150);
  };

  return (
    <div className="flex w-full flex-col items-start gap-1 pb-1">
      <div className="flex w-full flex-col gap-1 pb-1">
        <h2 className="text-heading-1 text-shark">나이를 알려주세요</h2>
        <p className="text-body-regular text-jumbo">
          스크롤해서 나이를 선택하세요
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-3 pt-4">
        <div
          className="relative"
          style={{ width: 160, height: containerHeight }}
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            role="listbox"
            aria-label="출생년도"
            aria-activedescendant={`year-${displayedYear}`}
            className="dial-scroll w-full"
            style={{
              height: containerHeight,
              overflowY: 'scroll',
              scrollSnapType: 'y mandatory',
            }}
          >
            <div
              style={{
                paddingTop: verticalPadding,
                paddingBottom: verticalPadding,
              }}
            >
              {years.map((year) => (
                <div
                  key={year}
                  id={`year-${year}`}
                  role="option"
                  aria-selected={year === displayedYear}
                  className="flex items-center justify-center"
                  style={{ height: ITEM_HEIGHT, scrollSnapAlign: 'center' }}
                >
                  <span
                    className={`transition-[font-size,color] duration-100 ${
                      year === displayedYear
                        ? 'text-dial-selected text-mandy'
                        : 'text-dial-unselected text-jumbo-50'
                    }`}
                  >
                    {year}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="pointer-events-none absolute top-0 right-0 left-0"
            style={{
              height: verticalPadding,
              background:
                'linear-gradient(180deg, #FAFAFA 0%, rgba(250,250,250,0) 100%)',
              zIndex: 1,
            }}
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0"
            style={{
              height: verticalPadding,
              background:
                'linear-gradient(0deg, #FAFAFA 0%, rgba(250,250,250,0) 100%)',
              zIndex: 2,
            }}
          />
        </div>
        <span className="text-body-regular text-jumbo">
          {displayedYear}년도 생 ({CURRENT_YEAR - displayedYear}세)
        </span>
      </div>
    </div>
  );
}

export default BirthYearStep;
