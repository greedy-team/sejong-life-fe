import type { CategoryProps } from '../model/type';

interface Category {
  categories: CategoryProps[];
}

const CategoryFilter = ({ categories }: Category) => {
  return (
    <ul className="flex">
      {categories.map((category) => (
        <li className="flex h-[46px] w-[145px] cursor-pointer items-center justify-center rounded-t-2xl border border-[#dadada] bg-[#F7F5F5] font-bold hover:bg-[#fafafa]">
          {category.categoryName}
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
