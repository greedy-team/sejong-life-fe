import { useEffect, useState } from 'react';
import PlaceItemCard from '../../../components/place-item-card/PlaceItemCard';
import TagButton from '../../../components/share/TagButton';
import type { PlaceProps } from '../../../types/type';
import { fetchFilteredPlaces } from '../apis/placeApi';
import { useLocation, useNavigate } from 'react-router-dom';

const ExploreItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFromQuery = params.get('category') || '';
  const tagsFromQuery = params.getAll('tags') || '';
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceProps[]>([]);
  const [isPartnershipButtonOn, setIsPartnershipButtonOn] = useState(false);

  useEffect(() => {
    const fetchFilterPlace = async () => {
      if (categoryFromQuery && tagsFromQuery) {
        const res = await fetchFilteredPlaces(categoryFromQuery, tagsFromQuery);
        let places = res.data || [];

        if (isPartnershipButtonOn) {
          places = places.filter((place) => place.isPartnership === true);
        }

        setFilteredPlaces(places);
      }
    };

    fetchFilterPlace();
  }, [categoryFromQuery, JSON.stringify(tagsFromQuery), isPartnershipButtonOn]);

  const handleTag = (tagName: string) => {
    const newParams = new URLSearchParams(location.search);
    const currentTags = new Set(newParams.getAll('tags'));

    if (currentTags.has(tagName)) {
      currentTags.delete(tagName);
    } else {
      currentTags.add(tagName);
    }

    newParams.delete('tags');
    currentTags.forEach((tag) => newParams.append('tags', tag));

    navigate({ search: newParams.toString() }, { replace: true });
  };

  return (
    <div className="flex w-full flex-col gap-4 py-15">
      <div className="flex items-center gap-3">
        <button
          data-selected={isPartnershipButtonOn}
          className="? bg-gray-100} relative z-10 flex h-[46px] w-[120px] cursor-pointer items-center justify-center rounded-xl font-semibold transition-colors duration-100 hover:scale-105 data-[selected=true]:bg-gray-200"
          onClick={() => setIsPartnershipButtonOn(!isPartnershipButtonOn)}
        >
          제휴만 보기
        </button>
        <ul className="flex flex-wrap gap-2 px-2">
          {tagsFromQuery.map((tag) => (
            <TagButton
              key={tag}
              size="middle"
              className="flex cursor-pointer items-center justify-center gap-3 px-1"
              onClick={() => handleTag(tag)}
            >
              {tag}
              <span>X</span>
            </TagButton>
          ))}
        </ul>
      </div>
      <div className="mb-10 flex w-full border border-gray-100" />
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPlaces.map((place) => (
          <PlaceItemCard
            key={place.placeId}
            placeInfo={place}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreItem;
