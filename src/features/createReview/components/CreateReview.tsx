import { useEffect, useState } from 'react';
import { type DetailPlaceProps, type TagProps } from '../../../types/type';
import { fetchPlaceDetail } from '../../../api/placeApi';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTagList } from '../../../api/tagApi';
import TagButton from '../../../components/share/TagButton';
import { postReview } from '../api/postReviewApi';
import StarRating from './StarRating';
import { toast } from 'react-toastify';
import heic2any from 'heic2any';
import imageCompression from 'browser-image-compression';

const CreateReview = () => {
  const { id } = useParams();
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      const res = await fetchPlaceDetail(Number(id));
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

  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append(
        'review',
        new Blob(
          [
            JSON.stringify({
              rating: formData.rating,
              content: formData.content,
              tagIds: formData.tagIds,
            }),
          ],
          { type: 'application/json' },
        ),
      );

      formData.images.forEach((file) => {
        submitData.append('images', file);
      });

      await postReview(Number(id), submitData);

      toast.success('리뷰가 성공적으로 등록되었습니다!');
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error(error);
      toast.error('리뷰 등록에 실패했습니다.');
    }

    setIsLoading(false);
  };

  if (!placeInfo) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="bg-[#F9FAFB] px-[2%] pt-2 lg:px-[10%] lg:pt-8">
      <div className="flex h-fit flex-col rounded-2xl border border-[#EEEFF1] bg-white py-2 text-[#2C3037] lg:py-6">
        <form onSubmit={handleSubmit} className="py-2 lg:py-6">
          <div className="space-y-2 px-8 py-5 lg:px-10">
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
          <div className="space-y-2 p-8 lg:p-10">
            <h4 className="text-lg font-bold">어울리는 태그를 골라주세요!</h4>
            <div className="custom-scroll max-h-28 space-y-2 overflow-auto rounded-md border border-gray-100 p-3 lg:space-x-3">
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
          <div className="flex flex-col gap-2 px-8 py-5 lg:px-10">
            <label htmlFor="review" className="text-lg font-bold">
              리뷰를 작성해주세요.
            </label>
            <textarea
              name="review"
              id="review"
              placeholder="방문한 장소의 리뷰를 남겨주세요!"
              className="custom-scroll h-40 rounded-md bg-[#F3F3F5] p-3 text-sm"
              onChange={handleContentChange}
            />
          </div>
          <div className="flex items-center gap-2 px-8 py-5 lg:px-10">
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
              className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-2xl border-3 border-dashed text-sm text-gray-500 transition-colors duration-150 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center gap-1">
                <img
                  src="/asset/create-review/camera.svg"
                  alt="카메라 아이콘"
                  className="mx-auto mb-1 h-8"
                />
                <p>사진을 추가해보세요.</p>
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
                    onClick={() => handleRemoveImage(index)}
                    disabled={isLoading}
                    className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/50 px-1 text-xs text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end px-8 py-5 lg:px-10">
            <button
              type="submit"
              disabled={isLoading}
              className="text-md rounded-2xl bg-[#8BE34A] px-5 py-3 font-bold text-white"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReview;
