import { useEffect, useRef, useState } from 'react';

function OpenCountInfoButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      <button
        type="button"
        onClick={handleToggle}
        aria-label="열람권 안내"
        aria-expanded={isOpen}
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-[10px] leading-none font-bold text-gray-400"
      >
        i
      </button>
      {isOpen && (
        <div
          role="tooltip"
          className="absolute top-6 left-0 z-20 w-60 rounded-xl bg-white p-3 text-xs leading-relaxed text-gray-500 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        >
          <p>· 1시간마다 기본 열람권 1개 제공</p>
          <p>· 친구 초대 시 보너스 열람권 1개 추가</p>
        </div>
      )}
    </div>
  );
}

export default OpenCountInfoButton;
