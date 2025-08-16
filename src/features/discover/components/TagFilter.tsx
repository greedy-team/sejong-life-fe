import { useEffect, useState } from 'react';
import { useTag } from '../../../hooks/useTag';
import type { TagProps } from '../model/type';
import { fetchCategoryTags } from '../apis/filterApi';
import { useCategory } from '../../../hooks/useCategory';

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
    <ul>
      {tags.map((tag) => (
        <li
          key={tag.tagId}
          onClick={() => handleTagClick(tag)}
          className={` ${isSelected(tag) ? 'opacity-100' : 'opacity-30'} `}
        >
          {tag.tagName}
        </li>
      ))}
    </ul>
  );
};

export default TagFilter;
