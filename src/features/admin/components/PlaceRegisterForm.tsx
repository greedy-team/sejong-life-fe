import { useState, useEffect } from 'react';
import type { TagProps, CategoryProps } from '../../../types/type';
import { fetchCategories } from '../../explore/apis/filterApi';
import { fetchTagList } from '../../../api/tagApi';
import TagButton from '../../../components/share/TagButton';

const PlaceRegisterForm = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [tags, setTags] = useState<TagProps[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    content: '',
    tagIds: [] as number[],
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetchCategories();
      setCategories(res.data);
    };

    const fetchTags = async () => {
      const res = await fetchTagList();
      setTags(res.data);
    };

    fetchCategory();
    fetchTags();
  }, []);

  const handleSelectedTags = (tagId: number) => {
    setFormData((prev) => {
      const isTagSelected = prev.tagIds.includes(tagId);

      const newTagIds = isTagSelected
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId];

      return {
        ...prev,
        tagIds: newTagIds,
      };
    });
  };

  return (
    <div className="mx-auto w-[500px] py-10">
      <h1 className="flex w-full border-b py-10 text-4xl text-[#8BE24A]">
        장소등록
      </h1>
      <div className="mt-5 flex flex-col gap-7 px-7">
        <div className="flex flex-col gap-2">
          <div className="text-lg">장소명</div>
          <input
            className="x-2 rounded-lg border px-2 py-1 placeholder:text-sm"
            placeholder="장소명을 입력하세요"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg">카테고리</div>
          <div className="flex gap-4">
            {categories.map((category) => (
              <label
                key={category.categoryName}
                className="flex cursor-pointer items-center gap-1 text-base"
              >
                <input
                  type="radio"
                  name="category"
                  value={category.categoryName}
                  className="h-4 w-4 appearance-none rounded-full bg-[#EAEAEA] checked:border-none checked:bg-[#8BE34A]"
                ></input>
                {category.categoryName}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">제휴내용</div>
          <input
            className="rounded-lg border px-2 py-1 placeholder:text-sm"
            placeholder="제휴가 있다면 제휴내용을 입력하세요"
          ></input>
        </div>
        <div>
          <div className="text-lg">태그</div>
          <div className="custom-scroll max-h-40 space-y-2 overflow-auto rounded-md border border-gray-100 p-3 lg:space-x-3">
            {tags.map((tag) => {
              const isSelected = formData.tagIds.includes(tag.tagId);
              return (
                <TagButton
                  key={tag.tagId}
                  size="large"
                  onClick={() => handleSelectedTags(tag.tagId)}
                  className={isSelected ? 'opacity-100' : 'opacity-60'}
                >
                  {tag.tagName}
                </TagButton>
              );
            })}
          </div>
        </div>
        <div>
          <div className="text-lg">이미지</div>
        </div>
      </div>
    </div>
  );
};

export default PlaceRegisterForm;
