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
    // 아이콘과 라벨을 absolute로 모서리에 붙이면 여백을 네 군데서 따로
    // 맞춰야 해서 button의 p-2가 실제로는 아무 역할도 못 했다.
    // flex + padding으로 바꿔 안쪽 여백을 한 곳에서 정한다.
    <button
      onClick={() => handleMenuClick(to)}
      // 4열 그리드의 칸을 채우되 max-w-22(88px)에서 멈춘다. 상한이 없으면
      // 화면 폭을 따라 카드만 계속 커지고 아이콘은 그대로라 비율이 깨진다.
      className="flex aspect-square w-full max-w-22 cursor-pointer flex-col justify-between rounded-2xl border-none bg-gray-100 px-2 py-2.5 text-left transition-all duration-200 ease-in-out active:scale-95 sm:py-3 sm:hover:scale-105 sm:hover:bg-gray-200"
    >
      {icon && (
        <img src={icon} alt="" className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
      )}
      {/* 가장 긴 "생활/문화"가 14px에서 약 60px다. 세로 여백은 아이콘과
          라벨 간격이라 그대로 두고, 가로만 8px로 좁혀 글자 자리를 준다. */}
      <div className="truncate text-sm sm:text-base">{children}</div>
    </button>
  );
};

export default PageRouterButton;
