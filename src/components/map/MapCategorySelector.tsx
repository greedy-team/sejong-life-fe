import type { CategoryProps } from '../../types/type';
import { useCategoryLists } from '../../features/explore/hooks/queries';

type Props = {
  selectedCategory: string;
  onSelect: (categoryName: string) => void;
};

const CATEGORY_ICONS: Record<string, string> = {
  전체: '/asset/pageRouterButton/allItemIcon.svg',
  '생활/문화': '/asset/pageRouterButton/lifeIcon.svg',
  쇼핑: '/asset/pageRouterButton/shoppingIcon.svg',
  식당: '/asset/pageRouterButton/restaurantIcon.svg',
  여가: '/asset/pageRouterButton/leisureIcon.svg',
  카페: '/asset/pageRouterButton/cafeIcon.svg',
};

export default function MapCategorySelector({
  selectedCategory,
  onSelect,
}: Props) {
  const { data: categories } = useCategoryLists();

  if (!categories) return null;

  return (
    <div className="fixed top-23 left-1/2 z-50 flex -translate-x-1/2 gap-2 sm:top-27">
      {categories.map((category: CategoryProps) => {
        const isSelected = selectedCategory === category.categoryName;
        const iconSrc = CATEGORY_ICONS[category.categoryName];
        return (
          <button
            key={category.categoryId}
            onClick={() => onSelect(category.categoryName)}
            className={`flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-full shadow-md transition-all active:scale-95 sm:h-auto sm:w-auto sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-5 sm:py-2.5 ${
              isSelected
                ? 'border-[#7cd23f] bg-[#8BE34A]'
                : 'border-gray-100 bg-white text-gray-700 backdrop-blur-xl'
            }`}
          >
            {iconSrc && (
              <img
                src={iconSrc}
                alt={category.categoryName}
                className="h-5 w-5"
              />
            )}
            <span className="hidden text-xs font-semibold whitespace-nowrap sm:inline">
              {category.categoryName}
            </span>
          </button>
        );
      })}
    </div>
  );
}
