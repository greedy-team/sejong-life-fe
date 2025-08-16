import { useEffect, useState } from 'react';
import PlaceItemCard from '../../../components/place-item-card/PlaceItemCard';
import TagButton from '../../../components/share/TagButton';
import { useCategory } from '../../../hooks/useCategory';
import { useTag } from '../../../hooks/useTag';
import type { PlaceProps, TagProps } from '../../../types/type';
import { fetchFilteredPlaces } from '../apis/placeApi';

const DiscoverItem = () => {
  const { selectedCategory } = useCategory();
  const { selectedTags, toggleTag } = useTag();
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceProps[]>([]);
  console.log(filteredPlaces);
  useEffect(() => {
    const fetchFilterPlace = async () => {
      if (selectedCategory && selectedTags) {
        const res = await fetchFilteredPlaces(selectedCategory, selectedTags);
        setFilteredPlaces(res.data);
      }
    };

    fetchFilterPlace();
  }, [selectedCategory, selectedTags]);

  const handleTag = (tag: TagProps) => {
    toggleTag(tag);
  };

  return (
    <div className="flex w-full flex-col gap-4 py-20">
      <ul className="flex gap-2 px-2">
        {selectedTags.map((tag) => (
          <TagButton
            key={tag.tagId}
            size="middle"
            className="flex items-center justify-center gap-3 px-1"
          >
            {tag.tagName}
            <button className="cursor-pointer" onClick={() => handleTag(tag)}>
              X
            </button>
          </TagButton>
        ))}
      </ul>
      <h1 className="w-full bg-[#B2E5E880] px-3 py-2 indent-5 text-2xl font-extrabold">
        여기가 딱!
      </h1>
      <div className="grid w-full grid-cols-3 gap-3">
        {filteredPlaces.map((place) => (
          <PlaceItemCard key={place.placeId} placeInfo={place} grid={true} />
        ))}
      </div>
    </div>
  );
};

export default DiscoverItem;
