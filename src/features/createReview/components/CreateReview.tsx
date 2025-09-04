import { useEffect, useState } from 'react';
import { type DetailPlaceProps, type TagProps } from '../../../types/type';
import { fetchPlaceDetail } from '../../../api/placeApi';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTagList } from '../../../api/tagApi';
import TagButton from '../../../components/share/TagButton';
import { postReview } from '../api/postReviewApi';
import StarRating from './StarRating';

const CreateReview = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [placeInfo, setPlaceInfo] = useState<DetailPlaceProps>();
  const [tags, setTags] = useState<TagProps[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    rating: 0,
    content: '',
    images: [] as File[],
    tagIds: [] as number[],
  });

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      const res = await fetchPlaceDetail(Number(placeId));
      setPlaceInfo(res.data);
    };

    fetchPlaceInfo();
  }, []);

  useEffect(() => {
    const fetchTagLists = async () => {
      const res = await fetchTagList();
      setTags(res.data);
    };

    fetchTagLists();
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      content: e.target.value,
    });
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setPreviews((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append('placeId', String(placeId));
      submitData.append('rating', String(formData.rating));
      submitData.append('content', formData.content);

      formData.tagIds.forEach((id) => submitData.append('tagIds', String(id)));

      formData.images.forEach((file) => {
        submitData.append('images', file);
      });

      await postReview(Number(placeId), submitData);

      alert('리뷰가 성공적으로 등록되었습니다!');
      navigate(`/detail/${placeId}`);
    } catch (error) {
      console.error(error);
      alert('리뷰 등록에 실패했습니다.');
    }
  };

  if (!placeInfo) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex h-fit flex-col border-2 border-gray-300">
      <div className="flex gap-5 p-10">
        <img
          src={placeInfo.images[0].url}
          alt="대표 이미지"
          className="aspect-square w-[20%] rounded-md"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-extrabold">{placeInfo.name}</h4>
          <p className="flex gap-1 text-xs font-semibold text-[#70553D]">
            {placeInfo.categories.map((category) => (
              <span key={category.categoryId}>{category.categoryName}</span>
            ))}
          </p>
        </div>
      </div>
      <span className="h-4 w-full bg-gray-100" />
      <form onSubmit={handleSubmit}>
        <div className="space-y-10 px-10 py-5">
          <h1 className="text-lg font-bold">
            방문하신 장소의 별점을 남겨주세요
          </h1>
          <StarRating
            value={formData.rating}
            onChange={(newRating) =>
              setFormData((prev) => ({ ...prev, rating: newRating }))
            }
          />
        </div>
        <div className="space-y-2 space-x-2 p-10">
          <h4 className="text-lg font-bold">어울리는 태그를 골라주세요!</h4>
          {tags.map((tag) => {
            const isSelected = formData.tagIds.includes(tag.tagId);
            return (
              <TagButton
                key={tag.tagId}
                onClick={() => handleSelectedTags(tag.tagId)}
                className={isSelected ? 'opacity-100' : 'opacity-60'}
              >
                {tag.tagName}
              </TagButton>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 px-10 py-5">
          <label htmlFor="review" className="text-lg font-bold">
            리뷰를 작성해주세요.
          </label>
          <textarea
            name="review"
            id="review"
            placeholder="방문한 장소의 리뷰를 남겨주세요!"
            className="h-40 rounded-md border-2 p-3 text-sm"
            onChange={handleContentChange}
          />
        </div>
        <div className="flex items-center gap-2 px-10 py-5">
          <input
            id="imageUpload"
            name="image"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="flex h-24 w-24 cursor-pointer items-center justify-center border-2 border-dashed text-sm text-gray-500"
          >
            사진 {previews.length}
          </label>

          <div className="flex gap-2">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`preview-${index}`}
                  className="h-24 w-24 rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/50 px-1 text-xs text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end px-10 py-5">
          <button
            type="submit"
            className="rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-white"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReview;
