import { useEffect, useState } from 'react';
import { useTag } from '../../../hooks/useTag';
import type { TagProps } from '../model/type';
import { fetchCategoryTags } from '../apis/filterApi';
import { useCategory } from '../../../hooks/useCategory';
import TagButton from '../../../components/share/TagButton';

const TagFilter = () => {
  const { selectedCategory } = useCategory();
  const { selectedTags, toggleTag } = useTag();
  const [tags, setTags] = useState<TagProps[]>([]);

  useEffect(() => {
    const fetchTag = async () => {
      if (selectedCategory?.categoryId) {
        const res = await fetchCategoryTags(selectedCategory.categoryId);
        setTags(res.data);
      }
    };

    fetchTag();
  }, []);

  const isSelected = (tag: TagProps) => {
    return selectedTags.some((selectedTag) => selectedTag.tagId === tag.tagId);
  };

  const handleTagClick = (tag: TagProps) => {
    toggleTag(tag);
  };

  return (
    <div className="mt-[-1px] flex w-full gap-2 rounded-tr-md rounded-b-md border border-[#dadada] bg-[#F7F5F5] p-10">
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
