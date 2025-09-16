import CategoryFilter from './CategoryFilter';
import TagFilter from './TagFilter';

const Filter = () => {
  return (
    <div className="flex flex-col gap-7">
      <CategoryFilter />
      <TagFilter />
    </div>
  );
};

export default Filter;
