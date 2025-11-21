import { useEffect, useState, useRef } from 'react';
import type { CategoryProps, TagProps } from '../../../types/type';
import { fetchCategories, fetchCategoryTags } from '../apis/filterApi';
import TagButton from '../../../components/share/TagButton';
import { useLocation, useNavigate } from 'react-router-dom';

const TagFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const categoryName = params.get('category');
  const [tags, setTags] = useState<TagProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isBottom, setIsBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const updateQueryParams = (newSelectedTags: TagProps[]) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.delete('tags');
    newSelectedTags.forEach((tag) => {
      searchParams.append('tags', tag.tagName);
    });

    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const toggleTag = (tag: TagProps) => {
    const searchParams = new URLSearchParams(location.search);
    const tagsFromQuery = new Set(searchParams.getAll('tags'));

    if (tagsFromQuery.has(tag.tagName)) {
      tagsFromQuery.delete(tag.tagName);
    } else {
      tagsFromQuery.add(tag.tagName);
    }

    const newSelectedTags = tags.filter((t) => tagsFromQuery.has(t.tagName));
    updateQueryParams(newSelectedTags);
  };

  const isSelected = (tag: TagProps) => {
    const searchParams = new URLSearchParams(location.search);
    const tagsFromQuery = searchParams.getAll('tags');
    return tagsFromQuery.includes(tag.tagName);
  };

  const handleTagClick = (tag: TagProps) => {
    toggleTag(tag);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    setIsBottom(atBottom);
  };

  return (
    <div className="relative m-auto w-[85%] rounded-md">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="m-auto flex max-h-[10rem] flex-wrap justify-center gap-1.5 overflow-y-scroll"
      >
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
        <div
          className={`pointer-events-none absolute bottom-0 left-0 h-30 w-full bg-gradient-to-t from-white to-transparent transition-opacity duration-300 ${
            isBottom ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
};

export default TagFilter;
