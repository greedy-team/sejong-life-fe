import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { TagProps } from '../features/discover/model/type';

interface TagContextType {
  selectedTags: TagProps[];
  toggleTag: (tag: TagProps) => void;
}

export const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);
  const toggleTag = (tag: TagProps) => {
    setSelectedTags((prevTags) => {
      const isSelected = prevTags.some((t) => t.tagId === tag.tagId);

      if (isSelected) {
        return prevTags.filter((t) => t.tagId !== tag.tagId);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const value = { selectedTags, toggleTag };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
