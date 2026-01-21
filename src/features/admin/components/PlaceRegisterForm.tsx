import { useState, useEffect } from 'react';
import type { TagProps, CategoryProps } from '../../../types/type';
import { fetchCategories } from '../../explore/apis/filterApi';
import { fetchTagList } from '../../../api/tagApi';
import TagButton from '../../../components/share/TagButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';
import heic2any from 'heic2any';
import { postPlace } from '../api/postPlace';

interface PlaceRegisterFormProps {
  setIsFormOpen: (value: boolean) => void;
}

const PlaceRegisterForm = ({ setIsFormOpen }: PlaceRegisterFormProps) => {
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('keyword') ?? '';
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [tags, setTags] = useState<TagProps[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    placeName: initial,
    address: '',
    categoryIds: [] as number[],
    tagIds: [] as number[],
    mapLinks: {
      naverMap: '',
      kakaoMap: '',
      googleMap: '',
    },
    isPartnership: false,
    partnershipContent: '',
    thumbnail: null as File | null,
  });
  const navigate = useNavigate();

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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'partnershipContent' && {
        isPartnership: value.trim() !== '',
      }),
    }));
  };

  const handleCategoryClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(e.target.value);
    const checked = e.target.checked; //boolean값

    setFormData((prev) => ({
      ...prev,
      categoryIds: checked
        ? [...prev.categoryIds, categoryId]
        : prev.categoryIds.filter((id) => id !== categoryId),
    }));
  };

  const handleMapLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      mapLinks: { ...prev.mapLinks, [name]: value },
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
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      //HEIC → JPG 변환
      let processedFile = file;

      if (
        file.type === 'image/heic' ||
        file.name.toLowerCase().endsWith('.heic')
      ) {
        const convertedBlob = (await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8,
        })) as Blob;

        processedFile = new File(
          [convertedBlob],
          file.name.replace(/\.heic$/i, '.jpg'),
          { type: 'image/jpeg' },
        );
      }

      //압축
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      };

      if (processedFile.size >= 1024 * 1024) {
        const compressed = await imageCompression(processedFile, options);
        processedFile = new File([compressed], processedFile.name, {
          type: compressed.type,
        });
      }

      const url = URL.createObjectURL(processedFile);
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });

      setFormData((prev) => ({
        ...prev,
        thumbnail: processedFile,
      }));
    } catch (err) {
      console.error('이미지 처리 중 오류:', err);
      toast.error('이미지 처리 중 문제가 발생했습니다.');
    } finally {
      e.target.value = '';
    }
  };

  const removeImage = () => {
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    setFormData((prev) => ({
      ...prev,
      thumbnail: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const placePayload = {
        placeName: formData.placeName,
        address: formData.address,
        categoryIds: formData.categoryIds,
        tagIds: formData.tagIds,
        mapLinks: formData.mapLinks,
        isPartnership: formData.isPartnership,
        partnershipContent: formData.partnershipContent,
      };

      const submitData = new FormData();

      submitData.append(
        'place',
        new Blob([JSON.stringify(placePayload)], {
          type: 'application/json',
        }),
      );

      if (formData.thumbnail) {
        submitData.append('thumbnail', formData.thumbnail);
      }

      await postPlace(submitData);

      toast.success('리뷰가 성공적으로 등록되었습니다');
      setIsFormOpen(false);
      navigate(
        `/admin/places?keyword=${encodeURIComponent(formData.placeName)}`,
      );
    } catch (error: any) {
      console.log('등록실패:', error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        onClick={() => setIsFormOpen(false)}
        className="absolute inset-0 bg-black/40"
        aria-label="close"
      />

      <div className="relative mx-auto max-h-[700px] w-[95%] overflow-scroll rounded-xl bg-white px-10 py-10 lg:max-h-[800px] lg:w-[80%]">
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

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-7 px-7">
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
              name="placeName"
              value={formData.placeName}
              onChange={handleTextChange}
              className="x-2 rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="장소명을 입력하세요"
            />
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
                  key={category.categoryId}
                  className="flex cursor-pointer items-center gap-1 text-base"
                >
                  <input
                    type="checkbox"
                    value={category.categoryId}
                    checked={formData.categoryIds.includes(category.categoryId)}
                    onChange={handleCategoryClick}
                    className="h-4 w-4 appearance-none rounded-full bg-[#EAEAEA] checked:border-none checked:bg-[#8BE34A]"
                  />
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
              onChange={handleTextChange}
              className="rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="제휴가 있다면 제휴내용을 입력하세요"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="text-lg">주소</div>
              <img
                src="/asset/create-review/requireStar.svg"
                alt="필수별표"
                className="mb-3 h-2"
              />
            </div>
            <input
              name="address"
              value={formData.address}
              onChange={handleTextChange}
              className="x-2 rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="주소명을 입력하세요"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="text-lg">맵링크</div>
            </div>
            <input
              name="naverMap"
              value={formData.mapLinks.naverMap}
              onChange={handleMapLinkChange}
              className="x-2 rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="네이버 맵링크을 입력하세요"
            />
            <input
              name="kakaoMap"
              value={formData.mapLinks.kakaoMap}
              onChange={handleMapLinkChange}
              className="x-2 rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="카카오 맵링크을 입력하세요"
            />
            <input
              name="googleMap"
              value={formData.mapLinks.googleMap}
              onChange={handleMapLinkChange}
              className="x-2 rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="구글 맵링크을 입력하세요"
            />
          </div>

          <div>
            <div className="flex gap-1">
              <div className="text-lg">태그</div>
              <img
                src="/asset/create-review/requireStar.svg"
                alt="필수별표"
                className="mb-3 h-2"
              />
            </div>
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
                </div>
              </label>

              <div className="flex flex-wrap gap-2">
                {preview && (
                  <div className="relative">
                    <img
                      src={preview}
                      alt={`preview`}
                      className="h-24 w-24 rounded object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage()}
                      className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/50 px-1 text-xs text-white"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
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
