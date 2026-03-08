import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type {
  TagProps,
  CategoryProps,
  PlaceLookUpItemResponseProps,
  DetailPlaceProps,
} from '../../../types/type';
import { fetchCategories } from '../../explore/apis/filterApi';
import { fetchTagList } from '../../createReview/apis/tagApi';
import TagButton from '../../../components/share/TagButton';
import { usePlaceLookUp } from '../hooks/usePlaceLookUp';
import PlaceLookUpModal from './PlaceLookUpModal';
import { CreatePlaceUrl } from '../api/createPlaceUrl';
import { useEditPlace } from '../hooks/useEditPlace';

interface PlaceEditFormProps {
  placeDetail: DetailPlaceProps;
  onClose: () => void;
}

const PlaceEditForm = ({ placeDetail, onClose }: PlaceEditFormProps) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [tags, setTags] = useState<TagProps[]>([]);
  const [formData, setFormData] = useState({
    placeName: placeDetail.name,
    address: placeDetail.address ?? '',
    categoryIds: placeDetail.categories.map((category) => category.categoryId),
    tagIds: placeDetail.tags.map((tag) => tag.tagId),
    mapLinks: {
      naverMap: placeDetail.mapLinks?.naverMap ?? '',
      kakaoMap: placeDetail.mapLinks?.kakaoMap ?? '',
      googleMap: placeDetail.mapLinks?.googleMap ?? '',
    },
    isPartnership: placeDetail.isPartnership,
    partnershipContent: placeDetail.partnershipContent ?? '',
    latitude: placeDetail.latitude ?? null,
    longitude: placeDetail.longitude ?? null,
  });

  const { mutate, isPending } = useEditPlace(placeDetail.id, onClose);

  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetchCategories();
      setCategories(response.data);
    };

    const loadTags = async () => {
      const response = await fetchTagList();
      setTags(response.data);
    };

    loadCategories();
    loadTags();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === 'partnershipContent' && {
        isPartnership: value.trim() !== '',
      }),
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(e.target.value);
    const isChecked = e.target.checked;

    setFormData((previous) => ({
      ...previous,
      categoryIds: isChecked
        ? [...previous.categoryIds, categoryId]
        : previous.categoryIds.filter((id) => id !== categoryId),
      tagIds: [],
    }));
  };

  const handleMapLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      mapLinks: { ...previous.mapLinks, [name]: value },
    }));
  };

  const handleTagToggle = (tagId: number) => {
    setFormData((previous) => {
      const isSelected = previous.tagIds.includes(tagId);
      return {
        ...previous,
        tagIds: isSelected
          ? previous.tagIds.filter((id) => id !== tagId)
          : [...previous.tagIds, tagId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.placeName.trim()) {
      toast.error('장소명을 입력해주세요.');
      return;
    }

    if (!formData.address.trim()) {
      toast.error('주소를 입력해주세요.');
      return;
    }

    if (formData.categoryIds.length === 0) {
      toast.error('카테고리를 하나 이상 선택해주세요.');
      return;
    }

    mutate({
      placeName: formData.placeName,
      address: formData.address,
      categoryIds: formData.categoryIds,
      tagIds: formData.tagIds,
      mapLinks: formData.mapLinks,
      isPartnership: formData.isPartnership,
      partnershipContent: formData.partnershipContent,
      latitude: formData.latitude,
      longitude: formData.longitude,
    });
  };

  const { results, isOpen, isLoading, runLookUp, close } = usePlaceLookUp();

  const handlePlaceLookUp = async () => {
    await runLookUp(formData.placeName);
  };

  const handleSelectPlace = async (place: PlaceLookUpItemResponseProps) => {
    setFormData((previous) => ({
      ...previous,
      placeName: place.name,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
    }));

    const url = await CreatePlaceUrl({
      id: place.id,
      name: place.name,
    });

    setFormData((previous) => ({
      ...previous,
      mapLinks: {
        kakaoMap: url.kakaoUrl,
        naverMap: url.naverUrl,
        googleMap: url.googleUrl,
      },
    }));

    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="close"
      />

      <div className="relative mx-auto max-h-[700px] w-[95%] overflow-scroll rounded-xl bg-white px-10 py-10 lg:max-h-[800px] lg:w-[80%]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-7 right-10"
          aria-label="close"
        >
          ✕
        </button>
        <h1 className="flex w-full border-b py-7 text-4xl text-[#8BE24A]">
          장소 수정
        </h1>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-7 px-7">
          <div className="relative flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="text-lg">장소명</div>
              <img
                src="/asset/create-review/requireStar.svg"
                alt="필수별표"
                className="mb-3 h-2"
              />
            </div>
            <div className="flex gap-2">
              <input
                name="placeName"
                value={formData.placeName}
                onChange={handleTextChange}
                className="flex-1 cursor-pointer rounded-lg border px-2 py-2 placeholder:text-sm"
                placeholder="장소명을 입력하세요"
              />
              <button
                type="button"
                className="cursor-pointer rounded-lg border bg-[#77db30] px-4 py-2 whitespace-nowrap text-white"
                onClick={handlePlaceLookUp}
              >
                {isLoading ? '검색중...' : '장소 확인하기'}
              </button>
            </div>
            {isOpen && (
              <PlaceLookUpModal
                items={results}
                onClose={close}
                onSelect={handleSelectPlace}
              />
            )}
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
                    onChange={handleCategoryChange}
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
              className="rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="주소명을 입력하세요"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-lg">맵링크</div>
            <input
              name="naverMap"
              value={formData.mapLinks.naverMap}
              onChange={handleMapLinkChange}
              className="rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="네이버 맵링크를 입력하세요"
            />
            <input
              name="kakaoMap"
              value={formData.mapLinks.kakaoMap}
              onChange={handleMapLinkChange}
              className="rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="카카오 맵링크를 입력하세요"
            />
            <input
              name="googleMap"
              value={formData.mapLinks.googleMap}
              onChange={handleMapLinkChange}
              className="rounded-lg border px-2 py-1 placeholder:text-sm"
              placeholder="구글 맵링크를 입력하세요"
            />
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
                    onClick={() => handleTagToggle(tag.tagId)}
                    className={isSelected ? 'opacity-100' : 'opacity-60'}
                  >
                    {tag.tagName}
                  </TagButton>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            data-pending={isPending}
            className="mb-10 cursor-pointer rounded-xl border px-6 py-3 font-semibold text-white data-[pending=false]:bg-[#77db30] data-[pending=true]:bg-gray-300"
          >
            {isPending ? '수정 중...' : '수정 완료'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceEditForm;
