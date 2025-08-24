import type { ReactNode } from 'react';

interface TagButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: string;
}

const TagButton = ({
  children,
  onClick,
  className = '',
  size = 'small',
}: TagButtonProps) => {
  let sizeStyle = 'px-3 py-0.5 text-[10px] font-semibold';

  if (size === 'large') {
    sizeStyle = 'px-6 py-1 text-xs font-bold';
  }

  if (size === 'middle') {
    sizeStyle = 'px-4 py-1 text-xs font-bold';
  }

  return (
    <button
      onClick={onClick}
      className={`w-fit cursor-pointer rounded-full border border-[#828282] bg-blue-200 text-[#70553D] select-none ${sizeStyle} ${className}`}
    >
      # {children}
    </button>
  );
};

export default TagButton;
