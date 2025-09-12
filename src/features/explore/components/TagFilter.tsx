import { useEffect, useState } from 'react';
import { useTag } from '../../../hooks/useTag';
import type { CategoryProps, TagProps } from '../../../types/type';
import { fetchCategories, fetchCategoryTags } from '../apis/filterApi';
import TagButton from '../../../components/share/TagButton';
import { useLocation } from 'react-router-dom';

const TagFilter = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryName = params.get('category');
  const { selectedTags, toggleTag } = useTag();
  const [tags, setTags] = useState<TagProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetchCategories();
      setCategories(res.data || []);
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    if (!categoryName || categories.length === 0) return;

    const matchedCategory = categories.find(
      (category) => category.categoryName === categoryName,
    );

    const fetchTag = async (id?: number) => {
      const res = await fetchCategoryTags(id);
      setTags(res.data || []);
    };

    if (!matchedCategory) {
      fetchTag();
      return;
    }

    fetchTag(matchedCategory.categoryId);
  }, [categoryName, categories]);

  const isSelected = (tag: TagProps) => {
    return selectedTags.some((selectedTag) => selectedTag.tagId === tag.tagId);
  };

  const handleTagClick = (tag: TagProps) => {
    toggleTag(tag);
  };

  return (
    <div className="mt-[-1px] flex w-full flex-wrap gap-2 rounded-tr-md rounded-b-md border border-[#dadada] bg-[#F7F5F5] p-10">
      {tags.map((tag) => (
        <TagButton
          key={tag.tagId}
          size="large"
          onClick={() => handleTagClick(tag)}
          className={`transition-property cursor-pointer duration-200 ${isSelected(tag) ? 'opacity-100' : 'opacity-50'} `}
        >
          {tag.tagName}
        </TagButton>
      ))}
    </div>
  );
};

export default TagFilter;
