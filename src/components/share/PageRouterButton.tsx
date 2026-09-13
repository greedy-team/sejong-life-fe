import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CategoryProps } from '../../types/type';
import { useCategory } from '../../features/explore/hooks';

interface PageRouterButtonProps {
  category?: CategoryProps;
  children: ReactNode;
  to: string;
  icon?: string;
}

const PageRouterButton = ({
  category,
  children,
  to,
  icon,
}: PageRouterButtonProps) => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useCategory();

  const handleMenuClick = (to: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    navigate(to);
  };

  return (
    <button
      onClick={() => handleMenuClick(to)}
      // max-w-22가 없으면 카드만 화면 폭을 따라 커지고 아이콘은 그대로다
      className="flex aspect-square w-full max-w-22 cursor-pointer flex-col justify-between rounded-2xl border-none bg-gray-100 px-2 py-2.5 text-left transition-all duration-200 ease-in-out active:scale-95 sm:py-3 sm:hover:scale-105 sm:hover:bg-gray-200"
    >
      {icon && (
        <img src={icon} alt="" className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
      )}
      <div className="truncate text-sm sm:text-base">{children}</div>
    </button>
  );
};

export default PageRouterButton;
