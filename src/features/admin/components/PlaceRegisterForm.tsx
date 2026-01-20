import { useState, useEffect } from 'react';
import type { TagProps, CategoryProps } from '../../../types/type';
import { fetchCategories } from '../../explore/apis/filterApi';
import { fetchTagList } from '../../../api/tagApi';
import TagButton from '../../../components/share/TagButton';
import { useSearchParams } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';
import heic2any from 'heic2any';

interface PlaceRegisterFormProps {
  setIsFormOpen: (value: boolean) => void;
}

const PlaceRegisterForm = ({ setIsFormOpen }: PlaceRegisterFormProps) => {
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('keyword') ?? '';
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [tags, setTags] = useState<TagProps[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: initial,
    category: '',
    partnershipContent: '',
    tagIds: [] as number[],
    images: [] as File[],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    try {
      const convertedFiles = await Promise.all(
        files.map(async (file) => {
          if (
            file.type === 'image/heic' ||
            file.name.toLowerCase().endsWith('.heic')
          ) {
            try {
              const convertedBlob = (await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.8,
              })) as Blob;

              return new File(
                [convertedBlob],
                file.name.replace(/\.heic$/i, '.jpg'),
                { type: 'image/jpeg' },
              );
            } catch (err) {
              console.error('HEIC 변환 실패:', err);
              return file;
            }
          }
          return file;
        }),
      );

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      };

      const compressedFiles = await Promise.all(
        convertedFiles.map(async (file) => {
          if (file.size < 1024 * 1024) return file;

          try {
            const compressed = await imageCompression(file, options);
            return new File([compressed], file.name, { type: compressed.type });
          } catch (err) {
            console.error('압축 실패:', err);
            return file;
          }
        }),
      );

      const newPreviews = compressedFiles.map((file) =>
        URL.createObjectURL(file),
      );

      setPreviews((prev) => [...prev, ...newPreviews]);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...compressedFiles],
      }));
    } catch (err) {
      console.error('이미지 처리 중 오류:', err);
      toast.error('이미지 처리 중 문제가 발생했습니다.');
    }

    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        onClick={() => setIsFormOpen(false)}
        className="absolute inset-0 bg-black/40"
        aria-label="close"
      />

      <div className="relative mx-auto max-h-[600px] w-[95%] overflow-scroll rounded-xl bg-white px-10 py-10 lg:max-h-[800px] lg:w-[80%]">
        <button
          type="button"
          onClick={() => setIsFormOpen(false)}
          className="absolute top-7 right-10"
          aria-label="close"
        >
          ✕
        </button>
        <h1 className="flex w-full border-b py-7 text-4xl text-[#8BE24A]">
          장소 추가
        </h1>

        <form
          //   onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-7 px-7"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="text-lg">장소명</div>
              <img
                src="/asset/create-review/requireStar.svg"
                alt="필수별표"
                className="mb-3 h-2"
              />
            </div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="x-2 rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="장소명을 입력하세요"
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="text-lg">카테고리</div>
              <img
                src="/asset/create-review/requireStar.svg"
                alt="필수별표"
                className="mb-3 h-2"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <label
                  key={category.categoryName}
                  className="flex cursor-pointer items-center gap-1 text-base"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.categoryName}
                    onChange={handleChange}
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
              name="partnershipContent"
              value={formData.partnershipContent}
              onChange={handleChange}
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
            <div className="flex items-center gap-2 px-8 py-5 lg:px-10">
              <input
                id="imageUpload"
                name="image"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="imageUpload"
                className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-2xl border-3 border-dashed text-sm text-gray-500 transition-colors duration-150 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center gap-1">
                  <img
                    src="/asset/create-review/camera.svg"
                    alt="카메라 아이콘"
                    className="mx-auto mb-1 h-8"
                  />
                  <p>사진을 추가하세요.</p>
                  <span>사진 {previews.length}</span>
                </div>
              </label>

              <div className="flex flex-wrap gap-2">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`preview-${index}`}
                      className="h-24 w-24 rounded object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/50 px-1 text-xs text-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={() => setIsFormOpen(false)}
            className="mb-10 cursor-pointer rounded-xl border border-[#8BE34A] bg-[#77db30] px-6 py-3 font-semibold text-white hover:bg-[#8BE34A]"
          >
            추가하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceRegisterForm;
