import TagButton from '../../../components/share/TagButton';
import { useTag } from '../../../hooks/useTag';
import type { TagProps } from '../model/type';

const DiscoverItem = () => {
  const { selectedTags, toggleTag } = useTag();

  const handleTag = (tag: TagProps) => {
    toggleTag(tag);
  };

  return (
    <div className="w-full py-20">
      <ul className="flex gap-2">
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
    </div>
  );
};

export default DiscoverItem;
