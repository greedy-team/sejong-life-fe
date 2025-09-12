import { useEffect, useState } from 'react';
import type { CategoryProps, TagProps } from '../../../types/type';
import { fetchCategories, fetchCategoryTags } from '../apis/filterApi';
import TagButton from '../../../components/share/TagButton';
import { useLocation, useNavigate } from 'react-router-dom';

const TagFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const categoryName = params.get('category');
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);
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

    if (!matchedCategory) return;

    const fetchTag = async () => {
      const res = await fetchCategoryTags(matchedCategory.categoryId);
      setTags(res.data || []);
    };

    fetchTag();
  }, [categoryName, categories]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagsFromQuery = params.getAll('tags');

    const newSelectedTags = tags.filter((tag) =>
      tagsFromQuery.includes(tag.tagName),
    );

    setSelectedTags(newSelectedTags);
  }, [location.search, tags]);

  const updateQueryParams = (newSelectedTags: TagProps[]) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.delete('tags');

    newSelectedTags.forEach((tag) => {
      searchParams.append('tags', tag.tagName);
    });

    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const toggleTag = (tag: TagProps) => {
    setSelectedTags((prevTags) => {
      const isSelected = prevTags.some((t) => t.tagId === tag.tagId);

      const newSelectedTags = isSelected
        ? prevTags.filter((t) => t.tagId !== tag.tagId)
        : [...prevTags, tag];

      updateQueryParams(newSelectedTags);
      return newSelectedTags;
    });
  };

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
