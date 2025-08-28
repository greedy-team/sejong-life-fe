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
  let sizeStyle = 'px-4 py-2 text-[10px] font-semibold';

  if (size === 'large') {
    sizeStyle = 'px-4 py-2 text-xs font-bold';
  }

  if (size === 'middle') {
    sizeStyle = 'px-4 py-2 text-xs font-bold';
  }

  return (
    <button
      onClick={onClick}
      className={`w-fit cursor-pointer rounded-full bg-[#F3F4F5] text-[#2C3037] select-none hover:bg-[#EEEFF1] ${sizeStyle} ${className}`}
    >
      # {children}
    </button>
  );
};

export default TagButton;
